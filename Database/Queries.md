DBMS execute queries
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