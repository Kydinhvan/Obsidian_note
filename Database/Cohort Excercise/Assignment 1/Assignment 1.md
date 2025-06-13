![[50043er_sql_assignment (1).pdf]]

### Question 1
![[Pasted image 20250613214118.png]]
### Question 2
``` sql
Player(
	pid INT PRIMARY KEY
)

Facility(
	fid INT PRIMARY KEY
)

Booking_block(
	date DATE 
	hr_block INT 
	PRIMARY KEY (date, hr_block)
)

Book(
    pid INT,
    fid INT,
    date DATE,
    hr_block INT,
    PRIMARY KEY (fid, date, hr_block),
    FOREIGN KEY (pid) REFERENCES Player(pid),
    FOREIGN KEY (fid) REFERENCES Facility(fid),
    FOREIGN KEY (date, hr_block) REFERENCES Block(date, hr_block)
)
```
