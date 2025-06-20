The banker algorithm check a request for resources before granting it. This is to avoid deadlock (a circular wait)
- It predicts and computes if request will lead to deadlock. rejected if yes/ else granted

>[!note] It is a resource allocation and deadlock avoidance algorithm

## Prerequisite

The algorithm need to now the **maximum** demand of process `i` for resource `j` instances

## System State
### Safe State
Iff (if and only if) there is a sequence`<P1,... Pn>` such that each `Pi` in the sequence will only ever need `resources` that is currently available and `recourses` held by `Pj `with `i<j`

In this state, there will be no deadlock
Else, there is a possibility of deadlock

## Banker logic 
### Grant the request (hypothetical)

**Loop to simulate process completion:**

- Start a **`while` loop** that continues until no processes can be completed in one iteration:
    1. **`found = False`**: A flag to track if any process can finish in the current iteration.
    2. **Loop through all processes (`i` from 0 to `N-1`)**:
        - If the process `i` is **not finished** (`finish[i] == False`) and can finish with the current resources (`need[i][j] <= work[j]` for all resource types `j`), perform the following:
            - **Mark the process `i` as finished**: `finish[i] = True`
            - **Update `work[]`**: Add the allocated resources of the process `i` to `work[]`, as the process has now completed and released those resources.
            - **Set `found = True`**: Indicate that progress was made in this iteration.
            - **Break the loop**: Restart the loop to check if any other process can now finish with the updated resources (`work[]`).
    3. If **no process** was found that can finish (`found == False`), break the **`while` loop**.

--- 
## Question to better understand:
![[Pasted image 20250620150826.png|300]] ![[Pasted image 20250620150856.png|300]] 

What are the possible **safe** execution sequence(s)?
Given the original system state, P1 now requests (1,0,2) (from need matrix)

| Need | A   | B   | C   |
| ---- | --- | --- | --- |
| P0   | 7   | 4   | 3   |
| P1   | 1   | 2   | 2   |
| P2   | 6   | 0   | 0   |
| P3   | 0   | 1   | 1   |
| P4   | 4   | 3   | 1   |

First, check that Request $\leqslant$ Available (i.e., (1,0,2) $\leqslant$ (3,3,2) = true)
then after P1 finished, it released its' **allocated** resources back to **available**. 
New available = (3,3,2) + (2,0,0) from allocation = (5,3,2)

- **Allocation Matrix**: Resources currently allocated to each process.
- **Max Matrix**: Maximum resources each process may need.
- **Available Vector**: Resources currently available in the system.
- **Need Matrix**: How many more resources each process may still request.
- **Need = Max - Allocation**

What are the possible **safe** execution sequence(s)? 

| Processes Seq      | Safe? |
| ------------------ | ----- |
| P1, P3, P4, P0, P2 | Yes   |
| P1, P3, P4, P2, P0 | yes   |
| P3, P4, P1, P0, P2 |       |
| P3, P4, P0, P2, P1 |       |

P1, P3, P4, P0, P2: (5,3,2) -> (7,4,3) -> (7,4,5) -> (7,5,5) -> (10,5,7)
P1, P3, P4, P2, P0:  (5,3,2) -> (7,4,3) -> (7,4,5) -> (10,4,7) ->(10,5,7)
P3, P4, P1, P0, P2: (5,4,3) -> (5,4,5) -> (7,4,5) -> (7,5,5) -> (10,5,7)
P3, P4, P0, P2, P1: (5,4,3) -> (5,4,5) -> **FAIL** 
- **P0**: Need = `[7, 4, 3]` → Need A=7 > Available A=5 → cannot run