Quiz Topic: Based on [Lesson 2 – Exchange Rate App]  
Related Files: [[Android Teaching (2025) - Lesson 2 - Lecture Note]]

---

#### Question 1: Implements the singleton design pattern
From the [documentation of AppCompatActivity](https://developer.android.com/reference/android/support/v7/app/AppCompatActivity),  MainActivity is also a subclass of Context. 
![[Pasted image 20250414205308.png]]
 Singleton Pattern Goal:
> Ensure only one instance of a class exists in the program.  
> Provide a global access point to that instance.

Answer: 
A  null       Check if instance is not created yet.
B  static     Static method → called without object creation.
C  private  Private constructor → prevent `new` from outside.
D  static    Static variable → shared across all objects

---

#### Question 2: Which variables at Line 5 to 7 can the constructor of Track access?
Consider the following class **Album**, which has an inner class called **Track**.  
The **Album** class also has variables at Line 5 to 7 with different modifiers. 
At **line 25,** the constructor of **Track** is trying to print out these variables belonging to **Album**.
![[Pasted image 20250414210153.png]]
Answer: 
|Variable Name | Accessible? | Why? 

`trackName`          Yes              | Own instance variable in `Track`.
`companyName`       Yes             |`static final` variable from `Album`.
`albumTitle`         No             | Instance variable — outer instance needed.
`numberOfTracks`  No             | Same reason — needs outer `Album` object.

`static` inner classes: [[Java - Abstract Class and Interface]]
- Only access outer `class` static variables directly.
- Cannot access outer instance variables unless given a reference.
---
#### Question 3: What code should be written in main() below to instantiate C?
C is a nested class of A.
![[Pasted image 20250414211537.png]]![[Pasted image 20250414211548.png]]

| C c = new A().new C();    | ❌     | This syntax is used for non-static inner classes.                |
| A.C c = new A.C();           | ✅     | Correct way to instantiate a static nested class.               |
| C c = new A.C();              | ❌     | C must be fully qualified as A.C outside class A.              |
| C c = new C();                 | ❌     | Same reason — C is not top-level.                                   |
| A.C c = new A().new C(); | ❌     | Again, new A().new C() is only valid if C is non-static.      |



---
#### Question 4: a RecyclerView widget is to use data from an adapter, CharaAdapter.
In addition, the individual Views in the **RecyclerView** are to be displayed vertically, in a linear fashion.
![[Pasted image 20250414204426.png]]
RecyclerView Usage Rule:
1. `setAdapter(...)` → Connects data to RecyclerView.
2. `setLayoutManager(...)` → Decides how items are displayed (Linear, Grid, etc).
---
#### Question 4: CharaAdapter, which is an adapter class for the RecyclerView.
![[Pasted image 20250414204903.png]]Each callback/component has a specific task. 

|          |                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Task** | **Description**                                                                                                                         |
| 1        | Each instance of this class holds references to the widgets on each item/card on the RecyclerView                                       |
| 2        | Takes the XML layout of each item/card and converts it to a View object (i.e. "inflate the layout") to be displayed on the RecyclerView |
| 3        | To return the number of items in the data source                                                                                        |
| 4        | To assign the data from the data source to the widgets                                                                                  |
Match the task to the callback/component by entering the task number in the box. Example. If you think Task 1 is the appropriate description for onCreateViewHolder, enter 1 in the box beside it.  
ANSWER:
onCreateViewHolder 

onBindViewHolder 

getItemCount  

CharaViewHolder