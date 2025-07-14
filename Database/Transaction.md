# ACID Properties

To ensure data correctness, modern DBMS often ensure certain properties.
Consistency is the developer/user’s responsibility --you must write correct transactions
![[Pasted image 20250714134939.png|400]]

# Transaction 
Two problems with write operations
- Not all op executed 
- concurrent operation race condition
Transaction: a sequence of operations, executed together as one unit
- It will either: execute all or execute none of them
- Make sure the effects aren’t corrupted by other concurrent transactions

```sql
BEGIN
	insert into Secret
	select * from ProductionDB
	where recipient = "Isaac";
	delete from ProductionDB
	where recipient = "Isaac";
COMMIT
```

## Transaction Definition
Gives you correctness but significant overhead

## NAIVE Solution: Shadow File 
- Before BEGIN, make a copy of database
- Changes applied to the copy
- When COMMIT, rename the copy to the master
-> Expensive !

# Transaction -Atomicity
*ALL or NOTHING*

Crash before COMMIT
- When recover: Nothing written to disk
Crash during COMMIT
- When recover:
	- Either nothing written to disk
	- Or, all updates written to disk
Crash after COMMIT
- When recover: All updates written to disk

## Write-Ahead Logging
Before any changes, those changes are first recorded in a log file on disk to ensure enough info to recover in case of a crash
Main idea:
- Changes are first staged in memory
- On COMMIT, make sure the log content is on disk
- After that, transaction is considered successful

## Buffer Manager Role
(Recap) The role of buffer manager
- It decides if/when a page can be written to disk
- Keeps track of what pages are being used by the transactions
Buffer policies:
- STEAL: Allows writing dirty pages from uncommitted transactions to disk
- FORCE: Forces writing all dirty pages of a transaction at commit time
[[Storage (Internal DBMs)#Dirty pages]]
### Steal and Force


## **Logging Strategies**
`T`: **Transaction ID**
`X`: **Data Item or Object**
### 1. **Undo Logging (STEAL + FORCE)**
- Log stores: `<T, X, oldVal>`
- Rule: log must be flushed before updating DB.
- Recovery: **Undo** uncommitted changes.

### 2. **Redo Logging (NO-STEAL + NO-FORCE)**
- Log stores: `<T, X, newVal>`
- Rule: flush log before marking COMMIT.
- Recovery: **Redo** committed changes.

### 3. **Undo/Redo Logging (STEAL + NO-FORCE)**
- Log stores: `<T, X, oldVal, newVal>`
- Most flexible — can recover by both undo and redo.
- Used by modern systems

## Checkpoints
Recovery involves scanning logs. This is slow, so **checkpoints** speed it up.
### 1. **Simple Checkpoint**
- Pause all transactions
- Flush all data to disk
- Write `<CHECKPOINT>` to log

### 2. **Non-Quiescent Checkpoint**
- Allow transactions to continue
- Write `<START CHKPT (T1, T2...)>`
- When those transactions commit and data flushed → `<END CHKPT (T1, T2...)>`

Recovery can now **start from the last checkpoint** instead of scanning the entire log.