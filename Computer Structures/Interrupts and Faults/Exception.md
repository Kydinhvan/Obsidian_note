are [[System Call (Trap)|Software Interrupt]] that occur due to **ERRORS** in the instruction:
- divide by 0
- invalid memory, etc

This means the CPU's hardware may be designed such that it checks for the presence of these serious errors, and immediately invokes the appropriate handler via a pre-built [[Interrupt Vector Table (IVT)]]

