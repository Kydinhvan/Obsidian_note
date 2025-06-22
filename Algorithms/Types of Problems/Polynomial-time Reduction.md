 Assumptions: We have two problems 𝑨 and 𝑩.
- Problem 𝑨: We want to design an algorithm to solve it.
- Problem 𝑩: We already know an algorithm for solving it.

![[Polynomial-time Reductions-1.webp]]

- We use F and F -1 to reduce Problem 𝑨 to Problem 𝑩

**Key Idea:**
If both algorithms F and F -1 run in polynomial time, then we say that the reduction of Problem 𝑨 to Problem 𝑩 is a **polynomial-time reduction.** 

**Consequences**
Suppose 𝑨 and 𝑩 are problems such that 𝑨 ≤𝑝 𝑩.
1. If 𝑩 is in P, then 𝑨 is also in P.
2. Contrapositive: If 𝑨 is not in P, then 𝑩 is also not in P
3. If we believe that 𝑨 is intractable, then we should also believe that 𝑩 is also intractable.
4. 𝑨 ≤𝑝 𝑩 means that 𝑩 is “at least as hard as” 𝑨.