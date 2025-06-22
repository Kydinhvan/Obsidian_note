Represented as an n-x-n matrix
$A = (a_{ij})$

where:

[[Undirected Graph]]:
	$a_{ij} = 1$ if {i, j} is an edge
	$a_{ij} = 0$ otherwise

[[Directed Graph]]:
	$a_{ij} = 1$ if (i -> j) is an edge
	$a_{ij} = 0$ otherwise

![[Pasted image 20250404112358.webp]]
[[Space Complexity]]:
- Uses $n^2$ entries -> $\theta(n^2)$ bits 

[[Time Complexity]]:
- Adding an edge -> $O(1)$ 
- Is there an edge from u to v? -> $O(1)$ 
- Visit all neighbors of u -> $\theta(n)$
