**Problem**
Given n matrics ($M_1, ..., M_n$ ), determine the minimum number of scalar multiplications needed.

eg. (2x2) X (2x2) => (PxQ) X (QXR) => P X Q X R
eg2. (AB) X C => P X Q X R + P X R X S 

Therefore: Compute $c[1,n]$ 

**Subproblems**
Compute $c[i,j]$

**Recurrence**
For $j>= 1 + 1$
![[image-7.webp]]

![[image6.webp]]

**Time Complexity**
![[image8.webp]]

**Space Complexity**
![[image11.webp]]