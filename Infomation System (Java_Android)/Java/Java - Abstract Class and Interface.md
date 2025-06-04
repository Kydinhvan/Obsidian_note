Based on [[50.001(2025) Slides  Week 3 and 4 - Abstract Classes And Interfaces (2).pdf]] 
Related Files: [[Android Teaching (2025) - Lesson 2 - Lecture Note]]

---

## keyword **static**:
- Static methods can't use `this` or access non-static members.
- Static fields are shared across all instances.

1. Static field (Class Variables): These are **shared across all instances** of a class. (new obj will use the same count variable, think same mem location for this count)
```java 
	public class Counter {
    static int count = 0; // shared across all instances
```

2. Static Methods: **can be called without creating an object**. They cannot access instance variables directly.
```java
public class MathHelper {
    static int square(int x) {
        return x * x;
    }
}
int result = MathHelper.square(5); // no need to create a MathHelper object
```

3. Static Classes: **Inner classes** can be `static` if they don’t require access to the outer class’s instance INNER CLASS MUST BE STATIC IF THEY HAVE STATIC VARIABLE, METHOD
```java
class Outer {
    static class Inner {
        void display() {
            System.out.println("Static inner class");
```

---

## Map<k,v>

**Map<Character, Integer>** means that the **Map object** returned has **keys of type Character** and **values of Integer**. Recall that Character and Integer are the wrapper objects for their equivalent primitive types.

---

## Pre and Post increment

```java
int a = 5;
System.out.println("Initial a: " + a);

// Post-increment
int b = a++;
System.out.println("After b = a++");
System.out.println("a: " + a); // a is now 6
System.out.println("b: " + b); // b got 5 (original value of a)

// Pre-increment
int c = ++a;
System.out.println("After c = ++a");
System.out.println("a: " + a); // a is now 7
System.out.println("c: " + c); // c got 7 (new value of a
```

---

## Casting 

**Map<Character, Integer>** means that the **Map object** returned has **keys of type Character** and **values of Integer**. Recall that Character and Integer are the wrapper objects for their equivalent primitive types.
