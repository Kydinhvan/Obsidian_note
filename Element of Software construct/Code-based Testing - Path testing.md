# Learning Outcomes 
- Construct a control flow graph from a structured program
- Explain different types of test coverage metrics based on program graph 
- Apply path testing techniques to generate test case to attain path coverage and MCDC coverage.

### **Code-based Testing vs Specification-based Testing**
- **Specification-based testing:**
    - Derives test cases from **specifications or requirements**.
    - Goal: To ensure the system meets its **external expectations**.
- **Code-based testing:**
    - Derives test cases from the **internal structure** of the code.
    - Goal: To ensure **all logic and paths are tested**.

### Path Testing 
- Goal: Design tests to **cover all paths** in the CFG.
- Full path coverage is often impractical due to loops.
- **Condensation** simplifies loops to one node (assuming one iteration max).

# Edge vs Condition Coverage

## Edge coverage
*Requires **every edge in the control flow graph (CFG)** to be executed at least once.*

To get **edge coverage**, we only need:
- One test where the condition evaluates **true**
- One test where the condition evaluates **false**

## Condition Coverage
```js
(x > 10 && y < 5) || (x === y)
```
This is a **compound Boolean expression** composed of 3 **atomic conditions**:
- `A: x > 10`
- `B: y < 5`
- `C: x === y`
**Edge coverage does not require evaluating every atomic condition to both true and false.**
So here's what could go wrong:
- The code has a **bug in the `(x === y)` clause**
- But your test cases never trigger it because **`(x > 10 && y < 5)` is true**, so the whole condition short-circuits before reaching `x === y`

>*Required each atomic condition (`x > 10`, `y < 5`, `x === y`) evaluated:*
- *at least once as **true***
- *at least once as **false***

# Modified Condition/Decision Coverage (MCDC)

This is a **compound Boolean expression** composed of 3 **atomic conditions**:

- `A: x > 10`
- `B: y < 5`
- `C: x === y`
