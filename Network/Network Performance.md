
# Types of Packet Delay

Each packet experiences a series of delays as it moves through a network. There are **four main types** of delays at each node (router or switch):

## Processing Delay
- Time to **process the packet header** (e.g., check for errors, determine output link).
- **Duration**: Usually < 1 ms, relatively constant.
- **Factors**: CPU speed, memory, software efficiency.

## Queueing Delay
- Time a packet **waits in buffer** before being transmitted onto network link.
- **Duration**: Variable, can be very large when congested.
- **Cause**: If packet arrival rate > link transmission rate.

## Transmission Delay
- Time required to **push all the bits** of the packet onto the link.
- **Formula**:
    $$d_{trans}= \frac{L}{R}$$​
    where
    - L = packet length (bits)
    - R = link bandwidth (bits/sec)

## Propagation Delay
- Time it takes for the signal to **travel across the link**.
- **Formula**:
    $$d_{prop} = \frac{d}{S}$$​
    where
    - d = distance (m)
    - S ≈ 2×$10^8$ m/s (speed of signal)

# End-to-End Packet Loss Rate
*Each link has an average probability of loss: loss rate*
Given Per-Link Loss Rates:
- **Link 1**: 5% = 0.05
- **Link 2**: 10% = 0.10
- **Link 3**: 10% = 0.10
We multiply the probabilities that the packet **survives** each link.
- Probability of survival on Link 1 = 1 − 0.05 = **0.95**
- Probability of survival on Link 2 = 1 − 0.10 = **0.90**
- Probability of survival on Link 3 = 1 − 0.10 = **0.90**

-> 0.95 × 0.90 × 0.90 = 0.76950
Loss: (1 - 0.76950) * 100%= 23%

Success rate is multiplicative but loss rate is not

# Throughput & Bandwidth
Throughput: bit/time
Bandwidth:  maximum amount of data that can travel through a link

*Bottleneck link on end-end path that constrains end-end throughput*

# Visualise 
![[Pasted image 20250721094308.png]]
