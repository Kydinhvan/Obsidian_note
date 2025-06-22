The effective **Interrupt Load** these devices impose to the CPU is computed by 

$max[f_{i}] * s_i$ 

where:
- $max[f_{i}]$ - is the **max frequency** of a particular device
- $s_i$ - **service time** of a particular device

The total Interrupt load of these devices on the CPU is therefore the sum of all effective interrupt loads. The remaining fraction is what is left for processes to use to do actual computation.

A computer will not be able to run any other processes **if the Interrupt load reaches 100%.**
