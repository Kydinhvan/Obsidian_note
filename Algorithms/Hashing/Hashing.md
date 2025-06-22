method for storing data with all advantages of [[Direct Addressing|Direct Address Tables]], without their limitations

key values **DO NOT** need to be integers

Key Ideas:
1. [[Hash Function]] - Function to map key values to a set of integers
2. [[Hash Table]] - each object is stored based on it's [[Hash Value]]

When two key values are hashed to the same slot, it's called [[Hash Collision]], which cannot be avoided if there are **more key values than hash values** 