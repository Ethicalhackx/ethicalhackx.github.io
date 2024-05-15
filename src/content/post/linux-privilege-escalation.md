---
title: Linux Privilege Escalation
publishDate: 2023-08-05
author: Abhinav Kumar
image:   '~/assets/images/bash.jpeg'
excerpt: Linux Privilege Escalation.
draft: false
category: Hacking 101
---

Linux Privilege Escalation.

This article like many other is a progressive one, that is will be updated with more related contents.  
This article was last updated on - **September 07, 2023.**

#### Table of Contents

## System Enumeration
hostname - machine name, sometimes it is related to one of te exploits.

uname -a  -- tells Kernel Version, Architecure, these are helpful in kernel exploit or arch specific
cat /proc/version
cat /etc/issue

architecture information  - lscpu


What Process are running - 

ps -aux  [ in order they started]
ps -aux | grep root - to find all that root is doing 


## User Enumeration

whoami
id - what user ID, group ID are assigned , to know privileges

sudo -l [ to know what we can do as sudo], check NOPASSWORD attributes, LD_PRELOAD

cat /etc/passwd - see the uers here on a machine
filter out the real users from 1000 ID

cat /etc/passwd | cut -d : 1

cat /etc/shadow

cat /etc/group


history - to know the commandline history

## Network Enumeration

ifconfig or ip a
ip route
arp -a
ip -neigh

netstat -ano ]-what ports are open, any communication to unusual IPs, any local open ports not discoverd externally ( maybe nmap) ,who we communicating with.

## Password Hunting 

Idea is to learn methods who to search files on machine

grep --color=auto -rnw  '/' -ie 'PASSWORD=' --color=always 2>/dev/null

locate password | more


history command
cat ~/.bash_history

find . -type f -exec grep -i -I "PASSWORD" {} /dev/null \;

## Weak File Permissions

ls -l /etc/passwd
ls -l /etc/shadow

## SSH Keys

find / -name authorized_keys 2> /dev/null
find / -name id_rsa 2> /dev/null


## Kernel Exploits

### Dirty Cow

gcc -pthread cow.c -o cow

passwd

get root


## Root Path

Check if one or more Root path variables are writable

```bash                                                         
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ env | grep $PATH
PATH=/usr/local/sbin:/usr/sbin:/sbin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
```