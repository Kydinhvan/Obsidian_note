
### **Overview of Big Data and HDFS**
- **Big Data** is characterized by the 3Vs: **Volume**, **Velocity**, and **Variety**. 
	- Two additional Vs often considered are **Veracity** and **Value**.
- **HDFS** is the storage layer of the Hadoop ecosystem

### **Architecture of HDFS**
- **Master-slave architecture**:
    - **NameNode** (Master): Manages metadata and file directory.
    - **DataNodes** (Workers): Store actual file blocks.
- **Block size**:
    - Typically 128MB in newer versions (64MB in older).
- **Replication**:
    - Each block is typically replicated **3 times** for fault tolerance.
- **Why not P2P?**
    - Central coordination via NameNode simplifies consistency and fault handling.

### **File System Model**
- **Hierarchical namespace** (e.g., `/A/B/mydoc.txt`)
- Files are split into **large blocks** and distributed across nodes.
- **Good for large files**; optimized for **sequential reads and writes**, not random access.

## **Replica Placement Strategy**
To reduce risk and balance load:
### Replica 1:
- Placed **on the same rack as the client**, preferably the **local DataNode**.
    - If the client is outside the cluster (e.g., submitting from edge), pick a random node.
### Replica 2:
- Placed **on a different rack** from the first replica.
    - This ensures that if **an entire rack fails**, data is still available.
### Replica 3
- Placed **on the same rack as the second replica**, but on a **different node**.
    - This helps reduce **cross-rack network traffic** while still maintaining fault tolerance.
- ≥4 replicas: placed randomly.
### Limits:
- Max 1 replica per DataNode.
- Max 2 per rack
---
# HDFS client operation

## Read
![[Pasted image 20250724004743.png|500]]
## write

### Normal
![[Pasted image 20250724004804.png|500]]
### Failure Handling
If **one of the DataNodes fails** during the write:
> (a) The written ones are retained  
> (b) The NameNode is informed the block is under-replicated (1 or 2 copies instead of 3) 
> (c) The pipeline will re-initialize for the next block

![[Pasted image 20250724011426.png|500]]
### Write Finalize
- Client sends `close`
- Each DataNode checks if the minimum replication factor is met.
- Final ACK is sent to the client.
![[Pasted image 20250724013014.png|500]]
### Problem - Simultaneous Writing
Multiple clients
- Request the same "last block"
- Write **without coordination**
- Produce **inconsistent data**
-> not atomic 
Link: [[Processes and Threads Synchronization#Atomicity|CSE Atomic]]
# Erasure Coding

### Traditional Replication (e.g., RF=3):
- Each block is stored **3 times**.
- Storage overhead = **200%** (i.e., 3× the space).
-> Erasure

Erasure Coding splits your data into:
- **k** data blocks
- **m** parity blocks

The combination of **k + m blocks** forms a **codeword**.
> Even if **up to m blocks are lost**, the original data can still be **reconstructed**
![[Pasted image 20250724023516.png|500]]
- 6 data + 3 parity = 9 blocks 
	- data blocks (original data)
	- parity blocks (redundant, calculated via linear combinations)
- If you lose **up to 3 blocks**, you still have 6 remaining = enough to recover all data.

**Can lose 3 parity blocks out of 9**

>[!note] Dimension of the Generator Matrix? -> GT is size `(k + m) × k

---
# In class discussion

## Discussion 1 - HDFS Append and Correctness

### Q1: Why HDFS append doesn’t ensure correctness?
Because of race condition, if multiple clients append at the same time, it will produce inconsistent or corrupted data. HDFS was not designed for concurrency appends
[[#Problem - Simultaneous Writing]]
### Q2: Why is it hard to guarantee correctness?
To guarantee correctness:
- Strict **synchronization** across distributed nodes.
- **Locking** on the last block or file.
- Global **consensus** on write ordering.

In HDFS:
- If a **failure** happens mid-write:
    - Some DataNodes may **retain the block**, some may not.
- When client **retries**, it might:    
    - **Duplicate data**
    - **Lose partial data**
- **No global lock or transaction mechanism** guarantees a consistent result.

## Discussion 2 - Erasure Coding
In an Hadoop setup, the erasure coding configuration is RS(12,6)
1. What is the storage overhead? -> m / k -> 6/12 = 50%
2. What is the storage efficiency? -> 12/18 = 66.7%
3. What is the fault tolerance level? (how many rows we can afford to lose)
	- Total blocks stored = 12 + 6 = 18 blocks = a **codeword**
	- **can lose 6 parity blocks** (redundant, calculated via linear combinations)
4. What is the dimension of the Generator Matrix? -> GT is size `(k + m) × k`
	- 18 × 12

RS(k,m) -> RS(12,6)
- 12 data blocks (original data)
- 6 parity blocks (redundant, calculated via linear combinations)
You can lose **any 6** of these 18 blocks and still **reconstruct the original 12**.

## In-Class Discussion 3 - HDFS Capacity Planning
Suppose you are engaged by a client to setup a HDFS for data
computation. Here is the user requirement
- Existing active data size **5TB**
- Estimated year-over-year data **growth rate 80%**
- **50% buffer space** for intermediate/temp data file
- HDFS **replication factor 3**
1. What is the projected disk space requirement for HDFS in 3 years time?
2. What is the projected disk space requirement for HDFS in 3 years time, if we replace RF=3 by RS(10,4)?

### What is the projected disk space requirement for HDFS in 3 years time?
Step 1: Calculate data growth
Year-by-year growth:
- Year 1: 5TB × 1.8 = 9TB
- Year 2: 9TB × 1.8 = 16.2TB
- Year 3: 16.2TB × 1.8 = **29.16TB**

Step 2: Add buffer
29.16TB × 1.5 (50% buffer) = **43.74TB**

Step 3: Apply replication factor
43.74TB × 3 = **131.22TB**
**Answer: 131.22 TB**

### What is the projected disk space requirement for HDFS in 3 years time, if we replace RF=3 by RS(10,4)?
- Overhead = `m / k = 4 / 10 = 40%`
- Efficiency = 10 / 14
So:
- Data + buffer = 29.16TB × 1.5 (50% buffer) =**43.74 TB**
- ***Apply overhead: 43.74 × 1.4 = 61.24 TB ***

