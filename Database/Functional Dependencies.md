A functional dependency is a **constraint** between two sets of attributes in a
relation from a database

The value of functionally X1, … Xm determines the value of Y1,...Yn
### Definition
![[Pasted image 20250609135420.png|500]]
1. SID should uniquely identify name but it is not
2. Cannot prove that there is a functional dependence based on one instance

### Implied Functional Dependencies
![[Pasted image 20250609135834.png|500]]
#### Armstrong Axioms
![[Pasted image 20250609140637.png|500]]

Exercise: X->Y, X->Z implies X-> YZ
1. Augmentation: XZ->YZ (add Z), XX->ZX (add X)
2. Transitivity: note: XX -> XZ == X -> XZ
	- if XZ -> YZ and X -> XZ (X -> XZ -> YZ)
	- `X -> YZ`

Exercise: X → YZ implies X → Y and X → Z?
1. Reflexivity: 
	- Since Y ⊆ YZ: `YZ → Y`
	- Since Z ⊆ YZ: `YZ → Z`
2. Transitivity:
	- Since, X → YZ, YZ → Y: `X → Y`
	- Since, X → YZ, YZ → Z: `X → Z`

---
## Closure Set of FDs
![[Pasted image 20250609141931.png|500]]

## Canonical Cover Set of FDs
![[Pasted image 20250609141955.png|500]]
![[Pasted image 20250609142937.png|500]]

### Why canonical cover:
- Minimum set of constraints to be checked
- Let us find candidate key for a relation:
### Different kinds of keys:
- Super key:
	- Set of attributes that functionally determines all other attributes
	- In other words, it's the set of attributes that uniquely identify tuples
- Candidate key: minimal set of attributes that uniquely identify tuples
- Primary key: one candidate key
![[Pasted image 20250609143157.png|500]]