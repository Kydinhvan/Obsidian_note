Constrain every slot to have **at most one element**

Main Idea: Generate a permutation (𝑖1,…,𝑖𝑚) -> [[Probe Sequence]]

Whenever the insertion of a new element 𝑥 into 𝐴 would cause a [[Hash Collision|collision]], find a different empty slot to insert 𝑥 ([[Probing|probing]])

Therefore:
	𝛾 !> 1