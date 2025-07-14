# nut and bolt vs service view

## Nut and Bolt view
*Focuses on the physical and infrastructural elements of a network.*
### Core Components:
1. **Hosts / End Systems**
	- Devices like phones, computers, servers running network applications (e.g., browsers, chat apps, etc.)
2. **Communication Links**
    - Physical mediums like copper wire, fiber optics, or radio waves.
    - Measured in **bits per second (bandwidth)**.
3. **Packets**
    - Data is **segmented** and given **headers** before transmission.
    -  Reassembled at the destination with header representing order of the chunks
4. **Packet Switches**
    - Devices that **forward packets** (e.g., routers, link-layer switches).
    - Form the "network core" where routing decisions are made.
5. **Internet Service Providers (ISPs)**
    - Provide end-system access to the internet.
    - Include regional, global, corporate, university, and public-access ISPs.

## The “Service” View
*Focus on how applications use the network*
The internet is viewed as **an infrastructure that delivers services to applications**.
- Internet provides APIs (e.g., REST API, Socket API) for apps to communicate.
- Applications include email, streaming, VoIP, file sharing, etc.
- These apps run at the **network edge** (on end systems), not inside the core.

>[!note] Network edge includes hosts/end systems. Network core includes switches, routers

---
# Network Challenges

- **Operability**: How do the independent devices communicate and synchronize, what medium or protocols do they use?
	[[#Internet Protocols and APIs]]
- **Sharing**: How do we control traffic of packets? How do we share resources between N hosts that wish to communicate with one another?

- **Complex interacting components**: How do we manage the interaction between so many different types of devices, e.g: phones, micro controllers, computers, database servers, cars, etc.?

- **Scalability**: How do we scale the network, so that it is able to support the growing number of devices?

To overcome these problem:

## Internet Protocols and APIs
*Format and order on how to send messages (packets) thru the internet and actions taken upon receiving them* 

![[Pasted image 20250714132512.png|500]]
- Physical layer: DSL, ISDN, IEEE 802.11 WiFi Physical layer
- Link layer: ARP, Ethernet, Token Ring
- Network layer: IP, ICMP
- Transport layer: UDP, TCP
- Application layer: SSH, SMTP, HTTP, HTTPs