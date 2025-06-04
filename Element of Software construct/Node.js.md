- Node.js is a server-side JavaScript runtime which allows writing backend code with javascript ^nodejsDef
- Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
- Node.js uses JavaScript on the server

A common task for a web server can be to open a file on the server and return the content to the client.

Here is how Node.js handles a file request:

1. Sends the task to the computer's file system.
2. Ready to handle the next request.
3. When the file system has opened and read the file, the server returns the content to the client.

Node.js eliminates the waiting, and simply continues with the next request.

Node.js runs single-threaded, non-blocking, asynchronous programming, which is very **memory efficient**.

---
## What Node.js Do
- Node.js can generate dynamic page content - generating content based on user input, database results, or other logic, instead of just serving static HTML
- Node.js can create, open, read, write, delete, and close files on the server with built-in **file system module**
- Node.js can handle data submitted from forms (like login info or contact forms)
- Node.js can add, delete, modify data in your database

Node.js runtime execute a javascript file outside of a browser: 
```bash
node hello.js
```
launches **new process** -> loads **Node.js executable** ->loads js file -> compile and execute code -> enter event loop to handle callbacks if needed

---
# How Node.js work
## Node.js Package Manager (npm)
- To install a package: `npm install ...`
- To download all dependencies from `package.json` : `npm i`
```json
{ // package.json
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "app description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1",
    "mongoose": "^8.2.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "joi": "^17.10.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.4"
  }
}
```
---
## Import, Export
Export:
```js
// Name: mymath.js
const pi = 3.14;
const e = 2.71;
module.exports = { pi, e }
```

Import:
```js
import { pi } from "./mymath.js"
```

---
## Node.js event-loop
### Event-loop phases: 
In btw each loop, node.js check if any waiting asynchronous I/O or timer, shutdown if there are not any
   ┌───────────────────────────┐
┌─>│           timers          │ //executes callbacks scheduled by setTimeout() and setInterval()
│ └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks    │ //executes I/O callbacks deferred to the next loop iteration
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare         │
│  └─────────────┬─────────────┘      
│  ┌─────────────┴─────────────┐      │   incoming: connections, data, etc. 
│  │           poll                                │<──┤  // Retrieve new I/O events, Execute I/O callbacks 
│  └─────────────┬─────────────┘      │   except close callbacks (scheduled by timers, 
│  ┌─────────────┴─────────────┐      |    setImmediate()). Node will block here if needed
│  │           check   │   // setImmediate(callback) are invoked here (run right after I/O events)
│  └─────────────┬─────────────┘
│ ┌─────────────┴─────────────┐
└──┤      close callbacks                 │
   └───────────────────────────┘

[[JavaScript#^callbackQueue|JS Callback Queue]] is **Macrotask** queue in nodeJS runtime ^macrotask
	`setTimeout()`, `setInterval()`, `setImmediate()`, and I/O related tasks (for example, `fs.writeFile()`, HTTP Request and Response. These APIs enqueue callbacks into macrotask

**Microtask** callbacks queue has higher priority. All microtasks must be cleared before event-loop dequeue next macrotask
┌─────────────────────┐
│  Call Stack                     │
├─────────────────────┤
│  Microtask Queue         │  ← runs immediately after stack clears
├─────────────────────┤
│  Macrotask Queue        │  ← runs after microtasks
└─────────────────────┘
1. Top to bottom, statement by statement.​ 
2. Function invocation instantiated a new frame in the Call Stack​ 
3. Local variables can be accessed within the frame, and outer variables (closure).​ 
4. Frame will be popped when function returns.​ 
5. `p.then(f)`enqueues a task to the micro task queue, if p’s known and p’s executor calls resolve.​ 
6. `p.then(f)` is pending when p is unknown or p’s executor has not called resolve.​ 
7. .`addEventListener()` registers an event to a callback function​ 
8. When an event is triggered, its callback is enqueued to the call back queue (macro task queue)​ 
9. When the Call stack is empty, the runtime dequeues an item from the micro task queue if the queue is not empty.​ 
10. When the Call stack is empty, the runtime dequeues an item from the macro task queue if the queue is not empty
---
## Callback

### API Call Back

### Promise
build a sequence of asynchronous tasks without nesting call-backs
![[Pasted image 20250526105423.png]]

JavaScript rewrite incr to wrap return val in Promise obj
```js
function incr(count) {
  console.log(count);
  return new Promise((resolve, reject) => resolve(++count));
}  // return ++count;      // Increase the count by 1 and return it
```

```js
function asyncCounter() {
  var count = 0;
  return new Promise((resolve, reject) => {
    resolve(count);
  }); 
}
```

Run the code:
```js
let counter = asyncCounter(); // gives a Promise obj with val 0

counter // then incr means: 
  .then(incr) // Takes 0 → logs 0 → returns 1
  .then(incr)
  .then(incr);
```

| Concept            | Meaning                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| `Promise`          | A tool for handling things that happen later (asynchronously)                |
| `resolve(value)`   | Means "everything worked" and here’s the result                              |
| `.then(func)`      | Runs a function when the Promise finishes, and passes the result to it       |
| Chaining `.then()` | Lets you run multiple steps in a row, each one depending on the previous one |

`promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20));
- function you pass to `new Promise(...)` is called the **executor**
- It gets one or two arguments:
	- `resolve`: a function to call when the work is **successful**.
		- This is an **arrow function** with one parameter: `resolve`
	- `reject` (not used here): a function to call when something **fails**.

### Core Methods
`await` is used **inside an `async` function** to **pause** the execution of the function until a Promise is resolved
	`async` function is a special kind of function in JavaScript that **automatically returns a Promise**
```js
var addTwoPromises = async function(promise1, promise2) {
    const result = await promise1;
    const result2 = await promise2;
    return new Promise((resolve, reject) => resolve(result+result2));
};
```

```js 
promise1.then(value => {
  console.log(value); // Outputs: 2
});
```
---
# Node.js Module
- To include a module, use the `require()` function with the name of the module:
	`var http = require('http');`

- To create a module use the `exports` keyword to make properties and methods available outside the module file.
	Save the code in a file called "myfirstmodule.js"
```node.js
exports.myDateTime = function () {  
  return Date();  
};
```

- To include the above module:
```js
var http = require('http');  
**var dt = require('./myfirstmodule');  
**  
http.createServer(function (req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'});  
  res.write("The date and time are currently: " + **dt.myDateTime()**);
```

HTTP (Hyper Text Transfer Protocol) module: allows node.js to transfer data over HTTP ^HTTP
	This module can create HTTP server that **listens to server ports** and **gives a response** back to the client.	
```js
var http = require('http');  // include http module
  
//create a server object:  
http.createServer(function (req, res) {  
  res.write('Hello World!'); //write a response to the client  
  res.end(); //end the response  
}).listen(8080); //the server object listens on port 8080
```

---
### Read Query String 
Query: a way to pass data using url

function passed into the `http.createServer()` has a `req` argument that represents the request from the client, as an object (http.IncomingMessage object).

This object has a property called "URL" which holds the part of the URL that comes after the domain name:
```js
var http = require('http');  
http.createServer(function (req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'});  
  res.write(**req.url**);  
  res.end();  
}).listen(8080);
```

---
### Node.js File System Module 

Node.js file sys module allows you to work with the file system on ur comp and must be initiated on the server before having any effect `require('fs');`

Common use for the File System module:
- Read files - `fs.readFile()`
- Create files - `fs.appendFile()` - `fs.open()` - `fs.writeFile()`
- Update files - `fs.appendFile()` - `fs.writeFile()`
- Delete files - `fs.unlink()`
- Rename files - `fs.rename()`

Example of Read Files:
```js
var http = require('http');  
var fs = require('fs');  
http.createServer(function (req, res) {  
// req: Request Object (req.url, req.method, eq.headers,req.on('data', ...))
// res: Response Object
  **fs.readFile('demofile1.html', function(err, data) {**    res.writeHead(200, {'Content-Type': 'text/html'});  
    res.write(data);  
    return res.end();  
  });  
}).listen(8080);
```

