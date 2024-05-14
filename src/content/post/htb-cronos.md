---
title: HackTheBox - Cronos w/o Metasploit
publishDate: 2023-09-05
author: Abhinav Kumar
image:   '~/assets/images/htb-Cronos.png'
excerpt: HackTheBox Cronos machine is based on a old CMS vulnerability and sample privilege escalation due to permissions on file.
draft: true
category: HackTheBox
---

# Bashed

HackTheBox Link to Cronos Machine - [HTB-Bashed](https://app.hackthebox.com/machines/Cronos)

## Nmaping Cronos

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo '10.10.10.13    cronos.htb' | sudo tee /etc/hosts 
[sudo] password for abhinav: 
10.10.10.13    cronos.htb 
                                                                                
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap -p- cronos.htb          
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-06 00:08 IST
Nmap scan report for cronos.htb (10.10.10.13)
Host is up (0.15s latency).
Not shown: 65532 closed tcp ports (conn-refused)
PORT   STATE SERVICE
22/tcp open  ssh
53/tcp open  domain
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 1117.06 seconds
                                                                                
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo nmap -sC -sV -A -O -T5 -p22,53,80 cronos.htb
[sudo] password for abhinav: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-06 00:28 IST
Nmap scan report for cronos.htb (10.10.10.13)
Host is up (0.14s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 18:b9:73:82:6f:26:c7:78:8f:1b:39:88:d8:02:ce:e8 (RSA)
|   256 1a:e6:06:a6:05:0b:bb:41:92:b0:28:bf:7f:e5:96:3b (ECDSA)
|_  256 1a:0e:e7:ba:00:cc:02:01:04:cd:a3:a9:3f:5e:22:20 (ED25519)
53/tcp open  domain  ISC BIND 9.10.3-P4 (Ubuntu Linux)
| dns-nsid: 
|_  bind.version: 9.10.3-P4-Ubuntu
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Cronos
|_http-server-header: Apache/2.4.18 (Ubuntu)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 3.18 (96%), Linux 3.2 - 4.9 (96%), Linux 4.2 (96%), Linux 3.16 (95%), Linux 3.12 (95%), Linux 3.13 (95%), Linux 3.8 - 3.11 (95%), ASUS RT-N56U WAP (Linux 3.4) (95%), Linux 4.4 (95%), Linux 4.8 (94%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 53/tcp)
HOP RTT       ADDRESS
1   143.92 ms 10.10.14.1
2   144.08 ms cronos.htb (10.10.10.13)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 20.68 seconds

```

Directory Enumeration

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://cronos.htb/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt --threads 200 --quiet
/css                  (Status: 301) [Size: 306] [--> http://cronos.htb/css/]
/js                   (Status: 301) [Size: 305] [--> http://cronos.htb/js/]
/server-status        (Status: 403) [Size: 298]
```

### Initial Shell




### User Flag




### Privilege Escalation

## Learnings

