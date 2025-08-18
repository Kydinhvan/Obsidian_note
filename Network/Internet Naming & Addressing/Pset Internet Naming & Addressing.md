## The Diagrammed Delay

### Background: DNS Query Types

DNS resolution can happen in two main query types:

- **Recursive Query**: The client asks a DNS server to resolve the full query and return the final answer. The contacted DNS server does all the querying work.
- **Iterative Query**: The server returns the best answer it has, typically a referral to a more authoritative DNS server. The client must continue the resolution process.

Clients like browsers typically send **recursive** queries to a **local DNS server**, which then performs **iterative** queries on their behalf. Understanding who queries whom (and in what order) is key to debugging DNS resolution issues.

### Scenario

You are shown the following partial time-space diagram of DNS query resolution for `www.moviehub.net`.
![[Pasted image 20250804095340.png]]

This diagram ends at the point the final IP address is returned. You are told the user typed the domain in a browser, and did not use any CLI tool.

**Answer the following questions**:

1. Is the query initiated by the browser recursive or iterative? Justify your answer using steps from the diagram.
2. Which component in this diagram performs the majority of the DNS resolution work? Explain.
3. What is the role of the `.net` TLD server in this flow?
4. Suppose the local DNS resolver does **not** support recursion. a. How would the browser have to behave differently? b. Draw the new message flow between the browser and external DNS servers.
5. Briefly explain two tradeoffs between using a recursive DNS resolver vs. having the client perform iterative queries.

> **Hints**:
> 
> - Focus on whether the _client_ receives a final answer vs. multiple referrals
> - Look at who contacts the TLD and authoritative servers
> - Think about network overhead and caching potential