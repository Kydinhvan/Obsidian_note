**SimpleDB** is a **minimal database management system (DBMS)** written in Java, designed to help students understand and implement the core components of a relational database.

- It is **not** Amazon SimpleDB (a real cloud product) — this is a teaching tool.
- Built to **mirror the architecture** of real DBMSes (like PostgreSQL, SQLite), but **without SQL parsing** or a full query planner in early stages.

Focuses on:
- Storage and file formats
- Tuple(rows) management 
	A **`Tuple`** is a row. Each row has multiple **fields**.  
- Buffer pool (memory management)
- Basic operators (e.g., SeqScan)
- Future labs: transactions, locking, joins, and optimization

---
# Core components
| Concept          | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| Tuples & Schemas | `Tuple` and `TupleDesc` represent rows and their column types.                      |
| Fields           | Support for `int` and `string` field types (`IntField`, `StringField`).             |
| Heap File        | Storage mechanism: `.dat` files storing pages of tuples.                            |
| Pages & Slots    | Pages hold fixed-size tuples; use header bitmaps to track used slots.               |
| Buffer Pool      | Memory-level cache that holds recent pages for fast access.                         |
| Catalog          | Tracks table names, schemas, and storage files.                                     |
| Sequential Scan  | Basic read-only access to entire tables (`SeqScan`).                                |
| Identifiers      | Use `RecordId`, `HeapPageId`, and transaction IDs to track positions and ownership. |

## By Class
| Component       | Classes                                             |
| --------------- | --------------------------------------------------- |
| Tuple & Schema  | `Tuple.java`, `TupleDesc.java`, `Field.java`        |
| Catalog         | `Catalog.java`                                      |
| Buffer Pool     | `BufferPool.java`                                   |
| Page Storage    | `HeapPage.java`, `HeapFile.java`, `HeapPageId.java` |
| Disk Format     | `.dat` files from `HeapFileEncoder`                 |
| Operator (Scan) | `SeqScan.java`                                      |
| Testing         | JUnit-based unit and system tests                   |

--- 
## How to Use 
Let’s say we want to **read and scan a file of records**, like a CSV: `1,2,3,4,5,6`
1. You **convert** it into `.dat` file using the `convert` command. 
2. You define its schema with `TupleDesc`.
3. You store it using a `HeapFile`.
4. You scan the file using `SeqScan`, tuple-by-tuple.
5. All data access goes through the `BufferPool`, which caches pages in memory.

---
I