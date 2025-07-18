Recall: Two operations **conflict** if:
1. They are from **different transactions**,
2. They access the **same data item**, and
3. At least one of them is a **write**
Now look for **conflict pairs** and determine their order to build the **precedence graph**.