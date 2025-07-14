## Java Object Mutex Lock

>`Java Monitor`
>In Java, every object acts as a **monitor** that provides built-in **mutual exclusion** and **condition synchronization** using `synchronized`, `wait()`, and `notify()`. A thread must hold the object’s monitor (via `synchronized`) to call `wait()` or `notify()`, which allows it to coordinate access and signal other threads waiting on shared conditions.


The Java programming language provides two basic synchronization idioms: 
synchronized **methods** and synchronized **statements**.

### Synchronized Method (Anonymous)
```java
public synchronized returnType methodName(args)
{
       // Critical section here
}
```

### Synchronised Statement using Named Object
``` java
Object mutexLock = new Object();
public returnType methodName(args)
{
   synchronized(mutexLock)
   {
       // Critical section here
   }
   // Remainder section
}
```

You can also do a `synchronized(this)` if you’d like to use a synchronised statement anonymously.

---
# Java Condition Synchronization
## NotifyAll

Using only `notify()`, we are not completely free of another **potential** problem yet: `notify()` might not wake up the **correct** thread whose `id == turn`, and recall that `turn` is a shared variable.

We can solve the problem using another method `notifyAll()`: wakes up all threads in the wait set.

## Waiting in a Loop

It is **important** to put the waiting of a condition variable in a `while` loop due to the possibility of:

1. **Spurious** wakeup: a thread might get woken up even though no thread signaled the condition (`POSIX` does this for performance reasons)
2. **Extraneous** wakeup: you woke up the correct amount of threads but some hasn’t been scheduled yet, so some other threads do the job first. For example:
    - There are **two** jobs in a queue, and there’s two threads: thread A and B that got woken up.
    - Thread A gets **scheduled**, and finishes the first job. It then finds the second job in the queue, and **finishes** it as well.
    - Thread B finally gets scheduled and, upon finding the queue empty, crashes.

---
# Reentrant Lock

>A lock is re-entrant if it is **safe** to be acquired **again** by a caller that’s **already holding the lock**. You can create a `ReentrantLock()` object explicitly to allow reentrancy in your critical section.


