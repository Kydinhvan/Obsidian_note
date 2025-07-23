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


