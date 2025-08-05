
| Aspect       | **Process**                                                  | **Thread**                                                 |
| ------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| What it is   | A self-contained unit of execution with its own memory space | A lightweight unit of execution inside a process           |
| Independence | Independent from other processes                             | Shares memory space with other threads in the same process |


---
# Type of Thread Mapping

## Many to Many

---
# Multicore Programming

# Amdahl’s Law

Given that α is the **fraction** of the program that must be executed serially, the **maximum speedup** that we can gain when running this program with N CPU cores (processors) is:
