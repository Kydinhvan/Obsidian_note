# Query life cycle
![[Pasted image 20250712122844.png]]
	[[SQL]] is declarative, tell the sys what to retrieve but not how to do it

SQL query -> relational algebra 

Relational algebra -> logical plan tree (formula to expression tree)
- **Leaves** represent tables
- **Nodes** represent operations (like filters, joins, projections)

Logical query -> physical query
- **Relation (bottom node)** → Decide the **access method** (e.g., full table scan, index scan)
- **Operator** → Pick the **algorithm** (e.g., hash join, nested-loop join)

*need to find best physical query with lowest cost*
- The **optimizer** evaluates multiple physical plans using a **cost model** (I/O, CPU usage, memory).
- It selects the plan that offers the **best performance** based on statistics like table size, index presence, and selectivity.

---
# Equivalence Rules

*help with generating alternative logical plans*

### **Commutative**: `A ⨝ B ≡ B ⨝ A`
![[Pasted image 20250712124629.png]]
### **Associative**: `(A ⨝ B) ⨝ C ≡ A ⨝ (B ⨝ C)`
![[Pasted image 20250712124742.png]]
### **Distributive**: `σ(condition)(A ⨝ B) ≡ A ⨝ σ(condition)(B)`
*if condition applies to B also*
![[Pasted image 20250712124845.png]]

---
# Cardinality Estimation
#### Key stats per relation (from the catalog):
- `|R|` = number of tuples
- `B(R)` = number of pages
- `V(A,R)` = number of distinct values of attribute A
- `Min(A), Max(A)` = value range


---
# Execution Model
*Given a physical query plan, how does DBMS execute it?*
## Iterator Model
Operators and tables are all iterator
>[!note] Think Java iterator, next() method

Built during **query planning**
``` 
     π name
       ↑
     ⨝ (join)
     ↑   ↑
 σ rating  σ bid
   ↑        ↑
 Sailors   Reserves
```

Each node (operators) ask its child for a tuple with `next()`
Hence data flows bottom-up, one tuple at a time, 
-  + process tables without using mem
- - Every single tuple requires a method call -> High overhead from method calls

## Materialization Model
*Executes each operator **fully and completely** before moving on to the next one*
- The output of every operator is **materialized** (i.e., stored in memory or disk)
- The next operator reads its **entire input from that stored result**

## Vectorized Model
*Processes **batches of N tuples** at once — instead of handling one tuple at a time like the iterator model*
- Operators expose a `next()` method, **but it returns a vector (batch)** of tuples instead of a single one

---
# Cohort QNS 

![[Pasted image 20250710145450.png]]
join Sailors and Reserves

**Selection**: `σ(bid = 100)`
- filters the result to only those where the **bid = 100**.

**Selection**: `σ(rating >= 5)`
- Applied **after the join**, meaning only matched sailor-reservation pairs are considered.
- Filters to only those tuples where the sailor has rating ≥ 5

**Projection**: `π(sname)`
- Extracts only the sailor's name from the result.

![[Pasted image 20250710150528.png]]
So, **by convention**, in most query plans and iterator models:
- The **left child of the join is treated as the outer**.
- The **right child is the inner**.
**Outer relation**: Sailors
**Inner relation**: Reserves

Steps:
1. Read the outer relation
2. for every outer relation tuple, read inner relation

|S| = 80 tuples/pages * 500 pages → Sailors has 40,000 tuples
|R| = 100 * 1000 → Reserves has 100,000 tuples
Pages: B(S) = 500, B(R) = 1000

sel(rating ≥ 5) = 0.6 → |S'| = 0.6 * 40,000 = 24,000 tuples after selection
sel(bid = 100) = 1/100 = 0.01 → |R'| = 0.01 × 100,000= 1,000 tuples after selection

$B(R) + |R| ∙ B(S)$ [[Queries#Nested Loop Join|Nested Loop Join Cost]] (R is outer, S)

500 + 40000 * 1000 =  
pages read by Sailors heap scan and the repeated heap scans of Reserves inside nested loop (for each pages, scan )

![[Pasted image 20250712155221.png]]
outer: S, inner: R

outer tuple