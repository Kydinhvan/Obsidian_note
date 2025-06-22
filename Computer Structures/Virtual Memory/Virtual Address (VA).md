**Physical Address (PA) and Virtual Address (VA)**
Each VA are mapped to an actual PA (32-bit word) in [[Dynamic Random-Access Memory (DRAM)|physical memory]] 
- this address is from 0 to X on the RAM

![[Virtual Address-1.webp]]
This mapping is done by the [[Memory Management Unit (MMU)]] 

**only** contents that reside on the physical memory (resident) has a physical address (PA).

If the contents on the [[Swap Space]] are needed for access by the CPU, the OS Kernel needs to migrate them over to the Physical Memory/RAM first, so that they have a corresponding `VA` to `PA` translation and are **accessible** by the CPU.