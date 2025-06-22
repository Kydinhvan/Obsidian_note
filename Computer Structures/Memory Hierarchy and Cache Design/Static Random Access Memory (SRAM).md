CPU Cache - commonly known as **6T-SRAM** because it is made up of **6-transistors**

![[Pasted image 20250401172509.webp|500|307x344]]

[[Bit Line]]: contains the value of the cell (inverse bit line is only for computer to recognize the value by **telling the difference between the 2 values instead of waiting**)

[[Word Line]]: Setting to "1" will allow access to the memory

[[Sense Amplifier]]: Calculates the difference between bit line and inverse bit line to get the value of SRAM

**To read the SRAM:**
1. Supply high voltage to [[Word Line|word line]].
2. Current flows to the [[Sense Amplifier|sense amplifier]]
3. The [[Sense Amplifier|sense amplifier]] computes the difference to determine whether it is positive or negative.

**To write to the SRAM cell:** 
![[Pasted image 20250401173136.webp|500]]

Focus on the number on the right (that will be the output/value)

Related to: [[Memory Hierarchy]], [[Dynamic Random-Access Memory (DRAM)]] 