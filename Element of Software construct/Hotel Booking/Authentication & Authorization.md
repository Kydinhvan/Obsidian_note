**Authentication verifies** that a user is who they claim to be
**Authorization determines what resources** a user can access after successful authentication

# JWT (JSON Web Token)
```js
const verifyToken = (req, res, next) => {

    // Extract the token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Proceed to verify localStorage's token against secret key
    jwt.verify(token, config.JWTKey, (err, decoded) => {
        // If error, incorrect secret key used
        if (err) {
            res.status(403).send();
        } else {
            res.locals.email = decoded.email;
            res.locals.role = decoded.role;
            next();
        }
    });
```
LINK: [[Express.js#`res` the response object|res]]
```js 
// check forget password token
const checkToken = (req, res, next) => {
    
    // Extract the token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, config.JWTKey, function (error, decodedToken) {
        if (error) {
            return res.status(401).json({
                message: 'invalid or expired token'
            });
        } else {
            console.log(decodedToken)
            res.locals.email = decodedToken.email;
            res.locals.randomId = decodedToken.randomId;
            next();
        }
    });
}
```

## Authentication with JWT
*When a user logs in, the authentication server verifies their credentials (e.g., username/password) and, if successful, issues a JWT*

The client then includes this JWT in subsequent requests to access protected resources. The server verifies the token's signature and claims to authenticate the user without needing to re-verify credentials for each request.

### Flow 
**Register**
`User → POST /register → validatePassword → Hash password → Save to database`

**Login**
`User → POST /login → Check password → Create JWT token → Send token back`

**Protected request:**
`User → GET /bookings → verifyToken → Extract user info → User's bookings`

**Admin Request:**
`Admin → DELETE /hotels/123 → verifyToken → verifyAdmin → Delete hotel`

## Authorization with JWT
*JWTs can contain claims (information about the user) like roles (e.g., admin, editor, user), permissions, or other attributes.*

The server can inspect these claims within the JWT to determine what resources the user is authorized to access.
## **JWT Token Behavior**
### **How It Works:**
1. **Client receives token** after successful login
2. **Client stores token** (localStorage, sessionStorage, cookies)
3. **Client sends token** with every protected request
4. **Server verifies token** using middleware
5. **Server extracts user info** from token payload

## **How to Use JWT in Protected Routes**

### Client Side - Sending Token:
```js
// After login, store token
const { token } = await loginResponse.json();
localStorage.setItem('authToken', token);

// Send with subsequent requests
fetch('/protected-route', {
    headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json'
    }
});
```

### Server Side - Verify Token:
```js
// From middleware/auth.js
const verifyToken = (req, res, next) => {
    // 1. Extract: "Bearer eyJhbGci..." → "eyJhbGci..."
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // 2. Check if token exists
    if (token == undefined) {
        return res.status(401).send();  // No token = unauthorized
    }

    // 3. Verify token cryptographically
    jwt.verify(token, config.JWTKey, (err, decoded) => {
        if (err) {
            res.status(403).send();  // Invalid token = forbidden
        } else {
            // 4. Extract user info from JWT payload
            res.locals.email = decoded.email;  // From JWT
            res.locals.role = decoded.role;    // From JWT
            res.locals.userId = decoded.id;    // From JWT
            next();  // Continue to route handler
        }
    });
};
```

### **MySQL B+ Tree Indexing and UUIDs**

MySQL (especially with **InnoDB**) uses a **B+ Tree** for primary key indexing.

- **Auto-increment integers** are **sequential**, so inserts always go to the **right-most leaf node** of the B+ tree. Fast and cache-friendly.
    
- **UUIDs (v4)** are **random**, so inserts hit **random nodes** → causes:
    
    - **Page splits**
        
    - **Index fragmentation**
        
    - **Buffer pool churn**
        

➡️ Result: **Slower inserts**, **bigger index**, **worse query performance**.

---

### ⚙️ **Why PostgreSQL Handles UUIDs Better**

1. **Tuple Storage is More Flexible**
    
    - PostgreSQL’s **MVCC** and **heap structure** separate physical and logical record storage.
        
    - Primary keys **don’t dictate row storage order** as strictly as MySQL’s InnoDB does.
        
    - This makes PostgreSQL **less sensitive to non-sequential primary keys** (like UUIDs).
        
2. **Native UUID Type**
    
    - PostgreSQL has a built-in `UUID` type (stored efficiently as 128-bit binary), no need for hacks like `BINARY(16)` or `UNHEX()`.
        
3. **Index Optimization**
    
    - PostgreSQL indexes can use **GIN, GiST, or HASH** types more effectively when needed.
        

---

## 🔥 MySQL vs PostgreSQL — UUID Primary Key Impact

|Factor|MySQL (InnoDB)|PostgreSQL|
|---|---|---|
|Index locality|❌ Poor with UUID|✅ Less critical|
|Insert performance|❌ Slower with UUID|✅ More stable|
|Built-in UUID type|⚠️ Not native (`CHAR/BINARY`)|✅ Native `UUID` type|
|Primary key impacts row storage|✅ Yes (clustered index)|❌ Not tightly coupled|

---

## 🗣️ What to Say in the Interview

> "UUIDs can cause performance issues in MySQL due to how InnoDB uses clustered B+ tree indexes. Since UUIDs are random, they disrupt index locality, leading to fragmentation and slow inserts. In PostgreSQL, the storage engine is more flexible and less affected by non-sequential primary keys, so UUIDs perform better there. That’s why UUIDs are generally more suitable in PostgreSQL unless special handling is done in MySQL — like using UUIDv1/v7 with `BINARY(16)`."

---

Would you like a **schema example** for using UUIDs efficiently in MySQL (e.g., using `BINARY(16)` + UUIDv1)?

##### You said:

not cluster

###### ChatGPT said:

Great follow-up — you're absolutely right to bring up **clustered vs non-clustered indexes**, because that's the **core reason** UUIDs behave differently in **MySQL vs PostgreSQL**, even beyond just the B+ tree.

Let me break this down **clearly** for you, especially for **interview situations** where you're being challenged:

---

## 🔍 MySQL vs PostgreSQL: Primary Key Indexing (Not Just B+ Trees)

### ✅ MySQL (InnoDB) – **Clustered Index**

- In **MySQL InnoDB**, the **primary key is clustered** — meaning:
    
    - The **physical row order on disk is based on the primary key**.
        
    - So if you use a **random UUID** as the primary key:
        
        - **Rows are stored in random places** → causes **page splits**, **fragmentation**, **slow inserts**.
            
    - This is **especially bad** for write-heavy systems.
        

> 💡 This is _not_ just a B+ tree issue — it’s because **InnoDB clusters the data around the primary key**.

---

### ✅ PostgreSQL – **Heap Table (Non-clustered)**

- PostgreSQL does **not** use clustered storage by default.
    
    - Rows are stored in a **heap** — unsorted, unordered.
        
    - The **primary key is a separate index**, not tied to row order on disk.
        
    - This means UUIDs don’t hurt insert performance nearly as much, because PostgreSQL isn’t constantly reshuffling the table like InnoDB would.
        

> That’s why **PostgreSQL handles UUIDs better**, even though **both** use **B+ trees** for indexing.

---

## 🧠 TL;DR – Why UUIDs Are Better in PostgreSQL than MySQL (Even with B+ Trees)

|Feature|MySQL (InnoDB)|PostgreSQL|
|---|---|---|
|Primary key is clustered?|✅ Yes — affects row order|❌ No — primary key is just an index|
|UUID disrupts row order?|❌ Yes, causes fragmentation|✅ No, has minimal effect|
|Insert performance with UUIDs|❌ Slower due to page splits|✅ More stable, even with UUIDs|
|Native UUID support|⚠️ Workaround (BINARY, UNHEX)|✅ Full native support|

---

## 🗣️ What to Say in the Interview (If You're Challenged)

> "The key reason UUIDs perform worse in MySQL than PostgreSQL isn't just the B+ tree, but that MySQL (InnoDB) uses a **clustered primary key**. So UUIDs, being random, disrupt the physical row order and cause fragmentation. PostgreSQL stores rows in an unordered heap, so UUIDs don’t affect row layout and perform better even when indexed with a B+ tree."

---

If you'd like, I can show how to _simulate ordered UUIDs_ (like UUIDv7 or ULID) in MySQL to improve performance — just ask.