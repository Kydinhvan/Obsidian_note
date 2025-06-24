## Java Object Mutex Lock

>`Java Monitor`
>In Java, every object acts as a **monitor** that provides built-in **mutual exclusion** and **condition synchronization** using `synchronized`, `wait()`, and `notify()`. A thread must hold the object’s monitor (via `synchronized`) to call `wait()` or `notify()`, which allows it to coordinate access and signal other threads waiting on shared conditions.


