aka **"re-hashing"**
Every slot in the [[Hash Table]] is a [[Linked List]]

All elements that hash to the same slot are placed in the same [[Linked List]]. This allows the insertion of multiple elements with the same [[Hash Value]].

When to re-hash?

	if 𝛾 < n/m:
		we can rehash by doubling the number of slots

**note!** this will result in key values having new [[Hash Value|hash values]] 

![[Pasted image 20250403195420.webp]]