![[Pasted image 20250605203753.png]]

### How good should alpha be to be considered for re-evaluate
- PnL graph shape
- stable signal thru the year (is_sharpe)
- Try to establish logical economic basis
- simple expression
- value add to the current alpha pool -> why

### How to define optimal after re-evaluation of an alpha
- correlation rising (getting saturated)
- Test robustness by checking performance under diff setting

---
![[Pasted image 20250605205120.png]]
Market Anomaly -> the alpha is correcting it so that the market is more efficient

Many alpha based on an anomaly -> The arbitrage will eventually disappear -> current alpha based on it earn less or no longer valid

![[Pasted image 20250605205548.png]]

Search template - like search thru diff data field 
-> what out if you are using same operator across diff alpha. They might look diff but same idea still

some anomaly cant be captured as wq low frequency trading 

---

![[Pasted image 20250605210242.png]]
- Finally, neutralize against risk exposures.
- Helps isolate **pure alpha** from unintended risk exposures (e.g., beta, sector, volatility)

It finds outliers in performance relative to a group

it looks like risk neutralized regressed trend that contains an independent variable and the group median of a dependent variable.

Hypothesis: Regressing a particular data against its median amongst its peers can produce a workable signal. We long stocks that shows a positive regression and short those that do not. We can further amplify the signal by ranking the stocks amongst a second group and neutralize against a common risk

![[Pasted image 20250605210945.png]]
see group and long smth that outperform their peer 
group rank make it easier to manage 0 to 1

![[Pasted image 20250605211444.png]]


---
# Alpha space

Rewrite the alpha expression
![[Pasted image 20250605211851.png]]
Hypo: Companies with higher funds from operations ffo to long term debt ratios might indicate stronger financial health suggesting potential for profitable long positions

![[Pasted image 20250605212043.png]]

![[Pasted image 20250605212228.png]]This then becomes a template to inter change operation to generate new alpha or optimize it. 
all parameter -> dayts? times 