Quiz Topic: Based on [Lesson 2 – Exchange Rate App]  
Related Files: [[Android Teaching (2025) - Lesson 2 - Lecture Note]]

---

#### Question 1: In the following code, MainActivity inherits from AppCompatActivity. 
From the [documentation of AppCompatActivity](https://developer.android.com/reference/android/support/v7/app/AppCompatActivity),  MainActivity is also a subclass of Context. 
![[Pasted image 20250414203015.png]]
In Android, `AppCompatActivity` extends `FragmentActivity` → extends `ComponentActivity` → extends `Activity` → extends `Context`.  

Answer: **True

---

#### Question 2: From the [documentation of AppCompatActivity](https://developer.android.com/reference/android/support/v7/app/AppCompatActivity), the method findViewById() that can be used in MainActivity is inherited from AppCompatActivity.?
In the Android documentation for `AppCompatActivity`, the method `findViewById()` is inherited from `Activity` (which `AppCompatActivity` indirectly extends).  

Answer: **True**

---
#### Question 3: What type of class is Context?
Answer: **abstract class**

---
#### Question 4: a RecyclerView widget is to use data from an adapter, CharaAdapter.
In addition, the individual Views in the **RecyclerView** are to be displayed vertically, in a linear fashion.
![[Pasted image 20250414204426.png]]
RecyclerView Usage Rule:
1. `setAdapter(...)` → Connects data to RecyclerView.
2. `setLayoutManager(...)` → Decides how items are displayed (Linear, Grid, etc).
---
#### Question 5: CharaAdapter, which is an adapter class for the RecyclerView.
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