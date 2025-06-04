```js
1:  import EventEmitter from 'events';
2:  const ev1 = new EventEmitter(); // event chanels
3:  const ev2 = new EventEmitter();
4:  let count = 0;
5:  let promise1 = new Promise( (resolve, reject) => {
6:      resolve(count);
7:  })
8:  let promise2 = new Promise( (resolve, reject) => {
9:      resolve(count);
10: })
11: function foo(x) {
12:     return new Promise((resolve, reject) => {
13:         if (x > 10) {
14:             resolve();
15:         } else if (x % 2 == 0) {
16:             ev1.emit('run', ++x);
17:         } else {
18:             ev2.emit('run', ++x);
19:         }
20:     })
21: }
22: ev1.on('run', (data) => { setImmediate(() => {
23:     console.log(`data ${data} received by ev1`);
24:     promise2.then((x) => foo(data)); });
25: });
26: ev2.on('run', (data) => { setImmediate(() => {
27:     console.log(`data ${data} received by ev2`);
28:     promise1.then((x) => foo(data)); });
29: });
30:ev2.emit('run', count);
```

- `promise1` and `promise2` return `0` immediately upon resolve
- func `foo` is a recursive func that return a new promise that resolve if input argument `x` >10 in its' base case. If not, emit `ev1` with `x+1` if x is even or emit `ev2` with `x+1` otherwise.
- `ev1.on` receive data passed from `emit` log `data ${data} received by ev1` in console and calls `foo(x)` via `promise1.then` (microtask)

| program counter (line num) | call stack | micro queue | promises               | macro queue      | event reg                                    | console output |
| -------------------------- | ---------- | ----------- | ---------------------- | ---------------- | -------------------------------------------- | -------------- |
| 5                          | [main()]   | []          | {promise@5}            | []               | {}                                           |                |
| 8                          | [main()]   | []          | {promise@5, promise@8} | []               | {}                                           |                |
| 22                         | [main()]   | []          | {promise@5, promise@8} | []               | { ev1.run:function@22 }                      |                |
| 26                         | [main()]   | []          | {promise@5, promise@8} | []               | { ev1.run:function@22, ev2.run:function@26 } |                |
| 30                         | [main()]   | []          | {promise@5, promise@8} | [function@26(0)] | { ev1.run:function@22, ev2.run:function@26 } |                |
| eof                        | []         | []          | {promise@5, promise@8} | [function@26(0)] | { ev1.run:function@22, ev2.run:function@26 } |                |
