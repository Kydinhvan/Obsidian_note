**Definition**
a general method for algorithm design that:
1. Divides problems into subproblems, so the subproblems can solve the main problem
2. Solve each sub-problem just once and save the solution in a look-up table / [[Memoization]] 

**Must Have**
A problem must be able to divide into subproblems that have an [[Optimal Substructure]] and Overlapping Sub-Problems

**Two Types of Dynamic Programming**
1. [[Top-down Approach]] - [[Memoization]]
2. [[Bottom-Up Approach]] - [[Tabulation]]


**Examples**
1. [[The Knapsack Problem]] - very important problem in resource allocation

2. [[The Rod-cutting Problem]]

3. [[Text Justification Problem]] 

4. [[Matrix Chain Parenthesization Problem]] 

5. [[Longest Common Subsequence (LCS)]]

**Steps for Time Complexity**
The time complexity to solve the problem is ![[image-10.webp]]

If every subproblem is solved **ONLY ONCE** then
![[image-11.webp]]

**Steps for Space Complexity**
$O (number\ of\ sub-problems + number\ of\ other\ auxiliary\ values\ to\ be\ stored)$  
If every subproblem is solved **ONLY ONCE** then
$\theta (number\ of\ sub-problems + number\ of\ other\ auxiliary\ values\ to\ be\ stored)$  

Easier Example: [[Fibonacci Number]] 
What is the 10-th Fibonacci number $F_{10}$ ? What about the 13-th Fibonacci number $F_{13}$ ?

![[Classes/Archive/Algorithms/Photos/image.webp]]


New Algorithms Using **Dynamic Programming**
**Top-Down:**
![[image0.webp|262x303]]

**Bottom-Up:**
![[image-2.webp]]