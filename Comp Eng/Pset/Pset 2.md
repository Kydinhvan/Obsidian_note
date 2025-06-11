## The Mystery of the Missing System Program

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
2. Identify whether commands such as ls and rm are system calls or system programs. Provide reasoning to support your identification.
3. Describe clearly why built-in shell commands (like `cd`) behave differently from external system programs (like `ls`, `rm`) within a custom shell.

> **Hints**:
>
> - Recall what you’ve learned about **how user programs access OS services**. Are system calls directly executable commands from the terminal, or are they something lower-level?
> - Think about where commands like `ls` or `rm` are located and how your shell executes them. Do these commands directly interact with kernel space, or do they rely on something else? Refer to Command Line Lab for clues.
> - Consider how built-in commands are executed within the shell compared to how external programs are launched and executed. What is fundamentally different in their implementation within a shell?

