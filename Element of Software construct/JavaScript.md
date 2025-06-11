Based on https://www.w3schools.com/js/DEFAULT.asp
Related Files: [[50_003_Basics_of_Web_Programming_Elements_of_Software_Construction.pdf]]

---
## What is? Program the behavior of web pages
- It can update and change both HTML and CSS.
- It can calculate, manipulate and validate data
---
## Closure 
Concept:
1. `createCounter` **returns another function** — this is called a **higher-order function**.
2. `n++` is a **post-increment** operator, return current `n`  then increase `n` by 1 
```javascript 
var createCounter = function(n) { //createCounter is a FUNCTION VARIABLE 
    return function() {
        return n++
    };
};
```

2. Higher order function: expect(5).toBe(5) return true 
```javascript
var expect = function(val) {
    return {
        toBe: function (val2){
            if (val2===val){
                return true;
            }
            else{
                throw new Error("Not Equal");
            }
        },
        notToBe: function (val2){
            if (!(val2===val)){
                return true;
            }
            else{
                throw new Error("Equal");
            }
        }
    }
};
```

3. Callback function: 
```java
class Outer {
    static class Inner {
        void display() {
            System.out.println("Static inner class");
```

4. 
```java
class Outer {
    static class Inner {
        void display() {
            System.out.println("Static inner class");
```
---
## JavaScript Callback Queue ^callbackQueue

The **Callback Queue** is a key component of JavaScript's **event-driven architecture**.
### Event Loop Recap
JavaScript is **single-threaded**. The event loop enables **asynchronous behavior** without multithreading.
### How It Works
1. **Call Stack** executes synchronous code.
2. When an event occurs (like a `click`), and a callback is registered (via `.addEventListener()`), the callback is **queued** in the **Callback Queue**.
3. Once the Call Stack is empty, the Event Loop:
   - Dequeues a callback from the **Callback Queue**
   - Pushes it to the **Call Stack**
   - Executes it
### Example Flow
```js
document.addEventListener("DOMContentLoaded", function run() {
  console.log("DOM loaded");
});

button1.addEventListener("click", function handleButton1Click() {
  console.log("Button clicked");
});
```

---
## Casting 

**Map<Character, Integer>** means that the **Map object** returned has **keys of type Character** and **values of Integer**. Recall that Character and Integer are the wrapper objects for their equivalent primitive types.

---
## Promise
A Promise has three possible states:
1. **Pending** – It's still running and hasn't finished.
2. **Resolved (Fulfilled)** – It finished successfully and returned a result.
3. **Rejected** – It failed and returned an error.
```js
var addTwoPromises = async function(promise1, promise2) {
    const result = await promise1;
    const result2 = await promise2;
    return new Promise((resolve, reject) => resolve(result+result2));
};
```

### Functions
### `then` `catch`
`.then()`: handle result of a resolved promise
`.catch()`: handle rejected promises
```javascript
let promise = new Promise((resolve, reject) => {
    let condition = true;  // This could be the result of some operation
    // After 1 second, check the condition and resolve or reject the promise
    setTimeout(() => {
        if (condition) {
            resolve('Promise fulfilled!');
        } else {
            reject('Promise rejected!');
        }
    }, 1000);
});
// Attach then() and catch() handlers to the Promise
promise
    .then(value => {
        // This will be executed if the promise is resolved
        console.log(value); // Output: Promise fulfilled!
    })
    .catch(error => {
        // This will be executed if the promise is rejected
        console.log(error);
    });
```
add function in array: [[JavaScript#^arrayoffunc|link]]
### `await`
used inside `async` func to pause execution until a Promise settles (either resolves or rejects) 
```js
async function example() {
  const result = await someAsyncFunc(); //this func must **return Promise obj**
  console.log(result); // Only runs after the async func is done
}
```

### `setTimeout`
use setTimeout() delay the execution of a function or code block
```js
var timeLimit = function(fn, t) {
    return async function(...args) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() =>{
                reject('Time Limit Exceeded');
            },t);
            return fn(...args).then(resolve).catch(reject);
        })
        return promise;
    }
};
```
This `setTimeout()` forces `promise` to reject as long as `t` expires or do nothing when resolve

`fn(...args).then(resolve).catch(reject)`: fn(...arg) is a function that take in any args
- If successful, `resolve(...)` is called with its result. 
- If it fails (throws error), `reject(...)` is called with that error.


<<<<<<< HEAD
=======
---
# Technique

## Generic
### Create Array of functions ^arrayoffunc
```js
const pool = Array(n).fill().map(evaluateNext);
```
`Array(3); // → [empty × 3]`
`Array(3).fill(); // → [undefined, undefined, undefined]`
`[undefined, undefined, undefined].map(evaluateNext); // → [Promise, Promise, Promise]`

Result
```js
const pool = [
  evaluateNext(), // starts worker 1
  evaluateNext(), // starts worker 2
  ...
  evaluateNext()  // starts worker n
];
```
>>>>>>> origin/main
