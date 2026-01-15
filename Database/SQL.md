# Data Manipulation
## Create table
```sql
create table Payroll (
UserID integer,
Name varchar(100),
Job varchar(100),
Salary integer
);
```
- Case insensitive except Table name `Payroll`
### Create a new table with primary key
```sql
create table Regist (
UserID integer,
Car varchar(100),
primary key (UserID, Car)
);
```
- default: no `primary key` -> there will be duplicates
### Create a new table with foreign key
- must refer to fields with UNIQUE constraint
![[Pasted image 20250602135954.png|500]]
```sql
create table Regist (
UserID integer,
Car varchar(100),
primary key (UserID, Car),
foreign key (UserID) references Payroll(UserID)
);
```

## Add new data to table
```sql
insert into Payroll values (001, "Kenny", “Prof”, 10000);
insert into Payroll values (002, "Fiona", “TA”, 10000);
```
- if there is a value don't know, put `null`


- Relational model uses set semantics
	- No duplicates
- SQL uses bag semantics

# SQL Query 
Keywords
`SELECT`: chooses which column(s) to output    
`FROM`: tells SQL which table to use
`WHERE`: filters rows based on a condition    
	smth = "str" or smth != int or smth is `null`
`AND`: combines multiple conditions 

## Example:
This shows all product IDs **FROM** Products table where low_fats **AND** recyclable = 'Y'
```sql
SELECT product_id
FROM Products; 
WHERE low_fats ='Y' AND recyclable = 'Y'
```

```sql
select * from Payroll
where Salary > 70000;
```
- `*` select all column to output

### Alias and Join
```sql
select p.Name, r.Car
from Payroll p, Regist r
where p.UserID = r.UserID
```
- `p` is alias
- `p.UserID = r.UserID` is join condition
- R1 ⨝condition R2 = σcondition(R1 ⨉ R2)
![[Pasted image 20250602141829.png|350]] ![[Pasted image 20250602141856.png|120]]

### Self join: join a relation with itself
Find person who drives a Civic AND a Pinto
```sql
select p.Name, r1.Car as ‘car1’, r2.Car as ‘car2’
from Payroll p, Regist r1, Regist r2
where p.UserID = r1.UserID
and r1.UserID = r2.UserID 
and r1.Car = “Civic” and r2.Car = “Pinto”
```

| p.UserID | R.B | S.B | C   | D   |
| -------- | --- | --- | --- | --- |

## Aggregate
...
## Group By
- project tuples into distinct groups then compute aggregate
```sql
select Job, avg(Salary) as 'AvgPerJob'
from Payroll group by Job;
```
### Having 
- Selection on output of `Group By`
```sql
select Job, avg(Salary) as 'AvgPerJob'
from Payroll group by Job
HAVING AvgPerJob > 60000;
```

## Limit and Order By
LIMIT
- Restrict the number of output tuples
ORDER BY
- Sort the tuples by values of one or more columns
- ASC | DESC: ascending or descending
```sql
select Name, Salary from Payroll
order by Salary desc;
```

## Nested Queries
```sql
select name from Student
where sid IN (select max(sid) from Enrolled);

select name from Student
where sid >= ALL (select sid from Enrolled);
```

## Other
1. _**Extract Month and Year:**_  
    Use the `LEFT` function to get the `YYYY-MM` part from the `trans_date`. The `LEFT()`function extracts a number of characters from a string (starting from left).

2. _**Group By Month and Country:**_  
    Group the transactions by the extracted month and country.

3. _**Count Transactions:**_  
    Use `COUNT(id)` to count all transactions per group.

4. _**Count Approved Transactions:**_  
    Use `SUM(state = 'approved')` to count approved transactions, leveraging the fact that boolean expressions return 1 for true and 0 for false.

5. _**Sum Total Amounts:**_  
    Use `SUM(amount)` to sum the transaction amounts for all transactions per group.

6. _**Sum Approved Amounts:**_  
    Use `SUM((state = 'approved') * amount)` to sum the transaction amounts for approved transactions, ensuring only approved amounts are summed.