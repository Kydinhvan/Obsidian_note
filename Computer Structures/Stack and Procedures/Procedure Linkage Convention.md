Solves the [[Procedure Linkage Problem]]

**Key Ideas**
Address Convention:
1. Return value is always stored at `R0`
2. Arguments can be found in a dedicated space in the memory called **[[Stack Implementation|The Stack]]** 
	- Top of the stack address can always be found in [[Stack Pointer (SP) R29]]]
	- the base of the stack can be found at [[Base Pointer (BP) R27]]
	- Return address is always stored at [[Linkage Pointer (LP) R28]]

**Function Convention**
[[Function]] Caller:
1. Put arguments on the stack
2. Branch to the target function, store return address in [[Linkage Pointer (LP) R28]]
3. Remove arguments on stack upon return
4. Obtain return value from `R0`

Callee (The [[Function]]):
1. Perform computation
2. Leave result in `R0` (if any)
3. Leave the state of all Registers (Reg) unchanged, except `R0`
4. Leave stack data unchanged (we will overwrite them anyways)
