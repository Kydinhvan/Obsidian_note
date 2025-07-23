```js
//In config.js

// Create connection pool for better performance
const pool = mysql.createPool({
    host: config.databaseHost,
    user: config.databaseUsername,
    password: config.databasePassword,
    database: config.databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```

### userModel
`static async createUser(userData)`
- This method belongs to the **class itself**, not an instance of it.
- This method is asynchronous, meaning it uses await for promises.