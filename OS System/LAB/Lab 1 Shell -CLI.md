**UNIX-type shells** (POSIX is an IEEE standard that acts as a standard UNIX version)
- shell is a process
CLI is text-based program that wait for prompt to do things

Linux is a kernel ->
the first word of the command is the **name of a program** 
- Once it is found on your system, make a sys call

example: `Ping` `google.com` 
1. syscall to execute this as a new process with given argument
2. process running with google.com
3. when ping exits then shell will print another prompt
# Simple command
`pwd` return full path of the directory you are currently in
`ps -ax` will report all running processes in your system (by all users)

---
# Type of commands: 
## without options
## with options


---
# Environment Var

```bash
echo $VARIABLE_NAME
```
Return the value of a variable eg 
	`$PATH` : provides the **additional context** that the command line needs to figure out where file `<command>` is in the system
	If `export PATH=$(echo none)` : `none` is not a valid directory and doesn’t contain any executables -> the shell has no idea where to find binaries like `/bin/ls` or `/usr/bin/bash`

```bash
export PATH=home/smth
```
set path to this session - kill shell reset this. 

```bash
~Desktop/smth.sh
```
run this application 

```bash
nano ~PATH
```
open this 

---
## Standard streams

```bash
ping google.com > hello.txt
```
Redirect output to this file. Input Output concept `2>` if you are expecting error

Standard streams are **input** **and** output communication channels between a **running process** and its **environment** when it begins execution
`tr` a command line utility for **translating** or **deleting** characters

```zsh
tr "[A-Z]" "[a-z]" < test.txt > new_test.txt
```
Shell handles redirections first — _before_ running the `tr` command.
- `< test.txt`: shell opens `test.txt` for reading and connects it to (stdin).
- `> new_test.txt`: shell creates or **truncates** `new_test.txt` and connects it to stdout.

---
## Streams redirection
`stdin`, `stdout`, and `stderr` for every process is symbolized with [file descriptor](https://en.wikipedia.org/wiki/File_descriptor) `0`, `1`, and `2` respectively. 
Each file associated with a process is allocated a unique number to identify it, this number is called the **file descriptor**.

Command line read from right to left

---
## Pipe `|`
The Pipe `|` is a _special_ feature in Linux that lets you use **two** or **more** commands such that **output** of one command serves as **input** to the next.

---
# Config Shell Sessions
`.rc` files are runtime configuration 
script at session start : `.bashrc`, `.zshrc`, etc

---
# Download Files using `curl`
``` bash
curl -o GPL-3 https://www.gnu.org/licenses/gpl-3.0.txt
```
- The `-o` option: Write output to `<filename>` instead of `stdout`

---
# Output Filtering
```bash
grep "<string>” <path/to/file>
```
 search for a string inside a file 
- `-i`: both lower and upper case
- `-v`: search everything that does not contain the `<string>`
- `-n`: prints the line number too

---
# Compiling Programs
**compiler** or **interpreter**, e.g. `python3`, `gcc`, or `javac`

To **compile** the files and **run** the executable:
1. Navigate to this directory and type the command: `gcc -o prog.o main.c hello.c factorial.c binary.c`
2. And then execute by typing `./prog.o`
`gcc` compiles all the input argument files: `main.c, hello.c, factorial.c, binary.c` and produces a binary **output** (this is what `-o` means) named `prog.o` which you can execute using `./prog.o` .