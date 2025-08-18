## Dependencies between tasks
In Spark, data processing logic is broken down into **transformations** (like `map`, `filter`, `join`) and **actions** (like `collect`, `count`). Internally, Spark organizes these transformations into a **Directed Acyclic Graph (DAG)** of tasks.

Each task operates on a **partition** of your data. Whether one task can directly follow another or needs extra preparation (like data transfer) depends on **how the output of one partition depends on the input of another**, this is called a **dependency**.

### **Narrow Dependencies**
#### Definition:
- **Each input partition is used by at most one output partition.**
- No data shuffling is required across partitions or nodes.
- These can be executed in a **single stage**.

#### Examples (Left side of the diagram):
1. **`map`, `filter`**:
    - Each output partition only depends on one corresponding input partition.
    - Execution is straightforward, without moving data between partitions.
2. **`union`**:
    - Combines two datasets, but each output still depends on a single input partition.
3. **`join with inputs co-partitioned`**:
    - If the inputs are partitioned in the same way (e.g., on the same key), join can be done locally

