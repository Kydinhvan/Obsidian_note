# process context 

1. The **text** section (code or instructions)
2. Value of the Program Counter (**PC**)
3. Contents of the processor’s **registers**
4. Dedicated[1](https://natalieagus.github.io/50005/os/processes#fn:1) **address space** (block of location) in memory
5. **Stack** (temporary data such as function parameters, return address, and local variables, grows downwards),
6. **Data** (allocated memory during compile time such as global and static variables that have predefined values)
7. **Heap** (dynamically allocated memory – typically by calling `malloc` in C – during process runtime, grows upwards)[2](https://natalieagus.github.io/50005/os/processes#fn:2)

> This set of information is also known as a process **state**, or a process **context**.

---
# Process Management
## Process Scheduling States
![[Pasted image 20250602094019.png|500]]
1. **New**: The process is being created.
	...
2. **Running**: Instructions are being executed.
	in CPU, if require file or user input, it goes into `Waiting`
3. **Waiting**: The process is waiting for some event to occur (such as an I/O completion or reception of a signal)
	it’s paused, maybe waiting for file to be read or signal. NOT on CPU. Goes to `ready` 
4. **Ready**: The process is waiting to be assigned to a processor
	It’s loaded into ram and waiting for CPU time.
5. **Terminated**: The process has finished execution.
	1. request to exit
	2. kernel ...
	3. remove the process...

## Process table and Process Control Block
To keep track of Process Scheduling state, the OS uses **Process Control Block**. ^pcb
PCB contains many pieces of information associated with a specific process. These information are updated each time when a process is **interrupted**:

1. Process **state**: any of the state of the process – new, ready, running, waiting, terminated
2. **Program counter**: the address of the _next instruction_ for this process
3. CPU **registers**: the contents of the registers in the CPU when an interrupt occurs, including stack pointer, exception pointer, stack base, linkage pointer, etc. These contents are saved each time to allow the process to be continued correctly afterward.
4. **Scheduling** information: access priority, pointers to scheduling queues, and any other scheduling parameters
5. **Memory-management** information: page tables, MMU-related information, memory limits
6. **Accounting** information: amount of CPU and real time used, time limits, account numbers, process id (**pid**)
7. **I/O status** information: the list of I/O devices allocated to the process, a list of open files
>only contain **meta data** and not the whole **VM** (Image)

### Context Switching
![[Pasted image 20250602095228.png|500]]
context switch is overhead: extra work, time, mem usage that is required to manage but does not contribute.

right side idle is overhead, no useful work done

---
## Process Scheduling Detail
- The objective of **multiprogramming** is to have some process running at all times, to maximize CPU utilization. [[OS Kernel Roles#^mulprogram|Multiprogramming]]
- The objective of **time sharing** is to switch the CPU among processes so frequently that users can interact with each program while it is running.

To meet **both** objectives, the process scheduler selects an available process (possibly from a set of several available processes) for program execution on the CPU.
### Process Scheduling Queues
There are three **queues** that are maintained by the process **scheduler**:

1. **Job** queue – set of all processes in the system (can be in both main memory and swap space of disk) ^jobqueue
	Has reference to all PCB ^9aaca4
2. **Ready** queue – set of all processes residing in main memory, ready and waiting to execute (queueing for CPU time) ^readyqueue
3. **Device** queues – set of processes waiting for an I/O device (one queue for each device)

Each queue contains the **pointer** to the corresponding PCBs that are waiting for the **resource** (CPU, or I/O). -> they are in **waiting state**

---
# Process Creation
## Process Termination
A process can terminate **itself** using `exit()` system call. A process can also terminate **other processes** using the `kill(pid, SIGKILL)` system call.
### Orphaned processes
If a parent process with live children is terminated, the children processes become **orphaned** processes:

- Some operating system is designed to either **abort** all of its orphaned children (cascading termination) or
- **Adopt** the orphaned children processes (`init` process usually will adopt orphaned processes)

### Zombie Processes

Processes that are **ALREADY TERMINATED**, and memory as well as other resources are **freed**, but its exit status is not read by their parents, hence its **entry** (PCB) in the process table remains

>when process terminate os will deallocate its vm (virtual mem) but keeps its metadata [PCB](#^pcb) **until the parent proc calls wait/waitpid** 

Too many zombie -> run out of pid (in 32 bit sys, we only have 32767 unique pids)


--- 
## C program
``` c
int main(int argc, char const *argv[])
{
   pid_t pid;

   pid = fork();
   printf("pid: %d\n", pid);

   if (pid < 0) // error might give pid less than 0
   {
       fprintf(stderr, "Fork has failed. Exiting now");
       return 1; // exit error
   }
   else if (pid == 0 // child pid = 0
   {
       execlp("/bin/ls", "ls", NULL);
   }
   else // parrent pid > 0
   {
       wait(NULL);
       printf("Child has exited.\n");
   }
   return 0;
}
```