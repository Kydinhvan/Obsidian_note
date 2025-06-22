Two Instruction Operation:
1. LD(SP, -4, RX) - loads the content from the previous line to a chosen Rx
2. SUBC(SP, 4, SP) - move SP to the previous line

**Note:** We aren't deleting the values when we pop, we put them in the requested Register and move the stack pointer up so we know we can overwrite (we arent using that address anymore).