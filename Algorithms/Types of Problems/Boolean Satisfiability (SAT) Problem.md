A [[Boolean Expression]] is called **SATISFIABLE** if the variables can result in a true evaluation

**Key Idea:**
If we can assign [[Boolean Variable]] to x that result in the overall expression becoming **TRUE** $(1)$, then the [[Boolean Expression]] is **satisfiable**

**Example: The 3-SAT Problem ([[NP-complete]])**
Given a [[Boolean Expression]] E, such that E is a [[Conjunction of Boolean Expression|conjunction]] of [[Clause of Boolean Expression|clauses]] where each [[Clause of Boolean Expression|clause]] is a [[Disjunction of Boolean Expression|disjunction]] of exactly 3 [[Literal Boolean Expression]], is E **satisfiable?**

*Note:* If we can reduce any Problem to the 3-SAT Problem, the problem must be [[NP-hard]] 