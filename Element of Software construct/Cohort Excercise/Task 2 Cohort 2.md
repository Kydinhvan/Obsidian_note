### Objective:
We need to implement an API endpoint `localhost:3000/dept/count` in an Express.js web application that returns the count of staff members in each department. The data will be retrieved from a MySQL database.
### 1. Database Schema Design:
Based on the provided ER diagram, the following two tables will be created:
- **Staff** Entity:
    - `Sid` - Primary key - Attribute
    - `Name` - Attribute
- **Dept** Entity
    - `Dept_Code` (Department Code)
- `N` **Staffs** can **work** in `1` **Dept** or `a single` Dept can have `N` **Staffs** **working** in it 
### 2. Setting Up the MySQL Database: 
Create Database:
```sql
CREATE DATABASE staffdir;
USE staffdir;
```
Create Tables:
```sql
CREATE TABLE staff (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE dept (
    code CHAR(2) PRIMARY KEY,
);

CREATE TABLE work (
    id INTEGER,
    code CHAR(2),
    PRIMARY KEY (id, code),
    FOREIGN KEY (id) REFERENCES staff(id),
    FOREIGN KEY (code) REFERENCES dept(code)
);
```
Insert some data:
```sql
-- Insert departments
INSERT INTO dept (code) VALUES ("HR"), ("RD");

-- Insert staffs
INSERT INTO staff (id, name) VALUES (1, "John"), (2, "Ky"), (3, "Sam");

-- Insert work relationships (staffs working in departments)
INSERT INTO work (id, code) VALUES (1, "HR"), (2, "RD"), (3, "HR");
```
### 3. Implementing the API with Express.js
We need to implement an Express.js API endpoint `/dept/count` that will return the count of staff members in each department.
**Create the Express Project:**
```bash
mkdir my_mysql_app
cd my_mysql_app
npx express-generator --view=ejs
npm install
npm install mysql2
```
**Setup database connection by creating a `models/db.js` file to handle MySQL connections:**
```js
const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  user: "pichu",
  database: "staffdir",
  password: "pikaP",
  connectionLimit: 10,
}).promise();

async function cleanup() {
  await pool.end();
}

module.exports = { pool, cleanup };
```
**Define API endpoint by creating a route that will return the count of staff in each department. Create `routes/dept.js`:**
```js
const express = require("express");
const db = require("../models/db.js");
var router = express.Router();

// get count of staff in each department
router.get("/count", async (req, res) => {
	// Query to get the staff count per department
	const [rows, fields] = await db.pool.query(`
      SELECT dept.name AS dept, COUNT(staff.id) AS count
      FROM dept
      LEFT JOIN work ON dept.code = work.code
      LEFT JOIN staff ON work.id = staff.id
      GROUP BY dept.code
    `);
    
    res.json(rows);  
});

module.exports = router;
```
#### **Explanation of the Query**:
- The SQL query performs a **left join** between `dept`, `work`, and `staff`.
- It groups the result by `dept.code` and counts the number of `staff.id` for each department.