- **TF**: Term Frequency — how often a word appears in a **document**

- **IDF**: Inverse Document Frequency — how **rare** a word is across **all documents**

# TF — Term Frequency

This part gives **importance to words that appear frequently in the current document**.
`Document: I love kpop. Kpop is life. Kpop forever!`

TF of kpop = 3
TF of love = 1
TF of life = 1

So `kpop` is very important in this document.

# DF - document Frequency

This part **penalizes common words** across many documents.
Imagine you have 1000 tweets, and:

- `kpop` appears in **5** tweets → low DF → **high importance**
- `the` appears in **900** tweets → high DF → **low importance**

