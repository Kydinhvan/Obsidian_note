- Understand how symmetric key cryptography can be used to encrypt data and protect its confidentiality.
- Understand how _multiple_ blocks of data are handled using different block cipher modes and padding.
- Compare the different block cipher modes in terms of how they operate.
- Understand how hash functions can be used to create fixed-length message digests.
- Understand how public key cryptography (e.g., RSA algorithm) can be used to create digital signatures.
- Understand how to create message digest using hash functions (e.g., MD5, SHA-1, SHA-256, SHA-512, etc) and sign it using RSA to guarantee data integrity.


## Symmetric Key Encryption for Text Files
| Concept                                        | Explanation                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Symmetric encryption**                       | Same key is used for both encryption and decryption.                                                   |
| **Fernet (from Python's cryptography module)** | An easy-to-use encryption recipe that uses AES in CBC mode, with automatic IVs and HMAC for integrity. |
| **Base64 Encoding**                            | Used to convert encrypted bytes into printable strings for file storage. **(Encoding ≠ Encryption!)**  |
| **Cipher**                                     | A cipher is an algorithm used for encryption/decryption.                                               |
| **Padding**                                    | Fernet handles it internally, but other block ciphers need manual padding (like in part 2).            |

### Task
- **Generate Fernet key** – one-time key used for both encryption & decryption.
- **Create a cipher** – `Fernet(symmetric_key)`
- **Encrypt bytes** – using `cipher.encrypt(data)`
- **Decrypt bytes** – using `cipher.decrypt(data)`
- **Store to file** – encode as base64 and write to disk.

