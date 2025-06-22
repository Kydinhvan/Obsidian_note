A verification algorithm takes in two inputs `𝐼` and `𝐸`.
- `𝐼` is the given input to the decision problem.
- `𝐸` represents “evidence” that we provide to the algorithm.
	- If `𝐸` is **sufficient** “evidence”, then the algorithm outputs 1 **(“accept”)**, and we say that 𝐸 is a [[Certificate]] for the verification algorithm.
	- If `𝐸` is **insufficient** “evidence”, then the algorithm outputs 0 **(“reject”)**.
