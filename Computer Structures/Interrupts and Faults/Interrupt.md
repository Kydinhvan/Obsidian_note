a response initiated by the CPU when an **ERROR** or something unexpected happens.

Also known as: $\beta$ **Interrupts** 

**Come in 2 Categories:**
1. [[Synchronous Interrupt]] (Software Error)
2. [[Asynchronous Interrupt]] (Hardware Error)

The PCSEL multiplexer’s fourth and fifth input are called `ILLOP` and `XAdr`. In ββ ISA,

- `ILLOP` is set at `0x80000004` $\rightarrow$ [[Synchronous Interrupt]]
- `XAdr` is set at `0x80000008` $\rightarrow$ [[Asynchronous Interrupt]] 

These are where the entry opcode addresses are store