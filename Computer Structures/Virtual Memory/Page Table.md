Stored in the Physical Memory

keeps track of the translation between each `VA` of each **process** to its corresponding `PA`. This data structure stores mapping of the higher $v$ bits of virtual address (called the **`VPN`** - [[Virtual Page Number (VPN)]]) to a corresponding **`PPN`** ([[Physical Page Number (PPN)]]).

It contains **all possible combination of virtual address of a process**, but not all `VA` has corresponding `PA` at a time in the RAM (it may be in the disk/[[Swap Space]]).

The number of entries in the _page table_ is $2^v$, because **exactly one entry** is needed _for every possible virtual page_.



**Page Table Arithmetic**
Byte Addressing - include last 2 bits
Given a [[Virtual Address (VA)]] of $(v+p)$ bits and a [[Physical Address (PA)]] of $(m + p)$ bits

- The size of the [[Virtual Memory]] is $2^{v+p}$ bytes ($2^{VA}$)
- There are $2^p$ bytes per pages because we have p bits of [[Page Offset (PO)]]
- The size of the physical memory is $2^{m+p}$ bytes ($2^{PA}$)
- The [[Page Table]] must store $(2+m)\ x \ 2^v$  bits plus helper bits:
	- $2^v$ rows
	- each row store $m$ bits of [[Physical Page Number (PPN)]]
	- each row has 2 bits for [[Dirty Bit (D)]] and [[Resident Bit (R)]], and $m$ bits for [[Least Recently Used Bit (LRU)]]
	- $v$ VPN bits are not stored as entries since they are index

