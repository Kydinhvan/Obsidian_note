Finds all nodes that are **distance 1 from v**, then all nodes that are **distance 2 from v**, and so on. 

Used in both [[Directed Graph]] and [[Undirected Graph]]

Steps:
1. start with vertex v 
2. list all its neighbors (distance 1 from v) 
3. then all their neighbors (distance 2 from v) 
4. etc.

**Traversal Order**
![[Pasted image 20250404160428.webp]]

**Algorithm**

Array Method:
![[Pasted image 20250404160513.webp]]

Queue Method (Use stack and it becomes DFS):
![[Pasted image 20250404160714.webp]]