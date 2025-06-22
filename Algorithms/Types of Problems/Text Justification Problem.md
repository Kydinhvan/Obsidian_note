**Problem**
Given a paragraph of words, adjust the spacing between the words so that every line is fully left and right justified

where 
$n$ are the number of words and 
$w$ is the number of characters in a line

**Key Idea**
Utilize a [[Cost Function]] to minimize the number of extra space characters

![[image-4.webp]]

**Observations**
Let $length(i,j)$  be the number of characters needed to write word $i$ to word $j-1$ 

Therefore: $line\_cost(i,j)$ is the number of extra space characters needed 

![[image3.webp]]

$DP[i] = min(line\_cost(i,j)+DP[j])$   

**[[Time Complexity]]**
![[image9.webp]]

**[[Space Complexity]]** 
![[image10.webp]]