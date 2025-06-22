[[Dynamic Programming (DP)]] allows us to:
1. reduce the [[Time Complexity]] but at the expense of 
2. saving the results to some memory [[Space Complexity]]

Example:
[[Text Justification Problem]]
- Store solutions of $n+1$ sub-problems
- store the values of $line\_cost(i,j)$
- There are ![[image-5.webp]] possible pairs

Therefore the [[Space Complexity]] is:
![[image4.webp]]