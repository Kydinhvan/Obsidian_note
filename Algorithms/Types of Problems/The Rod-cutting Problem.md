You work in a company selling steel rods. 
- Rods of different lengths could fetch different prices
- Rod lengths (in inches) are assumed to be integers.

You are given a rod of length 𝑛 inches, as well as the prices (in dollars) for rods of different lengths.

![[image1.webp]]

**Problem:** Determine the maximum revenue obtainable by cutting up the rod and selling the pieces. ie. Compute DP[n]

*Note: it is possible that an optimal solution requires no cutting*

**Sub-Problems**
Even though we are given n, what about the smaller n's

Therefore: what are the max revenue obtainable for any length k we declare -> Compute DP[k] for 0<=k<=n

**Recurrence**
$DP[𝑘] =max(𝑝_𝑖 +𝐷𝑃 [𝑘 −𝑖] :1 ≤𝑖 ≤𝑘)$  
