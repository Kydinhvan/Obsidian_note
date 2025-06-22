Problem: Given a knapsack of maximum capacity $m$, we want to pack $n$ items inside it.

Item $i$ has size $s_i$ and value $v_i$ 

Goal: Pack items of total size at most $m$ such that the total value is maximized

**Key Idea**
Vary number of items and the max capacity of knapsack.

Let $𝐷𝑃 [𝑖, 𝑗]$ = maximum possible total value for packing items chosen from item 1 to item 𝑖, such that the total size of chosen items does not exceed 𝑗.

**Problem**
Compute $𝐷𝑃[𝑛,𝑚]$ 

**Sub-problem**
Compute $𝐷𝑃[𝑖,𝑗]$ for all $0 ≤ 𝑖 ≤ 𝑛, \  0 ≤ 𝑗 ≤ 𝑚$    

**Recurrence**
For all $1 ≤ 𝑖 ≤ 𝑛$ and $1 ≤ 𝑗 ≤ 𝑚$, 
![[image-3.webp]]
