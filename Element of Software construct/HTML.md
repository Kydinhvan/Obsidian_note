# Ce3 - Frontend dev
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

#### `document.getElementById()`: This is a DOM (Document Object Model) method that fetches an HTML element from the page by its ID. So, it looks for the elements with the `id` "name" and "code" in the HTML structure.

#### Creating a New XMLHttpRequest Object

- **`xhr.onreadystatechange`**: This assigns a function (a callback) to be executed every time the `readyState` of the XHR object changes.
    - **`readyState`** is a property of the XMLHttpRequest object that represents the state of the request. The possible states are:
        - `0`: Request not initialized.
        - `1`: Server connection established.
        - `2`: Request received.
        - `3`: Processing request.
        - `4`: Request finished and response is ready (successful completion).
            
- Inside the callback function:
    - **`if (xhr.readyState == 4)`**: This checks if the request has finished processing (i.e., the `readyState` is 4). This is the point at which the server's response has been received and is ready to be handled.
    - **`xhr.responseText`**: This contains the server's response in the form of a string. It represents the data sent back from the server after the request has been completed.
    - **`JSON.parse(res)`**: This converts the response string (in JSON format) into a JavaScript object. The server typically returns data in JSON format, which is widely used for web communication. `JSON.parse()` is used to parse the JSON string into an actual JavaScript object.
    - **`update_messagesregion(json)`**: This function is called, passing the parsed `json` object. This function is likely used to update some section of the webpage (probably a region where messages are displayed), using the data from the server response. The exact implementation of `update_messagesregion()` is not provided, but it presumably takes the parsed JSON and updates the page content dynamically.

react front end
```jsx
// update the ol with id  = "staffsregion" in the curent page
// input: json contains a list of staffs
// output : none
function update_staffsregion(json) {
    var html = "";
    for (let i = 0; i < json.length; i++) {
        const staff = json[i];
        html += `<li><div>${staff.name}</div><div>${staff.code}</div></li>`;  

    }
    var region = document.getElementById("staffsregion");
    region.innerHTML = html;
}
// update the select with id = "code" in the current page
// input: json contains a list of codes
// output: none
function update_code_dddl(json) {
    var html = "";
    for (let i = 0; i < json.length; i++) {
        const dept = json[i];
        html += `<option value="${dept.code}">${dept.code}</option>`;  
    }
    var select = document.getElementById("code");
    select.innerHTML = html;
}

// Task 2 TODO:
// handle the click event of the "SendButton"
// invoke /staff/submit/ end-point to create the staff
// render the API result (all staff) in the staffsregion div

function handleSendButtonClick() {
    var name = document.getElementById("name");
    var code  = document.getElementById("code");
    var xhr = new XMLHttpRequest();
    // DONE | TODO: fixme
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4){
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_staffsregion(json);
        }
    }
    // cosntructing a HTTP POST request
    var params = `name=${name.value}&code=${code.value}`;
    xhr.open('POST', `/staff/submit/`, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

/**
 * populate the code drop down list by making an AJAX call
 */
function populate_code_dropdown() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_code_dddl(json);
        }
    }
    xhr.open('GET', `/dept/all/`);
    xhr.send();
}
// set up the event listener for the send button
// call /echo/all to get the current list of staffs
function run() {
    populate_code_dropdown();
    var sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", handleSendButtonClick);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            var json = JSON.parse(res);
            update_staffsregion(json);
        }
    }
    xhr.open('GET', `/staff/all`);
    xhr.send();
}
document.addEventListener( "DOMContentLoaded", run);
```

# Cohort Exercise - Frontend Development Summary

## Key Skills and Concepts Learned
### 1. Project Setup and Environment Configuration
- Initialized and ran a full-stack project with Express and MySQL.
- Installed dependencies with `npm i`.
- Created a MySQL database (`ce3q1`) and a secure, non-root user.
- Configured `models/db.js` to connect using credentials and database name.

### 2. Backend Integration (Express + MySQL)
- Used **Express.js** for routing (`/dept`, `/staff`).
- Used **MySQL** for data persistence via `mysql2/promise` pool.
	- **why**?
- Familiarized with modular architecture (`models`, `routes`, `views`).
- Configured CORS to allow cross-origin access for React frontend.

### 3. Client-side JavaScript (AJAX + DOM)
- Used `XMLHttpRequest` to send `GET` and `POST` requests asynchronously.
- Handled JSON responses to dynamically render:
  - HTML `<li>` items for departments and staff.
  - `<select>` dropdown options.
- Built logic to construct form-encoded requests for backend endpoints.
- Attached event listeners on DOMContentLoaded for dynamic actions.

### 4. React Frontend Integration
- Created React components that interact with Express backend.
- Used `fetch()` to get data from REST endpoints on page load.
- Rendered tables and dropdowns dynamically using `useEffect()` and `useState()`.
- Coordinated React (port 5000) and Express (port 3000) via CORS settings.

---
## Key Concepts

### Asynchronous Programming
- AJAX and `fetch()` calls run independently of the main thread.
- DOM is updated only after data is returned from the backend.

### RESTful API Design
- Clear separation of concerns using routes like:
  - `GET /dept/all`, `POST /dept/submit`
  - `GET /staff/all`, `POST /staff/submit`

### Separation of Concerns
- Models handle DB logic (`dept.js`, `staff.js`).
- Routes expose endpoints to frontend (`routes/dept.js`, `routes/staff.js`).
- Views (`.ejs`) structure the rendered pages.
- Client-side scripts manage user interactions.

### Frontend-Backend Coordination
- Backend APIs return structured JSON.
- Frontend scripts parse and render the response to users.
- CORS allows different origins (e.g., React on port 5000) to access Express APIs.

---
## Implementations

### ce3_q1 - Department Management
- `deptajaxclient.js`:
  - Sends POST request to `/dept/submit/` with department code.
  - Updates DOM list using JSON response.
  - Uses `XMLHttpRequest` to fetch from `/dept/all`.

### ce3_q1 - Staff Management
- `staffajaxclient.js`:
  - Sends POST request to `/staff/submit/` with name and code.
  - Populates dropdown from `/dept/all/`.
  - Updates staff list via `/staff/all`.

### ce3_q2 - React App
- `Dept.jsx`:
  - Fetches department list on tab click.
  - Maps JSON data to table rows.
- `Staff.jsx`:
  - Populates department `<select>` from `/dept/all/`.
  - Uses `useEffect()` to fetch data once on mount.

---

## Tasks Completed

| Task | Description | Skills Used |
|------|-------------|-------------|
| ce3_q1 - Task 1 | Add/view departments via AJAX | DOM, XMLHttpRequest, POST/GET |
| ce3_q1 - Task 2 | Add/view staff via AJAX | Dynamic dropdowns, async form |
| ce3_q2 - Task 1 | Render departments in React | React state, useEffect, fetch |
| ce3_q2 - Task 2 | Populate staff dropdown in React | Controlled components, fetch API |

---

## Conceptual Takeaways

- Understood the full-stack flow:
  - MySQL ➝ Express ➝ Frontend (JS/React)
- Practiced asynchronous programming in JS and React.
- Improved frontend-backend communication via APIs.
- Gained confidence with:
  - Code modularity
  - Server/client data syncing
  - Secure MySQL access

---

## Tools and Technologies Practiced

- Node.js & Express.js
- MySQL 8.x
- HTML + DOM APIs
- Vanilla JavaScript (AJAX)
- React (JSX, useState, useEffect)
- CORS, HTTP headers
