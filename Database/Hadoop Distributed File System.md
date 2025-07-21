### **Overview of Big Data and HDFS**
- **Big Data** is characterized by the 3Vs: **Volume**, **Velocity**, and **Variety**. 
	- Two additional Vs often considered are **Veracity** and **Value**.
- **HDFS** is the storage layer of the Hadoop ecosystem

### **Architecture of HDFS**
- **Master-slave architecture**:
    - **NameNode** (Master): Manages metadata and file directory.
    - **DataNodes** (Workers): Store actual file blocks.
- **Block size**:
    - Typically 128MB in newer versions (64MB in older).
- **Replication**:
    - Each block is typically replicated **3 times** for fault tolerance.
- **Why not P2P?**
    - Central coordination via NameNode simplifies consistency and fault handling.

### **File System Model**
- **Hierarchical namespace** (e.g., `/A/B/mydoc.txt`)
- Files are split into **large blocks** and distributed across nodes.
- **Good for large files**; optimized for **sequential reads and writes**, not random access.

## **Replica Placement Strategy**
To reduce risk and balance load:
### Replica 1:
- Placed **on the same rack as the client**, preferably the **local DataNode**.
    - If the client is outside the cluster (e.g., submitting from edge), pick a random node.
### Replica 2:
- Placed **on a different rack** from the first replica.
    - This ensures that if **an entire rack fails**, data is still available.
### Replica 3
- Placed **on the same rack as the second replica**, but on a **different node**.
    - This helps reduce **cross-rack network traffic** while still maintaining fault tolerance.
- ≥4 replicas: placed randomly.
### Limits:
- Max 1 replica per DataNode.
- Max 2 per rack.
