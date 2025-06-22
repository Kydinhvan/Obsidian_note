**The number of bits required for page offset `PO`** depends on how many 32-bit words are there in a page (page size). **Example:**

- Suppose we have 9 words of data for each page. The minimum bits required for `PO` is:
    - $max(log_2(9))=4$ bits if **_word addressing_** is used.
    - $max(log_2(9))+2=6$ bits if **_byte addressing_** is used.

If you always have `00` at the back of PO it simply means **BYTE ADDRESSING** is used, but the number of bits of PO **includes** the last two bits.

**Word Addressing** does not include the last 2 bits