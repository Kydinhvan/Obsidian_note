#### Basics of Operating Systems
1. **OS** is program that manages computer hardware consist of kernel, sys program, user program. Both system programs and user programs run in **user mode**, with limited privileges
	1. Operating system act as intermediary btw user and hardware:
	2. **Resource allocator and coordinator**:
	    - Controls hardware and input/output requests
	    - Manage resource conflicting requests
	    - Manage interrupts
	3. **Controls program execution**: Sys call / supervisor call
		- Storage hierarchy manager
		- Process manager
	4. Limits program execution and ensure **security**: window defender
		- Preventing illegal access to the hardware or improper usage of the hardware

![[Pasted image 20250519101355.png]]
- **Kernel** is part of OS that interact with hardware and is hardware dependent (diff for diff architecture). Kernel mode and User mode. Fixed Code (interrupt handler, print handler, etc)^kernel
	- Kernel mode (PA): more privileges, access to hardware mem adds. **3 ways to enter**
		- reset
		- sup call/ sys call (trap) -> Software interrupt
		- async interrupt 
	- User mode (VA): Virtual Adds, no access to hardware (**access kernel thru sys call**)
- Responsibilities: resource allocation... 

**Dual mode Operation**: User execute code that require system call, system enter kernel mode and execute fixed code, when finish jmp back to user code and user mode

---
#### Computer Sys I/O operation

Device controller = hardware components that manage I/O device (1 manage 1). Made of: ^DeCon
- Registers - contains instructions that can be read by [device driver](#^devDri) program at the CPU
- Local mem buffer - store instructions and data fetched by CPU when execute [device driver](#^devDri) -> then loaded onto RAM ^buffer
- Simple program to communicate with [device driver](#^devDri)

I/O (Input/output) operation = transfer of data btw comp and external devices (mouse,...) ^io
	Output: Move data from [device controller's buffer](#^buffer) to output device
	Input: From the input device to [device controller's buffer](#^buffer) 

I/O operation example:
	1. mouse click -> hardware interrupt
	2. send i/o request to [device driver](#^devDri) 
	3. [device driver](#^devDri) communicate with [Device controller](#^DeCon)
	4. [Device controller](#^DeCon) accesses the actual device 
	5. data trf btw device and [device controller's buffer](#^buffer) 
	6. data is moved to/from main mem RAM via CPU  ^c75cd5

[Device controller](#^DeCon) and CPU are asynchronous (operate indepedently, in parallel). OS kernel coordinate btw servicing I/O requests and executing user programs. It:
	Manage I/O requests from multiple programs
	Prevent conflict
	Handle interrupts signal from devices when [I/O](#^io) is complete

#### Running Device Drivers

Device Drivers: A software to interpret behavior of each device type ^devDri

Driver that run in **user mode is slower** because frequent switching to kernel mode to access serial ports of device controller that is connected to external device. 
Does NOT endanger the sys like accidentally overwrite kernel mem.

Driver run in kernel mode, vulnerabilities in the driver can allow attacker to get highest level privileges

---
#### Booting
<div align="center">
<img src="Pasted image 20250520124117.png" width="500">
</div>
Process that loads the basic software to help kickstart operation of comp sys after power on (hardware initiated): **bootstrapping**

Paradox: program must be in mem to be execute by CPU but when booting, no program in mem yet -> special program: firmware or BIOS is stored in ROM chip on motherboard. Firmware != BIOS

Chain of events that is kickstarted by hard wired start button: load a special program (BIOS) onto main memory from a dedicated input unit: **ROM that comes with a computer when it is produced and that cannot be erased** 
	At this moment, **main memory (RAM)** is empty, so the CPU cannot run any complex programs yet.

After Bios is loaded onto the main memory thru hardwired procedures, CPU execute it:
1. Prep all attached devices so that it is ready to be used by OS
2. Loads other programs 
3. Loads Kernel from disk
4. When sys boots, hardware starts in kernel mode and kernel will perform the most of the set ups (driver init, mem management by setting up page table, interrupts). -> the rest of OS then loaded  -> user processes are started in user mode

---
#### Acronyms

- Process: a program in execution, with its own memory and execution context ^process
- Context Switch: process of saving the current process state and loading another process's state. This enable concurrently running programs ^conSwi
- Timer Interrupts: hardware-generated signal that tell OS to stop current process and possibly switch to another time, ensuring fairness among running processes. ^timInt
