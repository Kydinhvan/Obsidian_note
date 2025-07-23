MapReduce is a **two-phase distributed programming model** for processing **large-scale data**.
### Map Phase:
- Input data is split into chunks (splits).
- Each chunk is processed in parallel.
- Output: key-value pairs.

### Shuffle & Sort Phase:
- System groups all values by key.
- Ensures all `values` for a given `key` go to the same reducer.

### Reduce Phase:
- Aggregates values for each key.
- Produces the final output.

You only implement Map and Reduce, not shuffle/sort — they’re managed by Hadoop.

