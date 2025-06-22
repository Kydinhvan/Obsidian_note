small [[Fully Associative (FA) Cache]] to store a copy of the most recently used [[Page Table]]

![[Translation Lookaside Buffer (TLB)-1.webp]] 

In essence, we are caching some pages from the [[Page Table]] in the [[Memory Management Unit (MMU)]]

Note: [[Least Recently Used Bit (LRU)]] in the [[Page Table]] and [[Translation Lookaside Buffer (TLB)]] are different
- This is because in the TLB, there are only N entries out of $2^v$ in the [[Page Table]]
