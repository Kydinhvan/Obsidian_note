- The singleton class must provide a global access point to get the instance of the class.
- Restricts the instantiation of a class and ensures that only one instance of the class exists in the Java Virtual Machine.
- Singleton design pattern is also used in other design patterns like [Abstract Factory](https://www.digitalocean.com/community/tutorials/abstract-factory-design-pattern-in-java), [Builder](https://www.digitalocean.com/community/tutorials/builder-design-pattern-in-java), [Prototype](https://www.digitalocean.com/community/tutorials/prototype-design-pattern-in-java), [Facade](https://www.digitalocean.com/community/tutorials/facade-design-pattern-in-java), etc.

# Eager initialization With static block

*This create the instance even before it’s being used and that is not the best practice to use.*
```java
public class StaticBlockSingleton {

    private static StaticBlockSingleton instance;

    private StaticBlockSingleton(){}

    // static block initialization for exception handling
    static {
        try {
            instance = new StaticBlockSingleton();
        } catch (Exception e) {
            throw new RuntimeException("Exception occurred in creating singleton instance");
        }
    }

    public static StaticBlockSingleton getInstance() {
        return instance;
    }
}
```

If your singleton class is not using a lot of resources, this is the approach to use.
We should avoid the instantiation unless the client calls the `getInstance` method

# Thread Safe

```java
public class ThreadSafeSingleton {

    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton(){}

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }

}
	```