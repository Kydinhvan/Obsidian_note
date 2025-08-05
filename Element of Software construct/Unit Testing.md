Specification vs code based testing
## Testing Level
Requirements/Spec: System testing
High-level design: Integration testing
Detailed design: Unit testing

# Specification-based (Black-box)
- Treats function as mathematical mapping
- Test cases based solely on input/output spec
- Focuses on confirming requirements

## Boundary Value Testing
In Boundary value testing, to define the test cases, we analyze the inputs to the test subject by identifying
1. what are the input variables.
2. what are the valid ranges.

>[!Warning] A problem with BVT is that many of the test cases can be *redundant*

To resolve this -> [[Unit Testing#Equivalence Class Testing]]
### Normal Boundary Value Testing
We consider the following two assumptions.
1. assuming that our source language is strongly type and the type checker would reject values of the inputs out side of the domain.
2. assuming when an error occurs it is solely caused by one of the inputs but not a combination.

let say
- **x1** with range `[a, b]` 
- **x2** with range `[a2, b2]`
number of test case: 
- x1 -> 4 (a, a+1, mean, b-1, b) - ignore mean, it is a fixed variable
- x2 -> 4

### Robust Boundary Value Testing 
- **Drops Assumption 1** → includes **invalid/out-of-range** values
- Adds extra tests: `a-1`, `b+1` for each input

### Worst Boundary Value Testing
- **Drops Assumption 2** → tests **combinations** of boundary values
- Test at **corners** of the input domain

### Robust Worst-case BVT
- Combines **invalid values** and **combinations**
- Most thorough, but creates **large number of test cases**

### Equivalence Class Testing
Group input values into **partitions** that are expected to behave similarly
Choose **one representative value** from each class
Minimizes test count without reducing coverage
## Code-based (White box)
- Test derived from knowledge of implementation
- This aim to maximize code coverage
