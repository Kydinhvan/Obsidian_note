## MAIN FUNC 
##### 1. Resource allocation: Manages CPU Processes, memory, and I/O devices.
##### 2. Program execution control: Manages process scheduling and execution.
##### 3. Security enforcement: User authentication, access control.

---
## Hardware Interrupts 
Kernel **controls** and **coordinates** the use of hardware and I/O devices among various user applications. Examples of I/O devices include mouse, keyboard, graphics card, disk, network cards, among many others.

interrupt-request line monitored by control unit of CPU.
1. When there is new input (key board pressed or completion of previous I/O requests made by drivers on behalf of user processes) 
2. [[Introduction to OS#^DeCon|Device controller]] invokes an interrupt request by **setting the bit on interrupt-request line** 
3. CU pause current instruction execution and saves processor's states (save **program counter (PC)** and **register contents**, into process table) 
4. CU Transfer control to appropriate interrupt service routine depending on device controller that make request.

**Vectored Interrupt Sys**: the interrupt signal in this sys Includes the identity of the device sending signal, allowing kernel to know which interrupt service routine to execute (Complex but useful when large no of diff interrupt sources send signal frequently) ^vec

**Polled Interrupt Sys**: interrupt signal is generic, CU detected IRQ but dk which device -> CPU interrupted program enter a **general interrupt polling routine protocol** where CPU scans (polls) for device that send IRQ. ^pol
This process use kernel to send out signals to each device controller to determine which device send IRQ -> done by reading interrupt status registers

| Feature            | Vectored Interrupt                                | Polled Interrupt                                |
| ------------------ | ------------------------------------------------- | ----------------------------------------------- |
| Interrupt Signal   | Includes device identity                          | Generic signal, no device identity              |
| Interrupt Handling | Kernel directly execute interrupt service routine | Kernel poll each device to find the source      |
| Speed              | Fast                                              | Slower (more overhead)                          |
| Complexity         | More complex hardware and software setup          | Simpler to implement                            |
| Scalability        | Ideal for many interrupt sources                  | Best for systems with few devices, low IRQ rate |
| Efficiency         | Efficient in high-interrupt environments          | Inefficient if frequent interrupts occur        |
**Multiple I/O IRQ**: kernel decide which IRQ requests to service first. -> service done, kernel scheduler choose to resume interrupted user program

**Raw device polling**: Inefficient way to check for interrupt with CPU periodically checks each device for requests. 

**Hardware IRQ Timeline**: ![[Introduction to OS#^c75cd5|I/O operation]]
![[Pasted image 20250520125021.png]]
Asynchronous input: mouse click while computer running user program
1. I/O device send data to [[Introduction to OS#^DeCon|Device controller]], transfers data from device buffer to [[Introduction to OS#^c75cd5|device controller local buffer]]. when this is done ->
2. Device controller make IRQ request (send signal to IRQ request line)to signal data trf is done and fetched needed 
3. IRQ request line is sensed by the CPU at the beginning of each instruction execution
4. Execution of current user prog is Interrupted, save **program counter (PC)** and **register contents** by the entry point of interrupt handler. 
5. IRQ handler determines source of interrupt ([vector](#^vec) or [polling](#^pol)) 
6. CPU executes I/O service routine accordingly, to trf data from [[Introduction to OS#^c75cd5|device controller local buffer]] to physical mem RAM. when request is handled
7. IRQ handler clears IRQ request line -> performs state restore, return from interrupt instruction JMP(XP)

---
## Software Interrupt (Trap) Via Sys call

Traps: software generated interrupts that trf the mode of the program to kernel mode

Hardware IRQ and trap

Exceptions: Software interrupts that occur like errors in instruction (**illegal accessing kernel** or div by 0). CPU's hardware may be designed such that it checks for the presence of these serious errors and invokes appropriate handler via prebuilt **event-vector table**

**Interrupt Vector Table (IVT)**: CPU config to receive IRQ and invoke IRQ handler accordingly
	**Purpose**: Allows efficient handling of hardware and software interrupts by directing the processor to the appropriate ISR.  
	**Structure**: Comprises entries, each corresponding to a specific interrupt vector; each entry points to an ISR.  
	**Location**: Often found at a fixed memory address
	**Function**: On an interrupt, the system uses the interrupt number to index into the IVT, fetch the ISR address, and execute the routine to address the event.

---
## Reentrant vs Preemptive Kernel

### Reentrant Kernel
Allows multiple processes to be executing in Kernel mode
	 - If the **kernel is reentrant**, Process 2's system call can be handled **immediately**.
	 - If the **kernel is not reentrant**, Process 2 must **wait** until Process 1 finishes its system call, **even though it’s not related**.
#### Example
Process 1 is in the middle of `read()` sys call and get suspended (waiting for disk I/O) -> Process 2 starts executing and make new sys call

### Pre-emptive Kernel
Allows the os to interrupt a running process—even in kernel mode
	- If preemptive kernel, sys: **Saves Process 1’s state** -> **Switches to Process 2** -> **resume Process 1** later when appropriate
	- If non-preemptive kernel, scheduler **must wait** until Process 1 completes its kernel operation -> Even if **Process 2 is more urgent**, causing **delays and poor responsiveness**
#### Example
Process 1 is in the middle of `read()` sys call -> A **timer interrupt** occurs -> scheduler detects that **Process 2**, which has **higher priority**, is ready to run

---
## Kernel does Mem Manage

Ram has space for code and data of kernel, only accessible in kernel mode

### Kernel implements Virtual Memory. It:
1. **Support demand paging** protocol
2. **Keep track** of which parts of memory are currently being used and by whom
3. **Decide** which processes and data to move into and out of memory
4. **Mapping** files into process address space
5. **Allocate** and **deallocate** memory space as needed
    - If RAM is full, **migrate** some contents (e.g: least recently used) onto the **swap space** on the disk
6. **Manage** the **pagetable** and any operations associated with it.

### Cache Management 
Data transfer from disk to memory is controlled by **kernel** (requires context switching), while data transfer from CPU registers to CPU cache is a **hardware function** (not kernel job, too much overhead)

We perform the **caching algorithm** each time the CPU needs to execute a new piece of instruction or fetch new data from the main memory. Cache is a hardware in the CPU
$$
\text{Effective access time} = \alpha \tau + (1 - \alpha) \times \epsilon
$$
- cache **hit** ratio α
- cache **miss** access time ϵ
- cache **hit** access time τ

### MMU
Kernel sets up the page table and determine rules for the address mapping.

The MMU (Memory Management Unit) is a computer **hardware** component that primarily handles translation of virtual memory address to physical memory address. It relies on data on the system’s RAM to operate: e.g utilise the **pagetable**.

---
## Kernel does Process management
**Kernel** manage **processes** — active programs that require CPU time, memory, and I/O. **Two major features** that enable effective process handling are:

### Multiprogramming - multi processes on one processor
**Kernel maximize CPU utilization** by keeping **multiple jobs loaded into memory**, When one job waits for I/O, **CPU switches** to another, Prevents CPU from sitting idle when a process is waiting. ^mulprogram
- OS maintains a [[Processes#^9aaca4|Job Queue]].    
- Jobs are loaded into memory.
- When a job blocks (e.g., for input), **context switch** happens.    
- CPU selects the next **READY** process to run.

**The kernel must organise jobs (code and data) **efficiently** so CPU always has one to execute.** A **subset** of total jobs in the system is kept in memory and swap space of the disk.

### Timesharing - Multiprogramming allows for timesharing
> context switch that’s performed so **rapidly** that it feels like CPU is handling processes simultaneously

 **Implementation**:
1. **OS Maintains Active Process List**
	-  OS keeps track of all currently active processes (not terminated).
	- These are stored in a [[Processes#^readyqueue|Ready Queue]] if they’re waiting for CPU time.
2. **CPU Scheduler Allocates Time Slice**
	- The **CPU scheduler** selects processes from the ready queue.
	- Each process is given a **fixed time slice**
3. **When Time Expires**
	- If a process **finishes** during its time slice, it exits or goes to a waiting state
	- If it **doesn't finish**, the scheduler **preempts** it — meaning:
	    - The OS pauses the current process.
	    - Save its context (PC, registers, etc.).
	    - Puts it back in the ready queue.
	    - Loads the next process and gives it the CPU.
4. **Handling I/O Requests**
	- If a process needs I/O **before its time slice ends**, it’s interrupted voluntarily.
	- It’s moved to a **waiting state**, and CPU is immediately given to next ready process.

## Misconception
### Process vs Program

| Concept     | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| **Program** | Passive: just a file with code (e.g., `.exe`, `.py`)        |
| **Process** | Active: a program **in execution** with state, memory, etc. |
Program becomes process when it runs.

### Kernel is not a process by itself

---
# Activity
![[cse-01.pdf]]