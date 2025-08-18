## Learning Outcome
- Differentiate Parallelism and Concurrency
- Explain map and reduce
- Explain Hadoop MapReduce

## MapReduce
Programming model for processing large-scale data using `Map` and `Reduce` approach

*Used for parallel data processing where you split a big job into small “map” tasks that extract useful info, and “reduce” tasks that aggregate that info — and it runs efficiently across many machines.* 

### Map and Reduce = Two Steps
- **Map**: transforms raw data into key-value pairs e.g., turning lines of text into `word, 1`
- **Reduce**: groups by keys and combines values (e.g., summing all the counts per word).
![[Pasted image 20250727000239.png]]
![[Pasted image 20250727011604.png]]
**Parallelism**:
- These tasks are **run in parallel** across different machines.
- You don’t need to manage the parallelism — **Hadoop/Spark** does that.
### Compare 
**SQL Equivalent:**
```sql
SELECT word, COUNT(*)  FROM text_words  GROUP BY word;
```

**MapReduce:**
- **Map step**: Emit `(word, 1)` for each word in the text.
- **Shuffle step**: Group all same words together.
- **Reduce step**: Sum all the counts for each word.
## Toy MapReduce Library
### Core Combinators

| Function                   | What It Does                                    |
| -------------------------- | ----------------------------------------------- |
| `map(f, lst)`              | Apply `f` to every element                      |
| `flatMap(f, lst)`          | Like map, but flattens output lists             |
| `reduce(f, lst, acc)`      | Aggregates values using a binary function       |
| `shuffle(kv_pairs)`        | Groups values by key                            |
| `reduceByKey(f, kv_pairs)` | Aggregates grouped key-values with function `f` |
|                            |                                                 |
|                            |                                                 |

>[!note] lambda arguments: expression

### `reduce()`
`reduce(f, list, acc)` is a function that **applies a binary function `f`** to **aggregate a `list`** starting from an **initial value `acc`**.
- Starts with the initial value `acc` (`0`)
- Applies the function to `acc` and the **first item** of the list
- Takes that result and applies the function again with the **next item**
- Keeps repeating until the list is exhausted
- **Returns a single final value**.

```python
reduce(lambda x, y: x + y, [1, 2, 3, 4], 0)
```
- `0 + 1 = 1` : `x` is the **current accumulated value**, `y` is the **next item in the list**
- `1 + 2 = 3`
- `3 + 3 = 6`
- `6 + 4 = 10`

>*If I combine all these numbers into a single result using some rule, what do I get?*


