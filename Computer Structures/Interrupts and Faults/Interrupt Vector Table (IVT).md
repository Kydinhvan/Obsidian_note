---
aliases:
  - event-vector table
  - IVT
---
A table of pointers to **interrupt service routines (ISRs)** used to handle [[Interrupt|interrupts]] in computing systems

**Purpose:** Allows efficient handling of [[Asynchronous Interrupt|Hardware Interrupt]] and [[System Call (Trap)|Software Interrupt]] by directing the process to the correct ISR

**Structure:** Comprises entries, each corresponding to a specific [[Interrupt Vector]]; each entry points to an ISR

**Location:** Often found at a fixed [[Memory Addressing|Memory Address]] 

**Function:** On an [[Interrupt]], 
1. the system uses the *interrupt number* to index into the **IVT**, 
2. fetch the **ISR Address**, and 
3. execute the routine to address the event

CPU must be configured to receive [[IRQ Signal]] and invoke correct interrupt handling using the IVT

[[Classes/Computer System Engineering/The Computer System/Operating System (OS)/Kernel/Kernel|Operating System Kernel]] must provide the ISRs to handle the interrupts

*Note: Interrupt Descriptor Table (IDT) is a data structure used by the x86 architecture to implement an interrupt vector table*