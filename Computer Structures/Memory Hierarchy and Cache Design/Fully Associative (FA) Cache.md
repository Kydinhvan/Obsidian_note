![[Fully Associative (FA) Cache-1.webp|390x301]]

[[Static Random Access Memory (SRAM)|SRAM]] cells:
- `TAG` contains all bits of address A (32bits)
- `DATA` contains all bits of `Mem[A]` (32bits)

**Characteristics**
1. **Expensive** because of the **2 [[Static Random Access Memory (SRAM)|SRAMS]]** and `OR Gate`

2. **Very Fast** — parallel lookup, looks through all the `TAG` **simultaneously**

3. **Flexible** because any address `A` + content `Mem[A]` can be **copied and stored on any cache**
