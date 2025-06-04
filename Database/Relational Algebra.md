## Notation
| Selection | Projection | Diff | Union | Intersect | Join | Product | Rename | Aggregation |
| --------- | ---------- | ---- | ----- | --------- | ---- | ------- | ------ | ----------- |
| σ         | π          | −    | ∪     | ∩         | ⨝    | ⨯       | ρ      | γ           |

---
## Product 
`R ⨯ S` - size of result: 5 x 5 = 25
**R(A, B)       |     S(A, B)**

| A   | B   | A   | B   |
| --- | --- | --- | --- |
| a1  | 101 | a1  | 101 |
| a2  | 102 | a2  | 102 |
**R ⨯ S (Cartesian Product)**

| R.A | R.B | S.A | S.B |
|-----|-----|-----|-----|
| a1  | 101 | a1  | 101 |
| a1  | 101 | a2  | 102 |
| a2  | 102 | a1  | 101 |
| a2  | 102 | a2  | 102 |


---
## Left Outer Join
Join all element on the `left` relation, if there is no instance on `right` relation put *`null`* 
![[Pasted image 20250528103601.png|250]]

---
## Aggregation
Use SUM(), AVG(), MIN(), MAX(), COUNT()
![[Pasted image 20250528103821.png|110]]      ![[Pasted image 20250528103830.png|150]]
$$
\rho_{(C,\text{CNT})} \left( c \ \gamma_{\text{COUNT}(B)} (R) \right)
$$


