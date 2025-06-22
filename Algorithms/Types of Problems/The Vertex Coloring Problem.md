Given a simple [[Undirected Graph]], G, and given an integer $k >= 1$, is G [[k - Colorings of Graph|k-colorable]]?

For each k we have a [[k - Colorings of Graph|k-coloring problem]]


**Example of NP**
This Problem is in [[Non-deterministic Polynomial Time (NP)]] because for every input, there is a [[Certificate]] for a yes answer that can be verified in [[Polynomial Time (P)]]

- A possible [[Certificate]] could be an actual [[k - Colorings of Graph| k-coloring graph]] 
- Therefore we need to check that every edge is incident to two vertices of distinct colors
	- If G has $n$ vertices,  there are at most $\frac{n(n-1)}{2}=O(n^2)$  $\leftarrow$ [[Polynomial Time (P)]]

**This Problem is [[NP-complete]]**
This can be done using [[Polynomial-time Reduction]] and [[Boolean Satisfiability (SAT) Problem]] 
