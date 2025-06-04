**SQL (Structured Query Language)** helps us retrieve, add, or manipulate data stored in database tables

# Keywords
`SELECT`: chooses which column(s) to output    
`FROM`: tells SQL which table to use
`WHERE`: filters rows based on a condition    
	smth = "str" or smth != int or smth is null
`AND`: combines multiple conditions 

## Example:
This shows all product IDs **FROM** Products table where low_fats **AND** recyclable = 'Y'
```sql
SELECT product_id
FROM Products; 
WHERE low_fats ='Y' AND recyclable = 'Y'
```
