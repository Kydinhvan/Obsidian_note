# Q2
### Background

Now that you’ve learned how Lamport’s Bakery Algorithm works and why it satisfies the conditions for correct mutual exclusion, it’s time to evaluate its practical usefulness.

There are many ways to solve the critical section problem, including hardware-supported instructions (e.g., `Test-And-Set`), kernel-level mutexes, spinlocks, and other software solutions like **Peterson’s Algorithm** (for two threads). Each has trade-offs in complexity, scalability, performance, and assumptions.

The Bakery Algorithm is remarkable for being:

- Purely software-based
- Scalable to _n_ threads
- Fair and starvation-free

However, its real-world deployment is rare due to hardware assumptions and inefficiencies on modern multi-core architectures.

### Scenario

You are designing synchronization primitives for a small embedded operating system that supports up to 8 concurrent threads. The platform does not support atomic instructions, but it does guarantee sequentially consistent memory (single-core). You implemented Lamport’s Bakery Algorithm successfully, but your teammate suggests replacing it with Peterson’s Algorithm, citing simplicity.

You must defend your design, but also understand when Bakery is or isn’t the better option.

**Answer the following questions:**

1. **Conceptual**: Explain how the Bakery Algorithm guarantees **mutual exclusion**, **fairness**, and **bounded waiting** (briefly recap key ideas).
2. **Comparison**: Compare **Bakery Algorithm** and **Peterson’s Algorithm** with respect to:
    - Number of threads supported
    - Fairness
    - Assumptions and hardware requirements
    - Implementation complexity
3. **Scalability**: What performance issues might arise as the number of threads increases? How does Bakery’s use of arrays affect overhead?
4. **Modern Systems**: Why is the Bakery Algorithm rarely used in modern multi-core systems? What kinds of failures could occur without memory barriers?
5. **Practical Design**: Would a simple spinlock using `Test-And-Set` (assuming hardware allows) be more practical in this case? Justify based on system characteristics.

> **Hints:**
> - Think about Bakery’s use of shared arrays and lexicographic ordering.
> - Peterson’s is for 2 threads only but uses simpler logic.
> - Memory visibility is a major challenge on multi-core systems.
> - A Test-And-Set lock is fast but can waste CPU with busy waiting.
> - Consider energy, determinism, and fairness in embedded contexts.