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