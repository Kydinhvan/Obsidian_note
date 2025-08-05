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

**Protocols** define the rules for communication and are layered.
![[Pasted image 20250714132512.png|500]]
Example by layer
- Physical layer: DSL, ISDN, IEEE 802.11 Wifi Physical layer
- Link layer: ARP, Ethernet, Token Ring
- Network layer: IP, ICMP
- Transport layer: UDP, TCP
- Application layer: SSH, SMTP, HTTP, HTTPs

---
### Example problem:
- Host A needs to send 128 MB of data to Host B.
- 24 slots per second
- Bit rate = 48 Mbps
- Connection setup time = 800 ms
# Circuit Switching
*A dedicated path (circuit) is established between two devices before they start communicating. This remain reserved for the entire duration of communication session*

**Guaranteed Bandwidth**: Resources (e.g., bandwidth) are pre-allocated (=)
- Guaranteed stable connection for that reserved slot / bandwidth (+)
- Wasted Resources if underutilization of these reserved slot / bandwidth
**Requires setup** before data transfer begins (-)

>used in emergency services, secure government communications, remote areas telephony, industrial and legacy systems

## Multiplexing the Circuit
*A method that allows multiple signals to share the same physical communication resource (cable, fiber)*

![[Pasted image 20250714175154.png|500]]
### Time Division Multiplexing (TDM)
- The communication channel is **divided into time slots**.
- Each sender gets the **entire bandwidth**, but only for a **brief period** of time.
- These time slots rotate continuously and rapidly 

> Think [[OS Kernel Roles#Timesharing - Multiprogramming allows for timesharing|Kernel Scheduler timesharing]] 

Calculation time to send 128 MB with TDM:
Bandwidth available to Host A = 48/24 = 2Mbps
128 MB = 128 * 8 = 1024 bits
1024/2 = 512 seconds
512 + setup time = 512.8

### Frequency Division Multiplexing (FDM)
- The channel is divided into multiple **frequency bands**.    
- Each sender is **assigned a different frequency**, and they all transmit **at the same time**

> Actual parallel

Bandwidth available to Host A = 48/24 = 2Mbps
128 MB = 128 * 8 = 1024 bits
1024/2 = 512 seconds
512 + setup time = 512.8

# Packet Switching
*Messages are broken into smaller packets, sent independently over a network and reassembled at destination*

![[Pasted image 20250714202722.png|400]]
Many end user share the packet switching resources unlike circuit switching
Packets occupy network resources on **demand** which is better for bursty data.

> Modern internet use Packet Switching

Requirement change: 
- Required resources are shared among 5 users
- Users will use 10MBps if they are active, and that they are only active 20% of the time.

Probability of N users being active at the same time Binomial Distribution
$$P(1 \  user \ is \ active) = \binom{5}{1} \times 0.2 \ \times 0.8^4$$P(exactly N out of M users are active): $$\binom{M}{N} \times 0.2^N \ \times 0.8^{M-N}$$
P(less than N out of M users are active): $$\sum_{i=0}^{N-1} \binom{M}{i} \cdot (P_{\text{active}})^i \cdot (1 - P_{\text{active}})^{M - i}
$$
>[!note] Time to transfer 128MB btw A and B *varies*, depending on *no of active users*

### Compare Circuit vs packet
| Feature             | Circuit Switching                                 | Packet Switching                         |
| ------------------- | ------------------------------------------------- | ---------------------------------------- |
| Data Pattern        | Continuous                                        | Bursty                                   |
| Connection Setup    | Requires dedicated path setup before transmission | No setup; packets routed independently   |
| Resource Allocation | Fixed and reserved for the entire session         | Shared, allocated on demand              |
| Latency             | Low and predictable once setup                    | Variable depending on congestion         |
| Bandwidth Usage     | May be underutilized (if user is idle)            | More efficient; bandwidth used as needed |
| Reliability         | Very high (due to reserved path)                  | Depends on network conditions            |
| Cost                | Expensive due to dedicated path                   | Cheaper due to resource sharing          |
| Example Use Cases   | Traditional telephony, VoIP, live streaming       | Web browsing, file transfers, messaging  |
| Scalability         | Limited – hard to scale due to fixed resources    | Scalable – supports more users flexibly  |

---
# Network Layering
*A **design principle** in computer networking where each layer of a network architecture performs specific functions and only interacts with the layers directly above and below it.*

## Emergent behavior 
Refers to **unexpected or unplanned outcomes** that arise when multiple components (hardware/software/modules) interact in a complex system.

> It’s not caused by a single component, but from the interaction between them.

### Priority Inversion -  an example of emergent behavior
- **low-priority task** holds a resource (e.g., a lock or mutex) needed by a **high-priority task**, but...
- The high-priority task is blocked **waiting** for the low-priority one to release the resource.
- Meanwhile, a **medium-priority task** (which doesn’t need the resource) preempts the low-priority task, delaying it from finishing and releasing the lock.

	The OS scheduler, locking mechanism, and priority levels all **work independently**.
	Their interaction results in **a behavior (high-priority task being delayed)** that violates the intended system design.

### Problem
N modules on the internet, everything can interact w other $N^2$. Each of these might lead to emergent behavior. 
-> *Solution to this is layering*
- **Reduces complexity**: Each layer focuses on a specific function.
- **Minimizes interaction scope**: Layers interact only with adjacent layers.
- **Enhances flexibility**: Each layer can evolve independently.

# Open Systems Interconnection (OSI)

*The 5-layer internet protocol stack comprised on **application layer**, **transport layer**, **network layer**, **link layer**, and **physical layer**. *

Real-Life Analogy: Airline Travel
- Application Layer: Your travel plan and ticket
- Transport Layer: Baggage handling
- Network Layer: Route planning (air traffic)
- Link Layer: Gate-to-gate transport
- Physical Layer: Actual plane on the runway
## Application Layer

This is implemented as **software**, typically the user application(s) needing to communicate via the internet itself. Provides **services to user applications**, enabling things like web browsing, email, file sharing

Example protocols: HTTP/HTTPS (Web), SMTP (Email), DNS (Domain), SSH (Secure login)
**Implements APIs** that interact with transport protocols

>An application layer packet of information is called a **message**.

## Transport Layer
***Transfers application messages** between processes across the network*

**Key protocols**:
- **TCP**: Reliable, connection-oriented (used for web browsing, email)
	- Connection setup/teardown
	- Flow control
	- Congestion control
	- Packet reordering
- **UDP**: Unreliable, connectionless (used for video streaming, DNS)
	- Does not guarantee delivery or order of packets, making it faster but less reliable

>A transport layer packet of information is called a **segment**

## Network Layer
*Handles **routing and addressing** of packets across multiple networks*
Operates over IP addresses, **not ports or MAC addresses**.

**Key protocols and tools**:
- IP (Internet Protocol): Routing, addressing packets
- ICMP: Diagnostics (used in tools like ping and traceroute) within IP networks
- OSPF: Optimal routing paths within autonomous systems
- BGP: Facilitates routing between these sys

>A network layer packet of information is called a **datagram**.

## Link Layer
*Transfers data between **neighboring nodes** on the same link.*

Examples:
- Ethernet (wired LAN)
- Wi-Fi (802.11)
- ARP (maps IP to MAC address)

>A link layer packet of information is called a **frame**.

## Physical Layer
*Physically transmits raw bits over a medium*

Examples:
- Ethernet cables
- Fiber optics
- Radio waves (Wi-Fi, Bluetooth)

>A physical layer packet of information is called a **frame**.
