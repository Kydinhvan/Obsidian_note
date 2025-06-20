# Thinking Strat **30-45 min per Q**
### **1 Classify the Problem**

> “What category is this?”

 Start with:
- Is it **Array**, **Graph**, **DP**, **String**, etc.?
- Is it **Greedy**, **Sliding Window**, **Two Pointers**, **Binary Search**, etc.?
### **2 Think in State Transitions**

> “What’s the minimal info I need to track?”

Ask:
- “What is the system state at each step?”
- “How does that state change when input changes?”
### **3 Write in Sentences / Comment**
### 4 **Try to Break the Code**

>“How can I break this?”

---
## Two Pointer
# Sliding Window 

```python
def sliding_window(nums):
    left = 0
    window_state = {}  # could be a count, sum, set, or dict
    result = some_initial_value  # max_len, min_len, etc.

    for right in range(len(nums)):
        # 1. Expand window
        add_to_window(nums[right], window_state)

        # 2. While window is invalid, shrink from the left
        while not is_valid(window_state):
            remove_from_window(nums[left], window_state)
            left += 1

        # 3. Update result if needed
        result = update_result(result, left, right, window_state)

    return result
```

## Max Consecutive 1 (1 flip from 0 to 1 allowed)
```python
def maxConsecutiveOnes(nums):
	left = 0
	max_len = 0
	zero_count = 0
	for right in range(len(nums)):
		if num[right] == 0: # 1 flip is allowed
			zero_count += 1
		while zero_count > 1: # 2 flips not allowed -> left slide rightward
			if nums[left] == 0:
				zero_count -= 1 # reduce 0 count if left pointer passed it
			left+=1
		max_len = max(max_len,right - left + 1)
	return max_len	
```

## Palindrome
```python

```