---
aliases:
  - Software Interrupt
  - System Call
  - Trap
---

Application requests to use the operating system, which switches the CPU into kernel mode (uses operating system code).

It's a **TRAP** because the application is trapping into the operating system


Sometimes the user processes are **blocked** simply because they require inputs from and [[Device Controllers#I/O|I/O Device]]  

**TRAPS** are software generated [[Interrupt|interrupts]] that transfer the mode of the program to [[Classes/Computer System Engineering/The Computer System/Operating System (OS)/Kernel/Kernel#Kernel Mode (PC31 MSB = 1)|Kernel Mode]]

*Note: always save state before going into kernel mode, that way you can always come back after*


Are programming interfaces provided by the OS [[Classes/Computer System Engineering/The Computer System/Operating System (OS)/Kernel|Kernel]] for users to access [[Classes/Computer System Engineering/The Computer System/Operating System (OS)/Kernel|Kernel]] services
- mostly accessed by programs through [[Application Programming Interface|API's]] 
- require [[Parameter Passing]] 

# Types of System Calls
___
## Process Control
anything you gotta do related to [[Process]]

### Process Abort
a running [[Process]] can either end normally (end) or abruptly (abort)
- when an abort happens, a dump of memory (core dump) is written to the disk for a debugger

### Process Load and Execute
loading in and executing new [[Process]] on the system

### Process Communication
jobs or [[Process]] may need to communicate to wait for the other jobs to finish
- [[Single-Tasking System]]
- [[Multi-tasking System]]

___
## File Manipulation
anything related to files
___
## Device Manipulation
anything related to [[Device Controllers]] or devices
___
## Information Maintenance
getters and setters
___
## Communication
anything related to network
___
## Protection 
anything related to security

___
# Blocking vs Non-Blocking 
## Blocking
a system call that must **WAIT** until the action can be completed

## Non-Blocking
a system call that can return **ALMOST IMMEDIATELY** without waiting for [[Device Controllers#I/O|I/O]] to complete