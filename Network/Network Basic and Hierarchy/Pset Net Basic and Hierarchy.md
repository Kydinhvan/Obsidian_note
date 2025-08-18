## The Vanishing Packet

### Background

Data on the Internet travels in packets through multiple routers. These packets are routed independently and may be dropped along the way. The Internet Protocol (IP) is responsible for delivering packets across networks, but it follows a best-effort delivery model. This means the network makes no guarantees: packets may be lost, duplicated, delayed, or arrive out of order and IP will not try to detect or fix these issues.

Higher layers (like TCP in network layer) can add reliability, but at the IP layer, delivery is not assured. Many users often expect the network to be reliable by default, which creates confusion.

### Scenario

A student builds a program to send short messages between two devices across networks. Locally, messages arrive instantly. But when testing between cities, some messages never appear. The student assumes the network is broken.

**Answer the following questions**:
- What does it mean that IP provides “best-effort” delivery?
- Why might a packet not reach its destination?
- What happens inside a router when traffic exceeds capacity?
- Why do longer-distance messages experience more loss?
- What network design decisions reduce the impact of packet loss?

> **Hints**:
> - IP makes no delivery guarantees
> - Routers have limited buffer space
> - More distance = more routers = more risk
> - Loss can occur without notification
> - Loss recovery is a separate layer responsibility

### Ans:
- The internet forward packets but does not guarantee it will arrive or arrive in order
- because it might be dropped along its route. 
- route forward packets using queue


# Q3
## Hint
- Routers forward based on longest-prefix match
- TTL is decremented at each hop and drops the packet at 0
- Loops may not generate errors unless explicitly logged
- Diagnostic tools rely on TTL to map routes
- Dynamic routing protocols detect and resolve inconsistencies
## Ans
- What causes a routing loop in a packet-switched network?
	Routing loop happen: < 2 routers forward packets to each other in a cycle because they believe the other is the valid next hop destination
- How does the TTL field prevent infinite loops?
	Time to live field is a counter in the IP packet, decrease TTL by one at every router. Packet is discarded at 0 TTL
- Why does the packet “vanish” instead of returning an error?
	TTL expires, silent dropping
- How could the student detect that a loop occurred?
	use traceroute - it observe TTL expiration at each hop
- What are safer alternatives to manual static routing?

# Q4

**Hints**:
- ISPs connect through upstream transit providers
-  Not all access networks share the same paths
- Traffic may reroute around failures only if alternate agreements exist
- The server can be up even if it is unreachable to some users

## Ans
- Why might a website be reachable from one network but not another?
- What role does peering and ISP hierarchy play in this outcome?
- Why does the issue not lie with the university’s server?
- How could the student confirm the website is still online?
- What does this reveal about the structure of the Internet?