
Storing based on key value: A[x.key] = x for every object

where A is a **Direct Address Table** since we can **LOOK-UP** key values

Operation run in O(1) time

Downside: **More keys means more memory!**

Solution: [[Hashing]] 

## **Operations:**
### **Inserting**
![[Pasted image 20250402124355.webp|300]]

### **Deleting**
![[Pasted image 20250402124500.webp|300]]

### **Searching**
![[Pasted image 20250402124547.webp|300]]

## **Direct Address Table**

**Sample:**

| A[x.key] | Value |
| :------: | :---: |
|   A[0]   |  NIL  |
|   A[1]   |  NIL  |
|   A[2]   |   a   |
|    .     |   b   |
|    .     |  NIL  |
|    .     |   c   |
|    .     |  NIL  |
|    .     |  NIL  |
|    .     |  NIL  |
|   A[9]   |  NIL  |

