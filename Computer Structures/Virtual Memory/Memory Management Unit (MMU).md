---
aliases:
  - MMU
---

a **hardware** unit that sits on the CPU board, along with the CPU itself and the cache. It consists of a:

1. **context** register, 
2. a **segment** map and 
3. a **page** map. 

Its primary function is to process all _memory references_ request from the CPU (`ST`/`LD`) and translate **`VA` into `PA`.**

**Helper Bits**
1. [[Dirty Bit (D)]]
2. [[Resident Bit (R)]]
3. [[Least Recently Used Bit (LRU)]]

**Key Idea:**
Acts as the translator between the [[Physical Address (PA)]] & [[Virtual Address (VA)]]

[[Page Table]] Utilization:

1. Get [[Virtual Page Number (VPN)]] out of [[Virtual Address (VA)]]
2. Find the corresponding entry in the page table
3. Extract [[Physical Page Number (PPN)]] if the data is a Resident (R = 1)
	- Perform swapping if data is not a Resident (R = 0)
4. If there is a [[Physical Page Number (PPN)]], append with [[Page Offset (PO)]] to form a complete [[Physical Address (PA)]]
5. Pass the [[Physical Address (PA)]] to other units so the request can be fulfilled

