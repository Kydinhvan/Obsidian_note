Based on [[Week 1 - Introduction.pdf]]  
Website: https://sutd50043.github.io/notes/l1_intro/#what-is-a-database-management-system

---
## Problems handled by db management sys techniques

![[Week 1 - Introduction.pdf#page=37]]

Issues with early sys: 
1. redundant data (user have many data about them but not all is alw needed)
2. diff accessing data as DBMsys have own internal storage sys with differ index due to diff use case ^StorageAndIndexes
3. Integrity problem: Entering a negative quantity for a product or using an invalid email ^DataModelAndSQL
4. atomicity of update: Transferring money between two accounts – if one write succeeds and the other fails, the system is left in an inconsistent state ^Transaction
5. Concurrent Access: Two users update the same inventory item simultaneously and one update overwrites the other
6. Protection: A regular user being able to delete critical records

---

![[Week 1 - Introduction.pdf#page=38]]

Db techniques:
- **Storage and Indexes** [Redundancy and Integrity issues](#^StorageAndIndexes): DBMsys have own internal storage sys instead of relying OS's file sys. Tailored for database-specific tasks/use cases. Internal storage sys for DBMsys is optimized for **Fast data retrieval, Efficient updates and writes and Data consistency and recovery**. Further optimized with indices like in data structure and algo. (hash table, bitmap indexes) -> improve query performance

- **Transaction** [Atomicity of updates issue](#^Transaction): A group of operations treated as a single unit. Either **all** operations succeed, or **none** are applied. This ensures **atomicity**.
     **Why it matters**:
	    - Prevents partial updates (e.g., debiting an account but failing to credit the other)
	    - Ensures the system remains consistent even during crashes
	    - Maintains **ACID properties** (Atomicity, Consistency, Isolation, Durability)
	 **Logged operations**:  
		Every action in a transaction is logged. If the system crashes, the DBMS can **recover** the most recent valid state.

- **Data Model and SQL** [Integrity issue](#^DataModelAndSQL): 
	- **Data Model**: 
		Structured format to define and organize data (e.g., tables, rows, columns, relationships). It abstracts the physical storage and lets you think in terms of **real-world entities**.    
	- **SQL (Structured Query Language)**:  
	    The standard language used to **query, update, and manage** data in relational DBMSes.
	- **Benefits**:
	    - Makes data manipulation intuitive and expressive
	    - Applications built with SQL-based systems can be ported with minimal effort between DBMSes (e.g., from MySQL to PostgreSQL)
