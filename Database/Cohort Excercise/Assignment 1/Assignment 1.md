#### Question 1
<div style= "text-align: center;">
<img src ="Pasted image 20250621131708.png" style ="width: 70%; height: auto;"/>
</div>

#### Question 2
``` sql
Player(pid)

Facility(fid)

Block(bdate, bhour)

Book(pid, fid, bdate, bhour)
```

#### Question 3 Part 1
```SQL
CREATE TABLE Player (
    pid INT PRIMARY KEY
);
CREATE TABLE Facility (
    fid INT PRIMARY KEY
);
CREATE TABLE Block (
    bdate DATE,
    bhour INT,
    PRIMARY KEY (bdate, bhour)
);
CREATE TABLE Book (
    pid INT,
    fid INT,
    bdate DATE,
    bhour INT,
    PRIMARY KEY (fid, bdate, bhour),
    FOREIGN KEY (pid) REFERENCES Player(pid),
    FOREIGN KEY (fid) REFERENCES Facility(fid),
    FOREIGN KEY (bdate, bhour) REFERENCES Block(bdate, bhour)
);
```
`Book` relation key and constraint:
- **Primary key**: `(fid, bdate, bhour)` → only **one booking per facility per time slot** is allowed.
- **Foreign keys** - referencing other relation keys. Hence you can only insert a `pid` into `Book` if that `pid` already exists in `Player`:
    - `pid → Player(pid)` → ensures player exists
    - `fid → Facility(fid)` → ensures facility exists.
    - `(bdate, bhour) → Block(bdate, bhour)` → ensures the booked time slot is valid.
#### Question 3 Part 2 SQL Query – Players Who Booked Once and Never Re-booked
```sql
SELECT pid FROM Book
GROUP BY pid
HAVING COUNT(*) = 1;
```