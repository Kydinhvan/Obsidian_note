A program for writing programs (turns text files into binary memory data)

Also known as: **Primitive Compiler**

Example: [[Unified Syntax for Abstract State Machines (UASM)]] 

**Syntax:**
1. **Symbols (Variables)** - defined using "="
2. **The Dot** - used to specify where we are in the memory address
3. **Labels** - name for your address (eg. instead of looping to 0x100 you can rename it to **start : ADDC(...)** and it will run the ADDC operation at address **start**

**MacroInstruction (Shortcuts) for OPCODE in Assembly**
![[Assembler-2.webp|393x343]]

