## Finding Minimum and Maximum from Input with JavaScript

### HTML Structure:
- `<input id="textbox1">` is where the user types the numbers.    
- `<span id="min">` and `<span id="max">` will show the results.
- `<button id="button1">` triggers the calculation.    
The HTML links `<script src="minmax.js"></script>` is where the logic is handled by the JavaScript file
### JavaScript Logic
#### **numbers(l)**  
Converts the input string (like `["1", "2", "a"]`) into an array of actual numbers (`[1, 2]`), ignoring anything invalid.    
#### **min_max(a)**  
Receives an array of numbers. It loops through each number:    
- If a number is smaller than the current minimum, update min.
- If a number is larger than the current maximum, update max.
#### **handleButton1Click()**  
This function runs when the button is clicked. It:    
- Gets the input from the textbox.
- Converts it into an array of numbers.
- Finds the min and max.
- Shows the result in the appropriate `<span>` tags.

#### **run()**  
Sets up the button so that when clicked, it runs `handleButton1Click()`.
```js
document.addEventListener("click", handleButton1Click);
```
