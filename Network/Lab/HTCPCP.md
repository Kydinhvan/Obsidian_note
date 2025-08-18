### Web browser → coffee server directly?
![[Pasted image 20250807164007.png|500]]
- Flask web server running on port 5031. Middleman
- Coffee server runs on **port 5030**, but the **browser never connects directly** to it
- Instead, the browser talks to Flask GUI server, and Flask relays requests

>This is client-server flow. The client → Flask (GUI) → Coffee server

- The browser sends HTTP requests to Flask (`localhost:5031`)
- Flask processes the request and sends **HTCPCP commands** to the coffee server (`localhost:5030`)
- The coffee server replies to Flask with HTCPCP response
- Flask translates that back into an HTTP response for the browser


### Protocol between web app & browser
![[Pasted image 20250807164502.png|500]]
The browser and Flask use **HTTP** (or HTTPS if TLS is enabled)
Flask and the coffee server use **HTCPCP**
- So in the **application layer**, browser ⇄ Flask is **HTTP** (not HTCPCP, not ARP, not NAT).

- **NAT**: Network Address Translation, not a protocol between client/server.
- **UDP**: HTCPCP and HTTP use **TCP**, not UDP.
- **ARP/ICMP**: Lower-level network tools (used for MAC resolution or ping).
- **coffee://**: Not a real protocol.

Correct Layer stack:
- Application: HTTP
- Transport: TCP
- Network: IP
- Link: Ethernet/WiFi 

### How HTTPS works (TLS basics):

1. Flask server sends the browser its **certificate** (`cert.pem`)
2. That certificate contains the server’s **public key**
3. The browser:
    - Generates a **random symmetric session key**
    - Encrypts it with the **server's public key**
4. Server receives it and decrypts with its **private key** (in `key.pem`)
5. Now both sides share a secret key and use **symmetric encryption** (like AES) for the rest of the connection
