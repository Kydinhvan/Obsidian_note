## Express index.js – Main Server File
Link: [[Express.js#`req` the request object|res object]]
### Concept

The `index.js` file in an Express app is the **main entry point** of the backend server. It's responsible for:
- Setting up the Express application    
- Connecting middleware (like JSON parsing or CORS)
- Defining routes (e.g., `/login`, `/register`, `/hotels`)
- Handling errors
- Starting the server (`app.listen()`)

### **Initialize Express App**
```js
const app = express(); 
const PORT = process.env.PORT || 3000;
```
`app` is the main Express instance. Everything (middleware, routes, handlers) attaches to this.

### Built-in Middleware
```js
app.use(express.json());
```
Tells Express to **automatically parse JSON** in incoming requests.

### Configure CORS (Cross-Origin Resource Sharing)
```js
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```
CORS controls **which frontend origins are allowed** to make API requests.
- If frontend is at `localhost:5173`, this allows it to talk to backend (`localhost:3000`).
- `credentials: true` lets cookies or tokens be sent.

### Basic Route (GET /)
```js
app.get('/', (req, res) => {
  res.send('Welcome to the Hotel API!');
});
```
Root route. Used for testing if the server is running.

### **Mount Hotel Controller**
```js
app.use('/hotels', hotel.router);
```
Connects all hotel-related routes. For example:
- `GET /hotels` → list all hotels
- `DELETE /hotels/:id` → delete hotel (admin)
