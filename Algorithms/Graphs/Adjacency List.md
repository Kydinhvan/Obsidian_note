for each vertex, v, list its neighbors

[[Directed Graph]] only store **OUTGOING** neighbors

[[Undirected Graph]] store edge in two places

Represented as:
- Array of [[Linked List|linked lists]]

![[Pasted image 20250404111704.webp]]
![[Pasted image 20250405120945.webp]]

[[Space Complexity]]:
- One list node per page -> $\theta(n+m)$ bits

[[Time Complexity]]:
- Adding an edge -> $O(1)$
- Is there an edge from u to v? -> Scan list of u
- Visit all neighbors of u -> $O(neighbors)$
