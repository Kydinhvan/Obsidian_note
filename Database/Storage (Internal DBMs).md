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
- [ ] Explain the internal structure a hard disk
- [ ] Compute the estimated cost for a data operation
- [ ] Explain the roles and functionality of a disk manager
- [ ] Explain the roles and functionality of a buffer pool
- [ ] Describe the LRU and Clock Replacement Policy

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
•	Collection of records in no particular order
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
$t_s + r + 2 * t_{tf}$ -> Insert means retrieving, changing data and then send it back