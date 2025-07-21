*`traceroute` shows the **path (hops)** a packet takes to reach a destination.*
- Sends packets with a **Time To Live (TTL)**.  
- Each router that handles the packet **reduces TTL by 1**, limiting how many hops a packet can take.
- When TTL = 0, the router **discards the packet** and sends back an **ICMP "Time Exceeded"** message.
- It increases TTL step by step to trace each hop.


- **TTL = max hops a packet can survive**
- **Traceroute** increases the **initial TTL** from 1 upward to explore each hop
- **Routers** decrease TTL as packets pass through
- When TTL hits 0 → **router sends ICMP TTL Exceeded**


` 10    26 ms     6 ms     7 ms  142.251.229.66`
This is **hop number 10** – the 10th router in the path
These are the **round-trip times (RTT)** for 3 packets sent to this router. They show how long it took (in milliseconds) for each to go to the router and back.
### What do * * * mean in traceroute?
***The traceroute did not receive a reply** from that router (hop) within the expected time.*

`16 * * *` : 16 is the number of hops away from me

1. The router is configured to drop or ignore ICMP or UDP packets.
    - Some routers are set up to not respond to traceroute (for security or load reasons).
2. The router is too busy to respond.
3. The packet was filtered or blocked by a firewall.
4. Network congestion or temporary packet loss.

@ layer 3 of network layer
ICMP port unreachable: The destination IP is reachable, but the **port you're trying to reach isn't open**
- Traceroute **doesn't need the port to be open**. It just needs **any reply** from the destination.

High link utilization, queue delay increase exponentially
### Route Asymmetries
