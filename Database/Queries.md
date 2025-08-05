DBMS execute queries
# COSt

We consider cost of moving data from disk to mem, 
# Select

![[Pasted image 20250623141630.png|300]]
$σ_{c}(R)$: Select tuples satisfying condition C from relation R

To estimate the cost, we use:
- B(R) when we care about I/O cost-disk I/O works at the page level
- |R| is relevant when counting how many tuples need processing (e.g., how many satisfy a condition).
## Select with Heap File
![[Pasted image 20250623141827.png|500]]

## Select with B+ Tree Index
Clustered
![[Pasted image 20250623141929.png|500]]
Cost: 
- $log_d(|R|/d)$ : the division get u number of leaf
	- log it to get height
	$\alpha(C,R)*B(R)$ : How many pages we need to read
	- alpha value alw lesser equal 1 
	-  

Unclustered
![[Pasted image 20250623141943.png|500]]
Cost: 
- $log_d(|R|/d)$ : the division get u number of leaf
	- log it to get height
	$\alpha(C,R)*|R|$ : How many pages we need to read
	- alpha value alw lesser equal 1 
	-  diff between clustered and unclustered

![[Pasted image 20250623142825.png|500]]

--- 
# sort

Order is important
- For duplicate elimination (DISTINCT)
- For aggregations (GROUP BY)
- Because user wants it (ORDER BY)

## External Sort
External Merge Sort:
1. Divide the data into chunks that fit into memory (called **runs**).
2. Sort each run in memory and write it back to disk.
3. Merge these sorted runs into larger sorted runs, repeatedly, until all the data is sorted.

>[!warning] go thru example

---
# Join

![[Pasted image 20250625101226.png]]
## Nested Loop Join
```
for each tuple in R:
	for each tuple in S:
		output any matched pairs
```

Cost: $B(R) + |R| ∙ B(S)$

## Block Nested Loop Join
use all available buffer
check each block
M-2 for outer, 1 for inner relation, 1 for output
### Cost

We consider cost of moving data from disk to mem, 

$R ⨝id S Cost: B(R) + B(S) ∙ ⌈B(R)/(M-2)⌉$
$S ⨝id R Cost: B(S) + B(R) ∙ ⌈B(S)/(M-2)⌉$

---
## Index Nested Loop Join
Assumption: Index exists on S, S is the inner relation
```
For each record t in R
	lookup index to find u in S such that t.id= u.id
```

### Cost 
Depends on index type:
- Clustered index: B(R) + |R| ⋅K
K is a constant, for example, K = 4 if the height of the tree is 3

---
## Sort-Merge Join
$Sort R: 2⋅B(R)⋅(1+ ⌈logM-1⌈B(R)/M⌉⌉)$
$Sort S: 2⋅B(S)⋅(1+ ⌈logM-1⌈B(S)/M⌉⌉)$
$Scan: B(R) + B(S) (average case)$

---
## Basic Hash Join


