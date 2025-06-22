![[Classes/Archive/Computer Structures/Photos/image.webp|648x376]]
*Uses byte addressing so ignore last 2 bits*

**Characteristics**
1. **Cheaper** - less [[Static Random Access Memory (SRAM)|SRAM]] because `TAG` only uses **T-upper bits** of address `A`

2. **Not Flexible** - unique combination of K-bits of `A` is mapped **to exactly one** of the entries ($2^K$ `TAG` - `Content` entries)

3. **Contention Problem** (Collision) - different addresses can be **mapped to the same cache line** if they have the **same lower K bits**

4. **Slower** - no parallel searching
	Step 1. Decode K-bit address
	Step 2. Compare `TAG` and upper T-bit address 