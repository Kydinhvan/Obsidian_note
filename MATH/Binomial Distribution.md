The **Binomial Distribution** is a discrete probability distribution that models the number of successes in a fixed number of **independent** Bernoulli trials.

---
## Formula

$$
P(X = k) = \binom{n}{k} \cdot p^k \cdot (1 - p)^{n - k}
$$

Where:
- $n$ = total number of trials  
- $k$ = number of successes  
- $p$ = probability of success on a single trial  
- $\binom{n}{k}$ = "n choose k" = combinations

---
## Conditions for Binomial Distribution

- Fixed number of trials ($n$)
- Each trial is **independent**
- Two possible outcomes (success or failure)
- Constant probability of success ($p$)

### Example: Network Users

Suppose there are 5 users. Each is active with probability 0.2.  
What is the probability that **exactly 2** users are active?

$$
n = 5,\quad k = 2,\quad p = 0.2
$$

$$
P(X = 2) = \binom{5}{2} \cdot (0.2)^2 \cdot (0.8)^3 = 10 \cdot 0.04 \cdot 0.512 = 0.2048
$$

---
## Cumulative Probability

To find the probability that **less than $k$** users are active:

$$
P(X < k) = \sum_{i=0}^{k-1} \binom{n}{i} \cdot p^i \cdot (1 - p)^{n - i}
$$

