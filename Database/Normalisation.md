# decomposition

---
# normal forms
## 1st Normal Form (1NF)
Flat schema:
- Types are atomic
- No repeating groups

---
## 2nd Normal Form (2NF)
1NF, and:
- All non-key attributes fully dependent on candidate key

### Example

---
## Boyd-Codd Normal Form (BCNF)
- Non-trivial ? ask 
- Super Key: X->R (X determines all attributes in R)
### BCNF Decomposition Algo (not tested)

---
## 3rd Normal Form
Relation R with FD set F is in 3NF if:
- For any non-trivial X→Y in F+, then
	- X is a super key
	- Or, Y is part of a candidate key
- In other words, no partial dependency and no transitive dependency of which RHS is not part of a key
![[Pasted image 20250611105300.png|300]]
AB is the super key as it determines all attributes
yes it is 3NF
Not BCNF: C is not candidate key -> not super key

Read Summary slide