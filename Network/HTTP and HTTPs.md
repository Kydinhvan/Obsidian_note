**The HTTP has a client/server model**
Steps for HTTP protocol :
1. Client initiates TCP connection (creates socket) to server at a given IP address, port 80
2. Server **accepts** TCP connection from client, creates a socket with this particular client (**remember TCP socket is a 4-tuple**)
3. HTTP messages (application-layer messages) exchanged between browser (HTTP client) and Web server (HTTP server)
4. TCP connection closed at the end of the message / session