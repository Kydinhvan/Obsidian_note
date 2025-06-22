For *integer* key values
Main Idea: Define h by the map: 

	h(k) = k mod m 
	
	where:
		1. K is a set of integers
		2. m is the number of slots in the hash table

**Positive mod formula:** [(k/m) - whole#] * m

**Negative mod formula:** x + k
where:
1. x is the smallest multiple of m that is <= k

![[Pasted image 20250403191811.webp]]
