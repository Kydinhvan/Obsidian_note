**Paging** is a memory management scheme that is used to store and load data from the disk (large capacity secondary storage) for use in the physical memory efficiently.

![[image2.webp|320x375]]
*a **page*** is a fixed-size block of data

It is very useful and efficient to transfer data in bulk as pages (instead of word by word) between the physical memory and disk due to the **[[Locality of Reference]]** 

A particular word in a **page** is addressable by two things:
1. A [[Physical Page Number (PPN)]] (`PPN`)
    - This identifies the entire _page_
2. A [[Page Offset (PO)]] (`PO`)
    - This identifies the **word** line in a page

**Note:**
1. `PPN + PO` makes up the full address of a word in memory.
2. _page size_ has nothing to do with _block size_


**VA - PA Relationship** - [[Page Table]] 