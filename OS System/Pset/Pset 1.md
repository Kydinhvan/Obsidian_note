# If You Removed the Kernel

Imagine that you’re designing **a machine w no** [[Introduction to OS#^kernel|kernel]]. User programs are copied directly from disk into RAM and executed by the CPU one after another. There’s no dedicated operating system managing the system.

1. What functionalities or capabilities would be missing from this system?
2. Which operations would be unsafe or outright impossible without a kernel?
3. Is it possible to simulate multitasking or device access in this setup? If so, how crude or complex would the approach be?

> **Hints**:
> - **Think** about how access to hardware is usually controlled.
> - What ensures that one program doesn’t **overwrite** another in memory?
> - How are devices like keyboards and disks normally **accessed** in a system?
> - How does the CPU know **when to switch** between programs?

Think about the metaphor used in class: the OS as a “government” or “manager.” How does this experiment demonstrate the value of central coordination? What kind of “rules” or “contracts” does the kernel enforce that user programs alone cannot?

## ANS - try again
There will be nothing that manage memory, manage processes efficiently, manage I/O and execute sys calls.
	1. No more virtual memory as there is no page tables set up or rules for address mapping for MMU to perform address translation from VA to PA. The sys will run with full access to the machine's physical address and hardware. Programs will be running with no isolation from one another. One buggy or malicious program can overwrite other program's data or corrupt whole system.
	2. Multiprogramming which maximize CPU usage will not be possible. The system will not switch between processes but instead stay on one process until it is terminated before switching to the next one. (no pre-emptive )
		   There will be no support for preemptive scheduling, meaning a misbehaving program could freeze the entire system. 
		   Multiprogramming can be simulated by **cooperative multitasking** which relying on programs to voluntarily give up CPU and transfer execution to another program. This is fragile and unreliable way as different developers need to develop their program to behave in this specific way. 
	3. Interrupt is not handled anymore. Asynchronous events like Mouse click or keyboard input will not be processed at all as the CPU has no idea that these events happened.
	4. No System Calls or Privilege Separation cause there is no more code for that. But there is no need for system calls to enter kernel mode as the system always has full access (always in kernel mode)
	5. No more file system ?

2 Operations would be unsafe or outright impossible without a kernel
1. Unsafe:  accessing memory is unsafe as programs are given full access and can easily overwrite other programs' data or corrupt any data. (no isolation between processes)
2. Impossible: 
	- Context switching between processes (preemptive multitasking) can't be done as there is no more timer interrupt to switch between processes. 
	- Asynchronous events like hardware input won't be processed as CPU won't even know they happen. (kernel handles them with service routine)

3 Is it possible to simulate multitasking or device access in this setup? If so, how crude or complex would the approach be? (kernel handle hardware access with sys calls)
	-  Simulating multitasking is possible if each program is developed to manually give up CPU usage and transfer execution to another process. This make it very fragile as it depends on developer implementing this correctly. One misbehaving process can hog CPU forever
	- Simulating device access is also possible with program communicating with hardware directly by reading from specific I/O ports or writing to memory-mapped I/O like display buffer. (basically coding without an OS). If memory address is wrong can crash or corrupt system
		Program must include their own driver logic for every device (normally installed on OS to handle each hardware device). Program must know exactly how to communicate with specific device, handle delays, IRQ manually and update their program whenever hardware changes. (hardcoding basically)

--------
# Illegal Jump to Kernel Space
### Background: Privilege Enforcement in RISC-V

RISC-V processors run code at different privilege levels, which are enforced by the hardware. This is very much like the Beta CPU. The three common modes are:

- Machine mode (M-mode): The most privileged mode. Firmware runs here.
- Supervisor mode (S-mode): The operating system kernel runs here.
- User mode (U-mode): Normal applications run here with restricted access.
- When an application runs in User mode, it can only execute non-privileged instructions and access memory marked as user-accessible. Any attempt to execute a privileged instruction (like modifying page tables) or jump to a protected kernel address (e.g. `0x80000000`) will trigger a trap (hardware exception).

The kernel sets up page tables to define which parts of memory are visible and accessible to each process. Kernel memory (including address ranges like `0x80000000`) is typically not mapped in the user process’s address space, or is marked as inaccessible.

To safely request kernel services, user programs must use a system call. In RISC-V, this is done using the `ecall` instruction. This causes the CPU to **trap** into Supervisor mode, where it runs kernel code at a controlled entry point.

### Scenario

A student writes the following instruction into a user-mode program in RISC-V Architecture:

```
JAL 0x80000000
```

They expect the program to jump directly to a kernel function located at that address. But instead, the program crashes or triggers an exception.

1. Why can’t a user-mode program jump directly to a kernel address?
2. How does the RISC-V hardware detect and prevent this?
3. What should the program have done instead to access kernel functionality?
4. What are the risks if such jumps were allowed?

> **Hints**
> - Consider what happens when a CPU in user mode _tries_ to access memory it doesn’t have permission to.
> - Check whether `0x80000000` is even mapped in a user-mode program’s address space.
> - Think about what `ecall` does and what the kernel registers in stvec.
> - Can a program safely switch to a higher privilege level by itself?

## ANS

1. User-mode program can't jump directly to a kernel address for system security. Kernel mode contain privileged instructions to control hardware or modify page table. The student might write buggy code that might corrupt the system if it can access the kernel address.
2. The RISC-V hardware detect and prevent this by checking the program mode to see if it is in S-mode or M-mode. Once it confirm that the program is in U-mode, it checks if memory address `0x80000000` is user-accessible. Since the program is not, hardware will trigger a trap to handle this illegal operation.
3. To access kernel functionality, the student should have used the `ecall` (syscalls) instruction which trap to the kernel execute the kernel function (like `read()`or `write()`) 
4. If U-mode programs are allowed to jump to kernel's address, the system would be easy to attack or corrupt from a malicious or buggy program. Different modes with different privileges ensure that there is protection against badly written code that might overwrite other program's data or malicious program that steal important data.

---
# Reimagine Boostrapping

We know that the operating system must be loaded into memory before the CPU can run it. But here’s the paradox: the OS is a program. Programs need to be in memory to run. **So what loads the operating system into memory in the first place?**

### Background: The Bootstrapping Paradox

When a computer is powered on, its RAM is empty, and nothing is executing. But the CPU begins running instructions immediately. To resolve this paradox, every computer is built with a small, immutable piece of code stored in ROM. This is called **firmware** or **BIOS** (Basic Input/output System).

This firmware contains just enough logic to:

- Initialize hardware devices (like disks and memory)
- Find and load the operating system into RAM
- Transfer control to the OS kernel
- This first step is called bootstrapping, and it’s designed to break the “chicken-and-egg” cycle of needing a program to load the program.

**Answer the following questions:**

1. Why is this called a paradox in OS design?
2. What is the role of the firmware (or BIOS) in the boot process?
3. What exactly does the kernel do after it gets loaded into RAM?
4. What could go wrong if the boot process was tampered with or failed?

> **Hints**
> - Consider: what happens immediately after you press the power button?
> - Why can’t the OS already be in RAM?
> - What’s special about ROM in this context?
> - Could security or stability be compromised if the boot process were modified?

## ANS
1. It is a paradox because you need the program to be loaded in the memory to be executed. However when a computer powered on, there is nothing in the memory to be executed. This create the paradox
2. The firmware is a special program that get loaded into RAM to be executed by CPU from a dedicated ROM. Because ROM is non-volatile and is hardwired, its instructions are **always available** at startup. The BIOS starts by initializing and preparing attached hardware devices so that it is ready to be used by OS. It then locate the **bootloader**  from disk, load and start the **OS kernel** by copying it into RAM. Lastly, it hand over control to kernel.
3. When Kernel get loaded into RAM, it takes over the booting process with the system in kernel mode. It continue to set up by initiating drivers, managing memory by setting up page table, handle any interrupts. Afterwards, it will loads the rest of the OS and goes into user mode.
4. If boot process was tampered with or failed
	- If the firmware can't locate a valid bootloader or kernel, the system might get stuck or display errors. 
	- If an attacker replaces the bootloader or kernel with malicious code, they can bypass security checks and hide from antivirus tools entirely since they load first
	- If the kernel image is damaged or incompatible, the system may crash or reboot in a loop.

---

# Why We Need Both Kernel and Drivers?

The OS kernel already has full access to the hardware. So why do we need device drivers? Couldn’t all hardware be handled directly by the kernel itself? In fact, why not just compile all drivers into the kernel?

While the kernel is the core of the OS with unrestricted access to hardware, it delegates many hardware-specific tasks to device drivers. Device drivers are modular programs that know how to talk to specific devices like printers, graphics cards, or network adapters.

Drivers can be: 
- Kernel-mode drivers: Fast, but risky. Bugs can crash the system.
- User-mode drivers: Safer, but slower. We must make frequent system calls to access hardware.

Modern OSes use a _modular_ approach, keeping the kernel minimal and extensible, while allowing drivers to be updated or swapped without rebuilding the whole OS.

**Answer the following questions:**

1. Why aren’t all drivers just compiled permanently into the kernel?
2. What are the trade-offs between running drivers in user mode vs kernel mode?
3. What could go wrong if a buggy driver runs in kernel mode?
4. How does this modular approach help both developers and end users?

> **Hints**:
> 
> - Think about how often new hardware gets released.
> - Who writes the drivers? The OS vendor or the hardware manufacturer?
> - What happens if a graphics driver crashes while in kernel mode?
> - What is the difference between performance and fault isolation?

## Ans

1.  All drivers can't just compiled permanently into the kernel as with each new version being made or across being made, the data it send or required might differ. This means we would need to standardize all brands of diff devices to follow specific format to be able to communicate with the OS kernel and the OS kernel driver would require an update if new devices come out (which is very often). Hence, this is an inefficient, impractical way to utilize hardware, which is why diff drivers are made so that user would only need to install the one that they need and not everything else.
2. Driver in kernel vs user mode
	- In kernel mode, there is less overhead. The drivers don't have to make system calls However, if a drive is poorly designed, malicious program might take advantage of that to get access to the kernel
	- Vice versa. In user mode, there is more overhead due to the constant system calls. But malicious program can't gain access to the kernel thru driver anymore even if the driver is badly made
3. A buggy driver in kernel mode can:
	- **Crash the system** 
    - **Corrupt memory**, affecting other parts of the OS

**For developers:**
    - They can build, test, and distribute drivers independently of the kernel.
    - It allows for faster iteration and bug fixing without waiting for kernel updates.
    - Hardware manufacturers can support their devices directly without relying on OS vendors.

**For end users:**
    - They only need to install drivers relevant to their hardware, saving space and reducing complexity.
    - They can update or replace drivers without reinstalling or rebooting the whole OS.
    - A faulty or outdated driver can be swapped out without affecting the core system.