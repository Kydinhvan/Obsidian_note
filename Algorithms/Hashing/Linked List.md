Attributes:
1. x<sub>k</sub>.prev = x<sub>k-1</sub>
2. x<sub>k</sub>.next = x<sub>k+1</sub> 
3. L.head = x<sub>1</sub> 
4. **Note: x<sub>1</sub>.prev = NIL & x<sub>max+1</sub>.next = NIL** 

For k objects:
- has k+1 pointers
	k pointers (x<sub>k</sub>) that point to the k-th object X<sub>k</sub> **AND** L.head

## **Operations:**
### **Searching (L is a linked list, x is an element of L, k is a key value)** 
![[Screenshot 2025-04-02 at 12.13.35 PM.webp|500]]
Steps:
1. Initialize L.head (x1) to x
2. while x is not NIL and not they key we are looking for: set x to x.next
3. When done, return x

Complexity is O(n) unless L has an [[AVL Tree]] structure


### **Deleting (L is a linked list, x is an element of L, k is a key value)** 
![[Pasted image 20250402121713.webp|500]]
Steps:
1. If x is not the head: change the link from 1 -> 3 instead of 1 -> 2
	x2 gets lost in the memory and we can't reach it (hence it is deleted)
2. Else if it is the head, make the new head the next item of x
3. If x.next is not the last item, change the link to 3 -> 1 instead of 2 -> 1

### **Key Deleting (L is a linked list, x is an element of L, k is a key value)** 
![[Pasted image 20250402122317.webp|500]]
Steps:
1. Set x to search for the object with the key
2. delete the x object from the list

### **Inserting (L is a linked list, x is a pointer for the inserted object)**
![[Pasted image 20250402122458.webp|500]]
![[Pasted image 20250402122737.webp|300]]

Steps:
1. set x.next to be the head
	if L.head is not NIL then the previous of head should be x
2. set x to be the new L.head and x.prev to be NIL