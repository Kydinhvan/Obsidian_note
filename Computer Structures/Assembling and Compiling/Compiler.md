analyzes the code to produce an **OPTIMIZED SET OF INSTRUCTIONS**

**Compilation Notes**
- **Variables** are assigned using `Load (LD)` and `Store (ST)`
- **Operators** (+, -, /,...) translate to `OP`
	- **Small** numbers (constants) are translated to `OPC`
	- **Large** numbers constants must be loaded to `Registers (Reg)`
- **Conditionals and Loops** will use `BEQ` or `BNE`
- **Function** return will use `JMP`

