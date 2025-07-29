Race condition can happen in db too [[Lab 2 - Time of Check, Time of Use Attack]]

# Serializability

A **schedule** is a sequence of operations from different transactions.

A schedule is **serializable** if the final result is **the same as some serial execution** (one transaction at a time).
- **Conflict Serializability** is a practical way to check for this:
    - Two operations conflict if they:
        - Belong to different transactions,            
        - Operate on the same object,
        - And at least one is a write.
## Conflict Type during Concurrency

| Conflict Type     | Example                                                           | Problem           |
| ----------------- | ----------------------------------------------------------------- | ----------------- |
| Read-Write (R-W)  | T1 reads A, T2 writes A, T1 read expecting same value             | Unrepeatable Read |
| Write-Read (W-R)  | T1 writes A, T2 reads A. T1 no commit yet, T2 reading dirty value | Dirty Read        |
| Write-Write (W-W) | T1 writes A, T2 writes A, overwriting each other changes          | Lost Update       |
## **Conflict Serializability**

A schedule is **conflict serializable** if you can transform it into a serial schedule **by swapping non-conflicting operations**

To determine conflict serializability: **precedence graph**
![[Pasted image 20250728224625.png|500]]

---
2 ways to get satiability in practice:
- Locking to prevent non-serializability from happening
- just do it (then fix it later): Optimistic Concurrency Control (OCC)
# Locking

To enforce isolation, databases use **locks**.
## Strawman Design: Global Lock
- There's **one big lock (L)** for the entire database.
- A transaction must **acquire the global lock** before doing anything.
- Only one transaction can **run at a time**.
- Once it’s done, it **releases the lock**.

**Guaranteed serializability** but **no concurrency**, terrible performance

## Fine-Grained Locks
- Instead of one global lock, use **a lock per data item**: e.g., `LA`, `LB`, `LC`, ...
- When a transaction wants to read/write `A`, it **asks for lock `LA`**.
- When it's done with `A`, it **releases `LA`** (even before the transaction ends).
- Same goes for `B`, `C`, etc.

**Higher concurrency**

**Not safe on its own**:
- If locks are released **too early** (before the transaction ends), another transaction might read or write **incomplete or inconsistent** data.
- This can lead to **lost updates, dirty reads, or write conflicts**, breaking **serializability**.

## Interleaving breaks lock even if rule is followed
![[Pasted image 20250728231234.png|300]]
- **T1 writes to A**, then releases lock.
- **T2 writes to A**, overwriting what T1 did.
- **T2 writes to B**, then releases.
- **T1 then writes to B**, overwriting what T2 did.

Now both transactions have **partially overwritten each other**:
- T1’s write to A is lost.
- T2’s write to B is lost.

Leads to a **inconsistent state**, and there is **no serial execution of T1 and T2** that would result in the **same final state**. So it's **not serializable**.

## Two-Phase Locking (2PL)
Within a Thread: 
- Once release a lock, cannot acquire new ones 
- **Growing** phase: lock acquired
	- The transaction acquires locks (read or write locks).
	- It cannot release any locks during this phase.
	- This phase continues until the first lock is released.

- **Shrinking** phase: lock release
	- Once the transaction releases any lock, it enters the shrinking phase.
	- In this phase, the transaction can no longer acquire any new locks.
	- It can only release the remaining locks it holds.


![[Pasted image 20250728233656.png|300]]
- In **2PL**, once a transaction **releases any lock**, it **cannot acquire any new locks**. 
	- Start Shrinking. Release A
- T1 and T2 both **release A** and then try to **acquire B** — that’s a **2PL violation**.
	- Lock(B)
- Lock manager **rejects** this behavior (marked “FAIL” in red).

![[Pasted image 20250728233717.png|500]]
- Both transactions **acquire all needed locks first** → this is the **growing phase**.
- Then, once they start **releasing**, they **never acquire more locks** → **shrinking phase**.
- This follows the **2PL protocol exactly**.

---
### Cascading Abort
*Even if we followed 2PL, if T1 never commit, T2 who is dependent on T1 will need undo*
A **cascading abort** happens when:
- A transaction **T1 modifies** a value and **releases its lock early**
- Another transaction **T2 reads or writes** that value
- Then **T1 crashes or aborts**
- Now **T2 must also abort**, because it used invalid (uncommitted) data

## Strict 2PL 
*A transaction holds all locks until it either commits or aborts.*
No other transaction can see uncommitted data 
- So if a transaction aborts, no other transaction has depended on its data yet, no cleanup is needed. (Avoids **dirty reads**)
- Slightly **less concurrency** (transactions wait longer) but avoid [[#Cascading Abort]]

### Deadlocks
Link [[Lab 3 Banker Algo]] 
*Two (or more) transactions are **waiting for each other** to release locks. They never proceed.*
Deadlock detection:
![[Pasted image 20250729101934.png|500]]

>To fix: abort one transaction to **break the cycle**

