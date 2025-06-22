A problem 𝑩 is said to be NP-hard if every problem 𝑨 in NP has a [[Polynomial-time Reduction]] to 𝑩.

*Note:* A [[Deterministic Algorithm]] solution for 𝑩 can be used as a subroutine to solve every problem in NP deterministically.

**Key Idea:**
If we can find a [[Deterministic Algorithm]] solution for 𝑩 that runs in [[Polynomial Time (P)]], then this solution can be used to design a polynomial time algorithmic solution for every problem in [[Non-deterministic Polynomial Time (NP)]]. Therefore, solving an NP-hard problem should be “hard”.