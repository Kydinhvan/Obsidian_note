1. Upon any instruction fetch or instruction,  the CPU will first look for requested data in the cache
2. If the information is found in the cache, return the content to CPU ([[Cache Hit]])
	Otherwise it is a [[Cache Miss]] 

3. If it is a [[Cache Miss]]:
	Look for the requested content in the [[Dynamic Random-Access Memory (DRAM)|physical memory]] 
	Once the content is found, replace the unused cache content with the new content

**[[Swap Space]]**
**dedicated unused space** on the disk that is set aside to serve as an extension for the RAM

## **Average Access Time**
time to access a particular content in a system with a cache and a physical memory
![[The Cache Idea-1.webp]]
*Note: DMA refers to direct memory access*

$t_{ave} = \alpha t_c + (1-\alpha)(t_c + t_m)$ 
$= t_c + (1 - \alpha ) t_m$ 

where:
- $\alpha$ is cache hit ratio (count of requests with a [[Cache Hit|cache hit]] — total request count),
- $t_c$ is cache access time, and
- $t_m$ is physical memory access time

**Types of Cache**
1. [[Fully Associative (FA) Cache]]
2. [[Direct Mapped (DM) Cache]]

