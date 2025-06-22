When two key values are hashed to the same slot which cannot be avoided if there are **more key values than [[Hash Value|hash values]]** 

Key Idea: Every slot in the [[Hash Table]] is a linked list

Resolutions:
1. [[Hash Chaining|Hash Chaining/Re-hashing]]
2. [[Open Addressing]]

We insert the new element as the head of the linked list by running **list_insert(A[h(k)],x)**
where: 
- h is the [[Hash Function]]
- x is the new element and
- k is the key value