The number of bits in the Physical Page Number (PPN) within a [[Page Table]] entry corresponds to the number of pages that can fit in the physical memory.

For instance, suppose we have physical memory of 20GB in size, and that the size of 1 page is 1GB. There are only 20 pages in total that can fit in the physical memory, hence minimum bits required for `PPN` is $max(log_2(20))=5$ bits.