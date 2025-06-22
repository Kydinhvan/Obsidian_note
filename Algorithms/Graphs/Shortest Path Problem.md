Problem: Given $𝐺 = (𝑉,𝐸)$ a weighted directed graph, and two vertices $𝑢$ and $𝑣$, find a shortest path in $𝐺$ from $𝑢$ to $𝑣$.
- Let the weight function of $𝐺$ be $𝑤:𝐸 → ℝ$. 
- Among all possible paths from $𝑢$ to $𝑣$, consider the weights of these paths. Let $𝛿 = 𝛿(𝑢,𝑣)$ be the smallest possible weight.
	- $𝛿(𝑢,𝑣)$ is called the shortest-path weight from $𝑢$ to $𝑣$.

In the case of negative-weight cycles:
we define $𝛿(𝑣_1, 𝑣_2) = −∞$.

Ways to Solve:
- [[Dijkstra's Algorithm]] 
- [[Bellman-Ford Algorithm]]
