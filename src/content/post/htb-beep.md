---
title: HackTheBox - Beep w/o Metasploit
publishDate: 2023-09-04
author: Abhinav Kumar
image:   '~/assets/images/htb-bashed.png'
excerpt: HackTheBox Bashed machine is a Linux machine that is based on misconfigurations around Webshell and permissions.
draft: true
category: HackTheBox
---

#### Table of Contents

### Initial Recon

```bash
abhinav@ETHICALHACKX:~$ nmap beep.htb  
Starting Nmap 7.94 ( https://nmap.org ) at 2023-10-22 23:23 IST
Nmap scan report for beep.htb (10.10.10.7)
Host is up (0.082s latency).
Not shown: 988 closed tcp ports (conn-refused)
PORT      STATE SERVICE
22/tcp    open  ssh
25/tcp    open  smtp
80/tcp    open  http
110/tcp   open  pop3
111/tcp   open  rpcbind
143/tcp   open  imap
443/tcp   open  https
993/tcp   open  imaps
995/tcp   open  pop3s
3306/tcp  open  mysql
4445/tcp  open  upnotifyp
10000/tcp open  snet-sensor-mgmt

Nmap done: 1 IP address (1 host up) scanned in 3.75 seconds
                                                                                                                            
abhinav@ETHICALHACKX:~$ sudo nmap -sC -sV -A -O -T5 -p22,25,80,110,111,143,993,995,3306,4445,10000 beep.htb
[sudo] password for abhinav: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-10-22 23:27 IST
Nmap scan report for beep.htb (10.10.10.7)
Host is up (0.10s latency).

PORT      STATE SERVICE    VERSION
22/tcp    open  ssh        OpenSSH 4.3 (protocol 2.0)
| ssh-hostkey: 
|   1024 ad:ee:5a:bb:69:37:fb:27:af:b8:30:72:a0:f9:6f:53 (DSA)
|_  2048 bc:c6:73:59:13:a1:8a:4b:55:07:50:f6:65:1d:6d:0d (RSA)
25/tcp    open  smtp       Postfix smtpd
|_smtp-commands: beep.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, ENHANCEDSTATUSCODES, 8BITMIME, DSN
80/tcp    open  http       Apache httpd 2.2.3
|_http-server-header: Apache/2.2.3 (CentOS)
|_http-title: Did not follow redirect to https://beep.htb/
110/tcp   open  pop3       Cyrus pop3d 2.3.7-Invoca-RPM-2.3.7-7.el5_6.4
|_pop3-capabilities: TOP EXPIRE(NEVER) USER STLS PIPELINING IMPLEMENTATION(Cyrus POP3 server v2) AUTH-RESP-CODE RESP-CODES LOGIN-DELAY(0) APOP UIDL
111/tcp   open  rpcbind    2 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2            111/tcp   rpcbind
|   100000  2            111/udp   rpcbind
|   100024  1            875/udp   status
|_  100024  1            878/tcp   status
143/tcp   open  imap       Cyrus imapd 2.3.7-Invoca-RPM-2.3.7-7.el5_6.4
|_imap-capabilities: RIGHTS=kxte THREAD=ORDEREDSUBJECT LITERAL+ UNSELECT ANNOTATEMORE Completed OK SORT=MODSEQ STARTTLS LIST-SUBSCRIBED URLAUTHA0001 X-NETSCAPE NO IMAP4 BINARY ID LISTEXT CONDSTORE CHILDREN IDLE THREAD=REFERENCES RENAME CATENATE MAILBOX-REFERRALS ATOMIC SORT ACL MULTIAPPEND UIDPLUS IMAP4rev1 NAMESPACE QUOTA
993/tcp   open  ssl/imap   Cyrus imapd
|_imap-capabilities: CAPABILITY
995/tcp   open  pop3       Cyrus pop3d
3306/tcp  open  mysql      MySQL (unauthorized)
4445/tcp  open  upnotifyp?
10000/tcp open  http       MiniServ 1.570 (Webmin httpd)
|_http-title: Site doesn't have a title (text/html; Charset=iso-8859-1).
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 2.6.18 (96%), Linux 2.6.9 - 2.6.24 (96%), Linux 2.6.9 - 2.6.30 (96%), Linux 2.6.27 (95%), Linux 2.6.30 (95%), Linux 2.6.8 (Debian 3.1) (95%), Linux 2.6.9-22.0.1.EL (CentOS 4.4) (95%), Linux 2.6.18 - 2.6.32 (95%), Linux 2.6.27 (likely embedded) (95%), Linux 2.6.20-1 (Fedora Core 5) (95%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: Hosts:  beep.localdomain, 127.0.0.1, example.com

TRACEROUTE (using port 111/tcp)
HOP RTT       ADDRESS
1   131.48 ms 10.10.16.1
2   45.86 ms  beep.htb (10.10.10.7)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 393.06 seconds
                                                                                                                            
abhinav@ETHICALHACKX:~$ 

```


Gobuster scanning

```bash
abhinav@ETHICALHACKX:~$ gobuster dir -u  https://beep.htb/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt --threads 200 -k -q
/images               (Status: 301) [Size: 306] [--> https://beep.htb/images/]
/help                 (Status: 301) [Size: 304] [--> https://beep.htb/help/]
/mail                 (Status: 301) [Size: 304] [--> https://beep.htb/mail/]
/themes               (Status: 301) [Size: 306] [--> https://beep.htb/themes/]
/static               (Status: 301) [Size: 306] [--> https://beep.htb/static/]
/admin                (Status: 301) [Size: 305] [--> https://beep.htb/admin/]
/lang                 (Status: 301) [Size: 304] [--> https://beep.htb/lang/]
/modules              (Status: 301) [Size: 307] [--> https://beep.htb/modules/]
/var                  (Status: 301) [Size: 303] [--> https://beep.htb/var/]
/panel                (Status: 301) [Size: 305] [--> https://beep.htb/panel/]
/libs                 (Status: 301) [Size: 304] [--> https://beep.htb/libs/]
/recordings           (Status: 301) [Size: 310] [--> https://beep.htb/recordings/]
/configs              (Status: 301) [Size: 307] [--> https://beep.htb/configs/]
/vtigercrm            (Status: 301) [Size: 309] [--> https://beep.htb/vtigercrm/]

```

