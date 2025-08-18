# Asymmetric Key Cryptography

 An encryption method that uses a pair of keys for secure communication: a public key, which can be shared with everyone, and a private key, which is kept secret by the owner
## RSA
A public-key cryptosystems used for secure data transmission which fulfils 2 requirements of :
1. Given the public key, it is impossible to compute the private key
2. Able to produce a public-private key pair that *ensure messages **encrypted** with the public key can only be **decrypted** with the corresponding private key, providing **confidentiality***
#### Example
- `encrypt(message, public_key) = ciphertext` (**encryption**)
- `decrypt(ciphertext, private_key) = message` (**decryption**)

- `encrypt(message, private_key) = signed_ciphertext` (**signing**)
- `decrypt(signed_ciphertext, public key) = message` (**verification**)

Characteristics:
- Sender, receiver, **dont need to pre-share secret key** prior to communication
- Public encryption key known to all
- Private decryption key known only to **receiver**
- 1024 - 4096-bit asymmetric (public-private) key pair generated
- 1 round of encryption required
- Input/output size: depends on key size and padding

### RSA Algo

**Key Generation**: 
1.  Choose two prime numbers real-world RSA uses **very large primes**
- p=61
- q=53 

2. Compute $n = p \times q$ $$n=61×53=3233$$
- This value n is part of both the public and private keys.
- It’s also used as the **modulus** for encryption and decryption.
- **Key size** is based on the number of bits in n (e.g., 2048 bits in real systems).

3. Compute Euler’s totient function $z=(p−1)(q−1)$


3-DES is used for data encryption and decryption, and RSA is used only once for key exchange (not bottlenecking the data flow). SHA-256 is not needed since confidentiality is the only requirement.


# hASH fUNCTION
Sending **`m` and `H(m)` (the hash of the message)** **does not ensure integrity** by itself — because:
- If an attacker intercepts the message, they can **modify both `m` and recompute a new `H(m)`**.
- Since hash functions like MD5 are **public and fast**, an attacker can easily do this and send the new pair to Bob.
- Bob would compute `H(m)` and it would **match**, but it would be the attacker's tampered message.

---

### ✅ What’s Needed to Ensure Integrity?

To ensure **integrity** (and authenticity), Alice should send:

- **`m` + a secure hash that's protected** using a **key** or **digital signature**.

Examples:

- **HMAC(m)**: Hash-based Message Authentication Code (uses a shared secret key)
- **Sign(H(m))**: Alice digitally signs the hash using her **private key**