Operations:
- [[Push]]
- [[Pop]] 

Stack Management:
- [[Allocate]]
- [[Deallocate]] 

Reserved Registers:
1. [[Stack Pointer (SP) R29|R29 (SP)]] contains the address of the top of the stack **(available location to write to)** 
2. [[Linkage Pointer (LP) R28|R28 (LP)]] contains the address of the **return address** to come back to after running the function
3. [[Base Pointer (BP) R27|R27 (BP)]] contains the address of the **stack frame base** to come back to after running a function

Size of the Stack = # of Pushes in your code

Memory Addresses are increasing downwards, hence **the stack increases downwards** 

![[Pasted image 20250401161105.webp|Stack Pointer Usage|500]] 
