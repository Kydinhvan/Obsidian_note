### **Step-by-Step Explanation to Implement the API**
#### **Objective**:
We need to implement an API endpoint `localhost:3000/dept/count` in an Express.js web application that returns the count of staff members in each department. The data will be retrieved from a MySQL database.
#### **1. Database Schema Design**:
Based on the provided ER diagram, the following two tables will be created:
- **Staff** Table:
    - `Sid` - Primary key 
    - `Name` (Staff Name)
    - `Dept_Code` (Foreign key that references the department)
- **Dept** Table:
    - `Dept_Code` (Department Code)
    - `Dept_Name` (Department Name)