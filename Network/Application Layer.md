| Component             | Time Cost                    |
| --------------------- | ---------------------------- |
| TCP handshake         | 1 RTT                        |
| HTTP request/response | 1 RTT                        |
| File transfer         | transmission time (variable) |
this is the limitations of Non-Persistent HTTP
- This **2 RTT penalty** applies **to every object** (unless pipelining or parallel sockets used)
- Causes **high latency**, especially on high-latency networks (e.g., mobile).

![[Pasted image 20250805124723.png|500]]

## HTTP Request Message - Structure

There are **three main parts** to an HTTP request:
1. **Request Line**
2. **Header Lines**
3. **Entity Body**
![[Pasted image 20250805124954.png|400]]

# User-server state: cookies

*Cookies are **small pieces of data** that websites send to your browser. They help the server **remember who you are** between visits or page loads.*

### why is cookies needed
HTTP is **stateless**:
- Every request is **independent**.
- Server does **not remember** anything about previous requests.

>Cookies solve this by **storing a unique identity or preferences** across requests.


## Components of Cookie-Based State Management

When a user visits a site for the **first time**, the server replies with:
    `Set-Cookie: ID=12345`
- This is included in the **HTTP response header**.

The browser stores this cookie.


In every **subsequent request** to that same server, the browser sends: 
	`Cookie: ID=12345`
- This lets the server **identify** the user.

Enables sessions, login state, shopping carts, etc.