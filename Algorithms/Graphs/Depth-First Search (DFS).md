Keep following a path until you get stuck, **then come backwards until you see another opening** then go down again

The result is a [[Predecessor Subgraph]] 

Used for both [[Directed Graph]] and [[Undirected Graph]]

Can be used to perform a [[Topological Sorting|Topological Sort]]

**Types of Edges:**
1. [[Tree Edges]] - new nodes discovered
2. [[Back Edges]] - links back to an ancestor node, **self-loops** also count (there is a cycle)
3. [[Forward Edges]] - already discovered that node\
4. [[Cross Edges]] - acts as bridges between nodes in other branches of the same or different tree


**Traversal Order**
![[Pasted image 20250404160418.webp]]

**Algorithm**
![[Pasted image 20250404161409.webp]]