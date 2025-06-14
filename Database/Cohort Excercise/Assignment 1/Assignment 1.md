#### Question 1
<div style= "text-align: center;">
<img src ="Pasted image 20250613214118.png" style ="width: 80%; height: auto;"/>
</div>

#### Question 2
``` sql
Player(pid)

Facility(fid)

Block(date, hr_block)

Book(pid, fid, date, hr_block)
```

#### Question 3
##### Part 1
```SQL
CREATE TABLE Player (
    pid INT PRIMARY KEY
);
CREATE TABLE Facility (
    fid INT PRIMARY KEY
);
CREATE TABLE Block (
    date DATE,
    hr_block INT,
    PRIMARY KEY (date, hr_block)
);
CREATE TABLE Book (
    pid INT,
    fid INT,
    date DATE,
    hr_block INT,
    PRIMARY KEY (fid, date, hr_block),
    FOREIGN KEY (pid) REFERENCES Player(pid),
    FOREIGN KEY (fid) REFERENCES Facility(fid),
    FOREIGN KEY (date, hr_block) REFERENCES Block(date, hr_block)
);
```

##### Part 2 SQL Query – Players Who Booked Once and Never Re-booked
```sql
SELECT pid FROM Book
GROUP BY pid
HAVING COUNT(*) = 1;
```