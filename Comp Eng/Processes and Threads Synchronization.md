## Asynchronous Processing

Asynchronous processing allows a program to perform tasks without waiting for others to complete. This is particularly useful in I/O operations where waiting for a resource could block other tasks. Instead, tasks can be started and the program can move on to other tasks while waiting for the initial tasks to complete.

**Example**: Making an HTTP request. The program can initiate the request and then continue executing other code. When the response is received, a callback function can be executed to handle the response.

## Concurrent Processing

Concurrent processing involves multiple tasks making progress over time, but not necessarily simultaneously. This can be achieved through various methods like time slicing, where each task is given a small time slot to execute before moving to the next one.

**Example**: Running multiple threads on a single-core processor. Each thread gets a time slice to run, and the operating system switches between them, creating the illusion of simultaneous execution.

## The Producer Consumer Problem

The **Producer-Consumer** problem is a classic example of a **multi-threading synchronization** issue.
### Scenario:
- A **Producer** creates data and puts it into a **shared buffer**.
- A **Consumer** takes data from the buffer and processes it. (creating an **empty slot**)
- The buffer has **limited capacity** (say, `N` slots), so the producer must wait if the buffer is full.
- Similarly, the consumer must wait if the buffer is empty.

This leads to two key challenges:
1. **Mutual Exclusion**: Only one thread can access the buffer at a time to avoid data inconsistency.
2. **Synchronization**: The producer and consumer must communicate properly (e.g., "Wait until there's space" or "Wait until there's something to consume").

###  Precedence Constraints

--- 
# The Critical Section Problem

Each process may have a **segment** of instructions, called a `critical section` (CS)
This is an important **feature** of the system is that **when one process is executing its critical section, no other process is allowed to execute its critical section**.

This is because in the `critical section` the (asynchronous) processes may be:
- Changing **common** variables,
- Updating a **shared** table,
- Writing to a **common** file, and so on.
### Why is this a problem?
By default, processes are isolated and threads are independent. We need them to coordinate -> need more infrastructure to support and protect this CS (critical section)

## Atomicity
Still can be scheduled out but make sure no other thread can access the CS
### Achieved by
1. 1 clk cycle instruction in single CPU system -> LD/ST is atomic 
2. protect memory region

---
# Solution
Hence we design a protocol that processes can use and sync.

```NOTE
Having CS in your program IS A PROBLEM as it requires complex synchronisation solutions to protect the CS -> More Over
```

There are **two** basic forms of synchronization:
- **Mutual exclusion**: No other processes can execute the critical section if there is already one process executing it.
- **Condition synchronization**: Synchronize the execution of a process in a CS based on certain conditions instead.

## Requirement for a CS Solution
**Mutual exclusion** (mutex): No other processes can execute the critical section if there is already one process executing it (in the case of condition synchronization, this is adjusted accordingly)
**Progress**: If there’s no process in the critical section, and some other processes wish to enter, we need to grant this permission and we cannot postpone the permission indefinitely.
**Bounded waiting**: If process A has requested to enter the CS, there exists a bound on the number of times other processes are allowed to enter the CS before A. 
	In simpler terms, it means that **no process should have to wait indefinitely** to enter its critical section. The waiting time for a process is **finite** and is bounded by a constant number of steps or actions.

## Solution Template

The solution template to a CS problem is as follows:

``` C
while(true){

   [ENTRY SECTION]
      CRITICAL SECTION ...
      ...
   [EXIT SECTION]
      REMAINDER SECTION ...
}
```

The protocol to approach a CS in general causes the process to:
- **Request** for permission to enter the section (entry section).
- **Execute** the critical section when the request is granted
- **Exit** the CS solution
### Properties
Mutex, Progress and bounded waiting **requirements of a CS solution result in** **property** to a CS solution:
- **Safety** property: no race condition
- **Liveness** property: a program with proper CS solution will not hang forever (because technically no progress IS mutex).

The rest of the program that is not part of the critical section is called the **remainder** section.

---
# Known Solutions to protect CS

## Peterson's Solution: Software Mutex Algorithm
Condition: Single core, **atomic** read and write -> supported by hardware
Sync only 2 processes

```c
// Process j: flip i and j
// Process i 
do{
   flag[i] = true; // GLOBAL Var
   turn = j; // GLOBAL Var
   while (flag[j] && turn == j); // this is a while LINE
   // CRITICAL SECTION HERE
   // ...
   flag[i] = false;
   // REMAINDER SECTION HERE
   // ...
}while(true)
```

### Proof of Correctness
#### mutex proof: 
2 scenarios needed
scenario 1: both want to enter:
	Pj -> flag[j] = True, turn = j
	Pi -> flag[i] = True, turn = i
Since turn can only be i or j, mutex is guaranteed
Pi will enter CS while Pj **busywaits** -> Who go in first is determined by turn

scenario 2: Pi in CS and Pj want to enter?

-> reordered question

#### Bounded Waiting proof: 
>[!note] Proof that a process in CS loop back and want to enter CS again but its blocked because it is the other Process turn
 
Scenario: Pi is in CS, Pj want to enter and it is blocked
Pi exists the CS then scheduled to loop again -> want to enter again while Pj is still waiting and not scheduled
`waiting vs scheduled ?`

the moment Pj resumes it now can enter CS. -> Pj waits at most one CS length as 

---
## Synchronisation Hardware
Atomic Instructions (doesn't mean 1 clk cycle only)
No other CPU/core can interrupt or observe a partial update

---
## Software Spinlocks and Mutex Locks

We need hardware support for certain **special** atomic assembly-language instructions
### Spinlocks
A spinlock provides mutual exclusion. It is simply a variable that can be initialized, e.g `pthread_spinlock_t` implemented in C library and then obtained or released using two **standard** methods like `acquire()` and `release()`. An attempt to `acquire()` the lock causes a process or thread trying to acquire it to wait in a loop (“spin”) while repeatedly checking whether the lock is available.

#### Busy Waiting
Busy waiting **wastes** CPU cycles – some other process might be able to use productively, and it affects efficiency tremendously when a CPU is shared among many processes. The spinning caller will utilize 100% CPU time just waiting: repeatedly checking if a spinlock is available.

### Mutex Lock
Does not cause busy wait

---
# Semaphores

a data structure, an int that is used to control access to common resource
The semaphore can be seen as a **generalized mutex lock**. It provides **mutual exclusion**.

It is implemented at the **kernel** level, meaning that its execution requires the calling process to change into the kernel mode via trap (SVC) semaphore instructions. Upon initialization, the semaphore **descriptor** is **inherited** across a `fork`.

A parent process can **create** a semaphore, **open** it, and `fork`. The child process does not open the semaphore and can close the semaphore if the application is finished with it. (semaphore is inherited, child have semaphore pointers to an instance in kernel lvl) 
Note that this means you need to **destroy** a semaphore (just like shared memory) after you’re completely done with it (no other processes or threads using it).

This is a high-level **software** solution that relies on **synchronization hardware** (like those special atomic instructions), and is considered a more **robust** tool than mutex lock.

Peterson’s solution and the hardware-assisted solutions all require busy waiting. However using semaphore, you can express a solution to the CS problem without busy waiting.

## Definition 
Semaphore is defined as:
- An **integer variable** that is maintained in the kernel, initialized to a certain value that represents the number of **available** resources for the sharing processes
- Is accessed only through two standard **atomic** System Call operations: `wait()` and `signal()`.

### Precedent Constraint


## Implementation
- Binary: init as 1
- Counting: init as >1
wait and signal are CS 
shorter than CS -> it is ok to busy wait

### Wait()
```c
wait(semaphore *S)
{  S->value--;
   if (S->value < 0)
   {
       add this process to S->list; // this will call block()
   }
}
```
is a busy wait that is implemented as [[Processes and Threads Synchronization#Spinlocks|spinlock]] in kernel using hardware
Processes in queue to call wait

### Signal 
```c
signal(semaphore *S)
{
   S->value++;
   if (S->value <= 0)
   {
       remove a process P from S->list;
       wakeup(P);
   }
}
```

### Semaphore in MPC
```c
semaphore chars = 0; // To sync a prod and a consumer 
semaphore space = N; // to ensure precedence constraint
semaphore mutex_p = 1; // sync with producers
semaphore mutex_c = 1; // sync with consumers
```

#### Producer prog
```c
void send (char c){
   wait(space); // check for space
   wait(mutex_p); // check if other resource is ...

// this is the CS
   buf[in] = c; 
   in = (in + 1)%N;
// end of CS

   signal(mutex_p); // done, allow other process to write
   signal(chars); // allow consumer to read
}
```

#### Consumer prog
```c
char rcv(){
   char c;
   wait(chars); // check for chars for what
   wait(mutex_c); // 

   c = buf[out];
   out = (out+1)%N;

   signal(mutex_c);
   signal(space);
}
```


---
# Condition Variables

a sync primitive that allows processes to sleep and wait for a certain condition to be true

>[!Note] Thread 1 must go before Thread 2

```c
pthread_mutex_lock(&mutex);
// CRITICAL SECTION
// ...
cond_x = true;
pthread_cond_signal(&p_cond_x);
pthread_mutex_unlock(&mutex);
```
```c
pthread_mutex_lock(&mutex);
while (cond_x == false){
   pthread_cond_wait(&p_cond_x, &mutex);  // yields mutex, sleeping
}
// CRITICAL SECTION, can only be executed iff cond_x == true
// ...
pthread_mutex_unlock(&mutex);
```
Process 2 should **not** proceed to its CS if `cond_x` is `false` in this example.
Process 2 get signal -> get woken up and check condition, during this time the condition true false might hv changed by other processes. -> **recheck condition using while loop**



---
# Activity 4
### Question 1

For semaphore to work, acquire() and release() must be atomic i.e., they are **critical sections.**
Wait a minute: we define semaphores to solve the CS problem, but their implementation now requires a solution to the CS problem! How do we escape from the **circular logic?**
**One way to guarantee the atomicity of acquire/release without semaphore is use solutions with BUSY WAIT.**    
What **software** and **hardware** solutions are available?
#### Ans
- Manually perform hardware interrupts
	    **not a recommended practice**; it’s inefficient and unreliable in multiprocessor systems.
- Software Peterson's Algorithm
	    **Peterson’s Algorithm** is a **software-only busy-wait** solution that works for 2 processes in a uniprocessor system. It ensures **mutual exclusion**, but has limitations (doesn’t scale well).
- Kernel Scheduler System Call
	    is **not busy wait**—it's a context switch–based solution that **avoids** busy waiting, not enforces it.
- Hardware getAndSet instruction
	    **getAndSet** (or `test_and_set`, `compare_and_swap`) is a **hardware-supported atomic instruction**. It **guarantees atomicity** and is commonly used to implement **spinlocks**, mutexes, and semaphore internals.

### Question 2
We can busy wait to solve the CS problem for semaphore acquire/release, but we use semaphore for other kinds of CS problems.
What’s special about semaphore acquire/release as compared to busy wait?
#### Ans
- Busy waiting can only be done for instructions that do not take up too much CPU cycles
	True but missing explanation about code length
- The instructions for acquire/release are short, so a busy waiting solution for them is acceptable
	Yes, busy waiting wastes CPU time completely, so it is only acceptable if code is short
- Nothing special about them
- The instructions for acquire/release are longer than general processes instructions, so a busy waiting solution for them is acceptable

### Question 3
Assume we have a shared buffer of size N, and we allow multiple producers and consumers. Given skeleton producer code (no synchronization):
```c
public void produce(Work item) {    // is “in” a shared variable in this problem? 
	buffer[in] = item;    
	in = (in + 1) % N; }
```

> **What activities require synchronization?**
#### Ans
**Options**:
- A. Ensuring mutual exclusion in writing to or reading from the shared buffer
	- Yes `in` is a **shared index**. If two producers run concurrently without locking, they could both try to write to `buffer[in]`, leading to a **race condition**.
- B. Ensure there's at least one empty buffer slot for producers before writing
	- Producers must check there is **space** in the buffer. If the buffer is full, they must **wait**. This is typically done using a **`space` semaphore**.
- C. Ensure there's at least one filled buffer slot for consumers before consuming
	- Consumers must check there is **at least one item** in the buffer. If the buffer is empty, they must **wait**. This is done using a **`chars` semaphore**.
### Question 4
Consider the producer-consumer problem.
- With semaphore, when consumer creates an empty slot, you call the **release()** method
- With Java synchronized method, when consumer creates an empty slot, you can call the **notify()** method 
At first glance, **release()** and **notify()** look similar. But they also have a subtle **difference**. You can begin by thinking when customer creates an empty slot **_without_** any producers already waiting for the slot,
- What will be the effect of release()?
- What will be the effect of notify()?
#### Ans
When consumer creates an empty slot by removing something, they call `release()` with semaphore method:
- A semaphore is an integer counter. When .release() is called, the semaphore (counter increase) no matter if a producer thread is waiting or not.
- Later, when a producer calls `.acquire()`, it won't block — because the counter is already positive.
- The signal (available slot) is remembered by the semaphore. The counter acts as state.

When consumer creates an empty slot by removing something, they call `notify()` with java sync method:
- A thread can call `.notify()` to wake one waiting thread. This changes the thread state from blocked to runnable. If there is no thread waiting, nothing happen (as nothing wake up) when .notify() called
- Later, when a producer calls `.wait()` it has to wait for the next .notify(), because it missed the earlier signal
- lost signal when no producer waiting