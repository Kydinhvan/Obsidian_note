Physical Memory - commonly known as **1T-DRAM** cell because of it's **1 Transistor**
Cheaper than [[Static Random Access Memory (SRAM)|SRAM]]


![[Pasted image 20250401173632.webp|500]]

**To read from a DRAM:**
1. Supply High Voltage to the [[Word Line|word line]] (switches NFET to **ON**) 
2. Read output voltage on the [[Bit Line]]
	1. **WAIT** for the charge to accumulate at the [[Bit Line]] to give a valid digital voltage value

**To write to a DRAM**:
1. Supply High Voltage to the [[Word Line|word line]] (switches NFET to **ON**) 
2. Supply a strong **"1"** or **"0"** through the [[Bit Line]] to charge or discharge the capacitor


**DRAM Issue:**
Since we are using a capacitor, it is possible for the capacitor to **leak charge over time.** 