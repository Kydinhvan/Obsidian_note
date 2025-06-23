### Basic so far
- ER Model->Relational Model-> (Functional Dependencies->Normalization)
- Relational Algebra: Theoretical Foundation for Operations
- SQL: Practical Language to define, manage, and query that structure
- NoSQL: Alternative Paradigms outside the relational model for specific needs
### Diving Deeper
The internal of the database manage systems.
- how data are fetched from and updated back to the database
- how queries are executed and how to optimize them

### Check list
- [x] Explain the internal structure a hard disk
- [x] Compute the estimated cost for a data operation
- [ ] Explain the roles and functionality of a disk manager
- [ ] Explain the roles and functionality of a buffer pool
- [x] Describe the LRU and Clock Replacement Policy

# Hard disk
## Internal structure

It consists of multiple platter of disks stacked up vertically
Each platter consists of multiple tracks
Arm assembly moved in or out to position a head on a desired track
- Only one head is allowed to operate at any point in time
Each track is divided into multiple sectors
- Smallest physical units that can be read or written
Data are organized into blocks
- A block might span several sectors
- The unit of data transfer
![[Pasted image 20250616135135.png|300]]

## Accessing disk block
Time to access(read/write)a disk block:
- Seek time: move arms to correct platters & track(~20ms)
- Rotation time: rotate to correct sector(~10ms)
- Transfer time: actually move data to/from disk(~0.1ms)
Key to lower I/O cost: reduce seek/rotational delays

>[!note] Disk is slow as seek and rotational time is slow, actual transfer time is fast

## Read/Write Faster!
To minimize the overhead of reading/writing the data blocks back and for the DBMS need to:
1. have some logical mapping over the physical storage -disk manager
2. have some in memory cache -buffer pool

## Disk Manager
Problem: How to store data on disk?
Approach: store the data as a collection of files(not readable by human)
- System Catalog keep tracks of the mapping from database table to files
- Each file is organized as a collection of pages

### Page and Block
Block
- Basic unit of disk storage and transfer for disk read/write
- From the disk perspective
- Determined by the OS(64KB –128KB is a good number today)

Page
- Basic logic unit of Database file
- From the RAM perspective
- Determined by DBMS
- In some texts, “page” = a block-sized chunk of RAM. Stores
	- Data records / tuples
	- The meta info–header (covered soon)
	- Index & log(covered later)

>[!note] They are kinda the same thing, just from diff perspective

---
# Buffer Pool

Buffer pool:
- A fixed size of slots(known as frames)
- Each page is loaded into a frame
- Buffer size: number of frames

Frame Table: for each frame
- Points to memory page
- Meta data: whether the page is pinned / dirty

Frame: 
- Pinned: being used
- Dirty: been written

#### Pin(pageId) algorithm
![[Pasted image 20250616140821.png|500]]

![[Pasted image 20250616140828.png|500]]

![[Pasted image 20250616141016.png|400]]
## Buffer replacement policy
Optimal policy: Evict one requested farthest in the future
Least Recently Used (LRU): at most 2x worse than optimal, without knowing the future.

![[Pasted image 20250616141246.png|400]]

![[Pasted image 20250616141422.png|400]]

## Clock replacement policy
![[Pasted image 20250616142219.png|400]]

•	Imagine the frames in the buffer pool are arranged in a circular list
•	A clock hand (or pointer) moves around this circle to find a page to evict.
•	Each frame has a **reference bit**
	•	1 = recently used
	•	0 = not recently used

The goal of the Clock policy is to find a victim frame to evict:
	•	Must be unpinned (pin_count = 0) meaning it's safe to evict
	•	And not recently used (ref bit = 0) meaning it hasn't been accessed lately

## Most Recently Used (MRU): Evicts the page that was used most recently.


---
# Files of Pages of Records
•	**DB FILE**: A collection of pages, each containing a collection of records.
•	There are many DB File structures (Information stored in files in multiple different ways)
	•	Heap Files - Unordered collections of pages (today)
	•	Sorted Files - Pages and records are in strict sorted order
	•	Index Files - May contain records or point to records in other files

## Heap Files
•	Collection of records in **no particular order**
	•	Not to be confused with “heap” data structure
•	As file shrinks/grows, pages (de)allocated
•	To support record level operations, we must
	•	Keep track of the pages in a file
	•	Keep track of free space on pages
	•	Keep track of the records on a page

## File Layout (How to organize pages)

Option 1: Just store 1 page after another
	Good news: all pages are of the same size
	But: what if you want to find some free space?

Option 2: Linked list
	Maintain two linked list: one stores all pages that are full, another stores all pages with free space
![[Pasted image 20250616143620.png|400]]

Option 3: Directory
•	Each directory contains a fixed set of slots.
•	Each slot contains a pointer to a page and a freespace bit
	•	we could change the freespace bit into a freespace integer field when we want to track how much free space per page
•	Directory slot may also point to another directory if expansion is required.
![[Pasted image 20250616143652.png|200]]

### Page Layout (How to organize records)

Option 1: Unordered sequential layout
	Not good cause if u delete Tuple2, empty slot

Option 2: Heap Page with bit array header
	The i-th bit is 0 implies the i-th tuple slot is unused, otherwise, the slot is used.

Record Layout (What’s in the tuple?)
![[Pasted image 20250616143950.png|400]]

## Cost of Access in Heap Files
•	Consider two layouts:
	•	Sequential Layout: pages are placed contiguously in storage.
	•	Random Layout: pages are scattered across disk.
•	Assume we know the page location 

Annotation:
- $t_{r+s}$: seek (~20ms) and rotate (~10ms)
- $t_{tf}$: transfer time ~ 0.1ms
- $D$: # blocks (or pages)

| Operation            | Sequential Layout      | Random Layout          |
| -------------------- | ---------------------- | ---------------------- |
| **Insert a record**  | $t_s + r + 2 * t_{tf}$ | $t_s + r + 2 * t_{tf}$ |
| **Lookup a record**  | $t_s + t_{tf} * D/2$   | $(t_s + t_{tf}) * D/2$ |
| **Scan all records** | $t_s + t_{tf} * D$     | $(t_s + t_{tf}) * D$   |
>Insert a record $t_s + r + 2 * t_{tf}$ -> Insert means retrieving, changing data and then send it back


>Lookup a record $t_s + t_{tf} * D/2$  -> transfer $*$ 2 to see if it is correct

---
# Index

>[!note] Think index from hash
- Allow **faster data retrieval**.
- Implemented as **data structures** mapping keys to location

### Formal Definition
Function: `f(key) → location`

Operations:
- `insert(key, recordID)`
- `lookup(key) → recordID`
- `lookup(keyLow, keyHigh) → recordIDs`

## Hash table 
```python
d = {}
d['a'] = 1234
'a' in d  # True
```

### Problems with Hashing
#### Problem 1: Hash Function Quality
- **Bad**: Simple modulo-based (e.g., `H(x) = x % 2`)
- **Good**: Cryptographic (SHA-1, etc.) – but slow. | but we want it to be fast 

#### Problem 2: Collisions
- **Open Hashing (Separate Chaining)**:
    - Use **linked lists** to store multiple items at the same slot.
- **Closed Hashing (Open Addressing)**:
    - Try **next slot** (linear probing) or use **Cuckoo Hashing**

#### Problem 3: Unknown number of elements
- **Chained Hashing**: Easy to expand (lists).
- **Linear Probing**: Go to next empty slot.
- **Cuckoo Hashing**:
    - Two hash tables and functions.   
    - If full, **evict another value** and try again.

--- 
### Cuckoo Hashing
- multiple table, multiple hash function
- To insert, check every table for free slot to insert
- if no free slot
	- pick 1 key and rehash with diff hash function to find new pos
	- insert to recently vacated one

- Pro: look up cost: O(1) as you know where to check, just N spots at most
- Cons: might bounce values, hence stuck in infinite loop 0 -> new hash func or add more table

--- 
### Bucket Hashing

---
### B+ Tree
- A **multi-way** balanced search tree.
- **All leaf nodes at same level** (perfectly balanced).
- **Only leaf nodes** contain actual data.

#### Why b+?
- Multi way branching
	nodes can have many children
- Two type of nodes
	Internal node contain only keys for navigation
	Leaf node contain pointer to data or actual data
- Sequential access
	Leaf node connected in a linked list , range queries and sequential scan extremely efficient

property: d, each node list is from d to d $*$ 2 (only apply to non-root node)
#### Delete
- Case 1:
![[Pasted image 20250618104613.png|500]]
- Case 2:
![[Pasted image 20250618104706.png|500]]
![[Pasted image 20250618104735.png|500]]
- Case 3:
![[Pasted image 20250618104859.png|500]]
![[Pasted image 20250618104918.png|500]]

- Pro: search cost: O(logN) similar to binary search tree (BST)
- Cons: might bounce values, hence stuck in infinite loop 0 -> new hash func or add more table

### Clustered vs. Unclustered Index
- **Clustered B+ Tree**:
    - Data in heap file is sorted by index key.
    - Fast sequential access.
- **Unclustered**:
    - Index points to scattered records.

