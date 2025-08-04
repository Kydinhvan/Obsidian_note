*DNS is a **distributed** and **hierarchical** database.* 
	Distributed system of servers provide scalability.

The presence of DNS **protects** domains. The same name can point to a different physical machines hence allows for:
- Strong modularity,
- Strong fault isolation (1 faulty doesn't affect other)

We can also conclude that DNS provides **indirection** (name to IP address) as its core design principle. This has many virtues:

- **Late binding at runtime**, e.g: physical server can move around with different IP and keeping the same name `server can move`
- **Many-to-one mapping**: aliasing. Some people use _multiple_ domains **aliased** to a single site as part of their search engine strategy.
- **One-to-many mapping**: the same domain name can have many IP addresses. This is useful for **load balancing**.
# DNS name resolution
*There are two ways to resolve the hostname-IP translation: **iterative** and **recursive**.*

In an **iterative** DNS query, the DNS client allows the DNS server to return the _best_ answer it can. 
	If the queried server **does not have answer**, it **returns a referral** to other more authoritative DNS servers. DNS client does most of the work
	The client communicates _directly_ with each DNS server involved in the lookup.

A **recursive** DNS lookup is where a DNS server communicates with several other DNS servers to hunt down an IP address and return it to the client. 
	The DNS server does all the work of fetching the requested information.

>[!note] Type of DNS query (whether iterative or recursive) is determined by the client and the configuration of the DNS server receiving the query.

# Activity

```shell
Davids-MacBook-Pro-2:~ david_yau$ nslookup www.csail.mit.edu

Server: 202.65.247.31
Address: 202.65.247.31#53

Non-authoritative answer:
www.csail.mit.edu canonical name = live-csail.pantheonsite.io. 

live-csail.pantheonsite.io canonical name = fe3.edge.pantheon.io. 

Name: fe3.edge.pantheon.io
Address: 23.185.0.3
```

`202.65.247.31` : IP address of the DNS server that answered your query (`nslookup`)
`23.185.0.3`: www.csail.mit.edu  IP address


### top-level domain (TLD) servers: 
- responsible for com, org, net, edu, aero, jobs, museums, and all top-level country domain 
- Verisign Global Registry Services maintains servers for .com TLD 
- Edu cause for .edu TLD 
### authoritative DNS servers: 
*A server that has the final, official answer for a domain*
- organization’s own DNS server(s), providing authoritative hostname to IP mappings for organization’s named hosts 
- can be maintained by organization or service provider

#### Example
"What’s the address of the MIT CSAIL website?"
- A **local DNS server** might say:
    "I think it’s this — I cached it recently." - might be dirty
- But the **authoritative DNS server** for `csail.mit.edu` says:
    "**I own that domain**. The official answer is this IP address.

