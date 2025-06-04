
![[Pasted image 20250526134048.png]]
Conceptual Modelling: ER Model (Entity-Relationship)
**Logical Modelling**: Relational -> High level design -> what structure data has
# Definition
Relation: an unordered set containing relationship of attributes

Relation is the same as table?
- No, relation must be a set: **no duplicate rows**. Unordered (maybe unordered)
- Other constraints (next few slides)

Why call it a relation? Because it is a mathematical relation

## Relation Schema and Instance
![[Pasted image 20250526134855.png]]

## Attributes
- The set of allowed values for each attribute is called the domain of the
attribute
- Attribute values are (normally) required to be atomic; that is, indivisible
- The special value null is a member of every domain. Indicates that the value
is “unknown”
	- The null value causes complications in the definition of many operations

---
## Keys
![[Pasted image 20250526135651.png]]
K are **sufficient to identify a unique tuple**
Super K is a candidate key if K is **minimal** (there can be many key ->id or id+name(**composite key**) ) -> we should choose id since it is minimal and sufficient

---
## Foreign Key
![[Pasted image 20250526141815.png]]
Foreign key constraint: Value in one relation must appear in another
- Referencing relation
- Referenced relation

---
# ER To Relation
![[Pasted image 20250526142020.png]]
Rule 1: Entity set → Relation
	Preserve fields + primary key
	- Professor(Person-ID, Name)
	- Student(Student-ID, Name)
	- Lecture(Course-ID, Title, CP)

Rule 2: Relationship → Relation
	Combine all keys from entity sets to make a new primary key. Many combination, need to check for constraints
	- Gives(**Person-ID, Course-ID**) | YES but not minimal
	- Gives(Person-ID, **Course-ID**) | YES, Minimal since only 1 prof can teach a Lecture
	- Gives(**Person-ID**, Course-ID) | no not enough since 1 prof teach many lecture

Rule 3: Merge relations with same key (Don't merge in exam)
	When to merge: **Share same Primary key** 
		1 Key yes, >1 keys need to check if they are same for all cases
	When not to merge: >1 keys are not same for all cases
