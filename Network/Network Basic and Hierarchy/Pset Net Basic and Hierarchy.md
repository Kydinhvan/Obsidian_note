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
- The internet t