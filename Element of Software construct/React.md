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

