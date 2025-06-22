We probe (i.e. examine) the [[Hash Table]] until we find an empty slot where we can insert 𝑥

**Kinds of Probing:**

**Note for all:** If the slot is taken, redo the [[Hash Function]] and increase i by 1 **(i++)** until you find an empty spot starting with 0

1. [[Linear Probing]] - $ℎ(𝑘, 𝑖) = (ℎ^′(𝑘) +𝑖)\ mod \ 𝑚$

2. [[Quadratic Probing]] - $ℎ(𝑘, 𝑖) = (ℎ^′(𝑘) +𝑐_1 𝑖+𝑐_2 𝑖^2)\ mod \ 𝑚$

3. [[Double Hashing]] - $ℎ(𝑘, 𝑖) = (ℎ_1 (𝑘) +𝑖ℎ_2 (𝑘))\ mod\ 𝑚$

