![[50043er_sql_assignment (1).pdf]]

### Question 1
![[Pasted image 20250613214118.png]]
### Question 2
``` sql
Player(pid)

Facility(fid)

Block(date, hr_block)

Book(pid, fid, date, hr_block)
```

### Question 3
#### Part 1
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
    PRIMARY KEY (fid, bdate, bhour),  -- Prevents double-booking
    FOREIGN KEY (pid) REFERENCES Player(pid),
    FOREIGN KEY (fid) REFERENCES Facility(fid),
    FOREIGN KEY (bdate, bhour) REFERENCES Block(bdate, bhour)
);
```

#### Part 2
**Part 2: SQL Query – Players Who Booked Once and Never Re-booked**