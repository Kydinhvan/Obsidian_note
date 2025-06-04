Web framework for webserver application dev in Node.js
#### shell
`npx express-generator --view=ejs`

# MVC architecture[](https://sutd50003.github.io/notes/l2_1_expressjs_backend_mongo/#mvc-architecture "Permanent link")

Express.js adopts Model View Controller architecture, a web design pattern. It groups packages and modules based on their roles and functionalities:
1. **Models**. model packages define the data being stored in  storage sys such as databases, and abstract away operations for data manipulation.
2. **View**. The view packages define representation and format of the requested data being returned to the client.
3. **Controller**. The controller packages define rules and routes of how user can request for and operate over the content and data.
<div align="center">
<img src="Pasted image 20250603131428.png", width = 500>
</div>
---
# Frontend of Express.js HTML Form and AJAX

## Developing a View with Server Side Scripting (Using HTML Form)
Method to handle user I/O with Server Side Scripting 
- **Sever side scripting**: entire web page is rendered on the server and sent back to the client (browser) in response to user interactions like form submissions
### `<form>
- The `<form>` tag in HTML is used to collect **user input** and send it to a server for processing.

```html
<form action="a_URL" method="post">
  <elements>
  ...
</form>
```
#### Attributes:
- **`action`**: URL to which the form data will be submitted, handle form (`/echo/submit`)
- **`method`**: HTTP method used for submission, typically:
    - `"GET"` — appends data to the URL **(for retrieving data)**
    - `"POST"` — sends data in the request body **(for submitting data to server side)**

## Developing a View with AJAX
AJAX: Asynchronous JavaScript and XML. A **technique** that use Javascript + HTMLDOM to display data, and XML Http Request to request data from server
- Perform asynchronous communication with server behind the scene 
- Update a portion of page (HTML element) so the webapp looks more responsive

<div align="center">
<img src="Pasted image 20250603133909.png" width="500">
</div>

## Key Differences
### Full Comparison Table with Detailed Explanation

| Feature / Aspect           | HTML Form (Server Side Scripting)                                                                                                                                                                                  | AJAX View (Asynchronous JavaScript)                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form Submission**        | Uses traditional HTML `<form>` element. When the user clicks "Submit", the browser packages the form data and sends it to the server via the form’s `action` URL using the specified HTTP method (usually `POST`). | The form submission is manually handled in JavaScript. A click event on the button triggers an AJAX call (`XMLHttpRequest` or `fetch`) that sends data to the server programmatically. |
| **Page Refresh**           | Entire page is reloaded after submitting the form. The browser discards the current page and loads a new one rendered by the server.                                                                               | Only the part of the page that needs updating (e.g., a list of messages) is refreshed. The rest of the page remains intact, giving a seamless user experience.                         |
| **Data Sent**              | Data is encoded as form data and sent either as a query string (GET) or request body (POST). It's processed server-side through `req.body`.                                                                        | Data is sent as JSON or a URL-encoded string using JavaScript. The request body is built and sent manually by the JavaScript logic.                                                    |
| **User Experience**        | Slower and more disruptive. Users see a brief page reload or flash when submitting data.                                                                                                                           | Much smoother. Users interact with the page more fluidly as updates happen instantly without reloads.                                                                                  |
| **SEO Friendly**           | Yes — Since the server renders a full HTML page, search engine crawlers can read and index the content easily.                                                                                                     | No — Content is injected dynamically by JavaScript after the initial load, which may not be picked up by search engines unless server-side rendering or prerendering is used.          |
| **View Rendering**         | The server uses a template engine like EJS to render the entire HTML page and populate it with data before sending it to the client.                                                                               | The HTML page is rendered with minimal or no dynamic content; then, JavaScript fetches data from the server and inserts it into the DOM.                                               |
| **Initial Load**           | Data (like messages) is pre-rendered and included in the page when it loads.                                                                                                                                       | Page loads with empty or placeholder content. A subsequent AJAX `GET` call fetches data from the server and populates the page dynamically.                                            |
| **Backend Route for View** | The same route (e.g., `/echo`) handles rendering the HTML template and may also process the form submission if it's a POST.                                                                                        | One route (e.g., `/echo`) serves the initial HTML page, and separate API routes (e.g., `/echo/all`, `/echo/submit`) handle data fetching and updates.                                  |
| **Frontend Code Needed**   | Simple HTML with possibly some inline scripts. No client-side JavaScript is required to handle form submission or data rendering.                                                                                  | Requires external JavaScript files (like `echoajaxclient.js`) to handle event listeners, AJAX requests, response handling, and DOM updates.                                            |
| **Where the Logic Lives**  | Almost all application logic lives on the server. The client just sends requests and receives full pages.                                                                                                          | The logic is split: the server exposes API endpoints; the client (JavaScript) handles UI updates, state changes, and communication with the backend.                                   |
## React.js
