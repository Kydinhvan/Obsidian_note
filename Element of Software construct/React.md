```jsx
function handleSendButtonClick() {
    var name = document.getElementById("name");
    var code  = document.getElementById("code");
    var xhr = new XMLHttpRequest();
    // DONE | TODO: fixme
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4){
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_messagesregion(json);
        }
    }
}
```

1. **`document.getElementById()`**: This is a DOM (Document Object Model) method that fetches an HTML element from the page by its ID. So, it looks for the elements with the `id` "name" and "code" in the HTML structure.

## React Hook
React Hooks are functions that allow you to "hook into" React state and lifecycle features from functional components

*Hooks enable developers to write React applications using only functional components, simplifying state management and side effects.*

Key built-in React Hooks include:
Link: [[useState]]
- Manages state within a functional component. It returns a stateful value and a function to update it.

Link: `useEffect`:
- Handles side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every render of the component unless dependencies are specified.