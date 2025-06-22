---
aliases:
  - Kernel Scheduler
---

1. **Weak Policy:** Machine has a fixed-ordering of Priority, and will **wait for the process to finish** before starting the next one
2. **Strong Policy:** Machine will **interrupt/cut-in** based on Ranking
	a. If higher priority interrupts happen at a high rate, requests with lower priorities might be interrupted repeatedly – potentially resulting in **starvation** 

### Case 1: Without scheduling
the worst case latency seen **by each device** is the **total service time of the other devices**, as the interrupt requests can arrive in any order.

### Case 2: Weak, Non-Preemptive Policy
**Cannot interrupt** whatever service that is currently going on, but **Can** **re-order** other interrupt requests in the queue

### Case 3: Stricter Deadline with Weak Policy
Add worst-case latency with service time to see if deadline is a good number or not. If deadline is smaller than the sum, it is not good. (need to find a deadline that is greater than the sum.)

### Case 4: Strong, Pre-emptive Policy
Highest priority will always have a worst-case latency of **0**, meanwhile, higher priorities will cut the queue and interrupt the current process. After the higher process is done, it will continue from the interruption

