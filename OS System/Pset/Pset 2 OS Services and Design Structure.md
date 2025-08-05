## Shell Built-in Functions vs System Programs 

### Background: Shell Built-in Functions vs System Programs

When we type a command in a shell, it may either trigger a **built-in function** or invoke an **external system program**.

- **Built-in Shell Functions** These are commands implemented _within the shell itself_. They run **without creating a new process**. Examples include:
    
    - `cd` – changes the current directory
    - `export` – sets environment variables
    - `echo` – prints text to the terminal Since they’re handled internally, they’re **faster** and essential for changing the shell’s own state.
- **System Programs (External Commands)** These are **separate executables** located in directories like `/bin` or `/usr/bin`. When called, the shell **creates a child process** to run them. Examples:
    
    - `ls` – lists directory contents
    - `cat` – reads file contents
    - `grep`, `python`, `gcc`, etc. These programs use **system calls** to request kernel services (e.g., read files, print output).

In summary, built-ins are fast and internal; system programs are external and involve process creation and system calls.

### Scenario

A student implemented a minimalistic shell in C. The student notices that built-in commands like `cd` work perfectly, but external commands such as `ls` or `rm` fail mysteriously. The student mistakenly refers to these external commands as “system calls” and is unsure why they don’t behave the same way as the built-in commands.

**Answer the following questions:**

1. Explain clearly the difference between a system call and a system program, giving examples of each in the context of a shell.
2. Identify whether commands such as `ls` and `rm` are system calls or system programs. Provide reasoning to support your identification.
3. Describe clearly why built-in shell commands (like `cd`) behave differently from external system programs (like `ls`, `rm`) within a custom shell.

## Ans
- **System calls** are **programming interfaces** provided by the operating system kernel that allow user-level programs to request low-level OS services, such as file I/O operations, memory allocation, or process management. They represent controlled entry points into kernel space, typically invoked indirectly via programming APIs (e.g., `write()`, `open()` in POSIX).
- **System programs** are user-level utility programs provided by the operating system to perform common tasks, such as managing files or processes, and running in user mode. Examples of **system calls** include `open()`, `read()`, and `write()`, while examples of system programs are terminal commands like `ls`, `rm`, and `mkdir`.

2. The commands `ls` `rm` are not system calls. They are independent executable programs residing in directories such as `/usr/bin`, executed by a shell upon request. They internally utilize system calls, such as `open()`, `read()`, and `write()`, to perform their tasks. However, they themselves are not directly executable system calls.

3. Built-in commands (such as `cd`) behave differently from external system programs (`ls`, `rm`) because built-in commands are executed directly within the shell's own process. **The shell itself contains the code for built-in commands** and do not require creating a process to 


### Explanation:

Swapping the contents of two registers is a **simple CPU operation** that can be done entirely in **user mode** without needing any privileged access or kernel intervention.

#### Key Points:

- **User mode** allows execution of regular instructions, including arithmetic and data movement (like register swaps).
    
- **Kernel mode** is only needed for **privileged operations**, such as accessing hardware directly, performing I/O, or managing memory protections.
    
- Swapping two registers (e.g., using `MOV`, `XCHG` in assembly) does **not** require access to kernel resources.
    

✅ **Correct Answer: False**  
✳️ Because switching to kernel mode is **not needed** for register-level operations.