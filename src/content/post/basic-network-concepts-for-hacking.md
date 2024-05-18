---
coverImage: "network_for_hackers.jpg"
title: Basic Network Concepts for Hacking
publishDate: 2024-05-03
updateDate: 2024-05-15
author: Abhinav Kumar
image: '~/assets/images/network_for_hackers.jpg'
excerpt: Networking for hackers is about essentials of Computer Network that people in Hacking/security should learn.
draft: false
category: Hacking 101
---

Hello People, today I am going to list some networking concepts that are essential when we want to start into security. This is more like a personal blog, and I am no expert into networking, I am just trying to set bare minimum topics we should all have some idea to understand what actually happens behind the screen ( in networking ).

This Article was last Updated on - **May 18, 2024**
Some rearranging is yet to be done, to make it more organised, will do that soon.

#### Table of Contents

So the list will not be exhaustive, also not in order, but it will be more of essential topics we should learn, and read from various sources to understand the very fundamentals.

Also the list below is not a compilation but something what I thought to learn , so the list keeps getting populated as I discover new topics, any suggestions or changes are always welcome through comments or Social-channels.

## Basic / Fundamentals
These are very basic things to know, you should be able to explain in few words.

1. What is Network ?
2. What is Internet ?
3. How Internet Started ?
4. What is IP Address ? 
5. What are Ports ? Common Ports used by application/services .
6. What is a server, and what is a client ?
12. What is MAC Address / Physical Address ?
Inbound / outbound traffic


## Computer Networks Building Blocks
Lets get started with Computer Networking , or say Basic++

1. OSI Layers of Network - What are 7 OSI Layers, How they interact ? Can you think how these 7 layers help in Security ?
2. See how traffic is initiated , initiated in which OSI Layer ? and how it travels through layers till it reaches the required recipients ? How its decoded at receiving end ? both top to bottom and bottom to top approach.
3. What is TCP/IP Layer of Network ? How it differs from OSI Layers ?
4. What is TCP and UDP ? 
5. How are ports used to establish communication to services ? Basically initiating and listening concept of server client.
6. What is TCP Handshake ? 
7. How / Why TCP Handshake differs from UDP data transfer mechanisms ?
8. TCP vs UDP usage, when/why/where we use TCP or UDP ?
- What are common Network devices like firewalls, load-balancers, Routers Switches, HUBs and more.
- ARP and RARP ( Reverse ARP) Protocols and their use.
- What is Broadcast, Unicast and Multicast, which IP Address are used for these, specially where do we use broadcast ,unicast ,multicast.
- What is loopback IP Address ? How it works in OSI Layer ?
What is Logical addressing and physical addressing 

## DNS + DHCP
Will you remmeber things by IP Address !!

1. What is DNS
2. How is DNS Resolved ?
3. Recursive vs Iterative DNS Resolution
4. What is DNS Exfiltration ?
5. What is DNS Server ?
6. Does DNS Server or provider creates logs ? How can these logs help in Security related tasks ? think of some scenarios.
7. What are different DNS Record types, and their uses .

1. What is DHCP
2. How DHCP Server assigns IP Address to machines?
3. What is Pooled/Reserved or Dynamic DHCP allocation by DHCP Server.?


## Network Unseen (but serious*)

- What is SSL ?
- What is Subnetting ? Why is Subnetting used ? 
- Class of IP Address, Calculating subnets.
- What are VPNs ?
- What is Proxy ?
`Network Address Translation (NAT):` Understand how NAT works and its implications for security.
`Network Interface Cards (NICs):` Understand the role of NICs in connecting devices to a network. While in past we had physical devices in computers, we still use NIC virtually in Virtual machines, on Cloud instances and Networks, so understanding of this clears some concepts.
What is DMZ ? Why/How it is used ?
What is WAF ? on which OSI or TCP/IP Layer it works ?
Can we change port numbers on computer ? What are reserver ports ?




## Network Devices and Components

hub-and-spoke, mesh, and star topologies.

`Routers:` Understand how routers work, their functions, and how they forward packets.

`Switches:` Learn about the functions of switches, how they operate, and the differences between layer 2 and layer 3 switches.

`Firewalls:` Familiarize yourself with the basics of firewalls, their types, and how they work. More in this in later sections, Firewalls are something we see alot in Cyber Security, at various levels.
types of firewall
firewall statefull stateless 
fierwall enough to secure network




`Routing:` Familiarize yourself with static and dynamic routing, routing tables, and routing protocols (e.g., RIP, OSPF).

## Network Security Fundamentals

<b>Network Threats:</b> Learn about common network attacks like MiTM, DDoS...

Network Vulnerabilities: Understand common network vulnerabilities such as unpatched software, misconfigured devices, and weak passwords.

Network Defense Mechanisms: Familiarize yourself with firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS).

Encryption: Learn about encryption basics, including symmetric and asymmetric encryption, and protocols like SSL/TLS.


Network Communication and Protocols

Socket Programming: Understand the basics of socket programming, including TCP and UDP sockets. Just for understanding purpose, no Ph.Ds to be done here.

HTTP and HTTPS: Familiarize yourself with HTTP and HTTPS protocols, including request and response formats. How HTTP/HTTPs Protocol and headers play role in security.

DNS and DNS Security: Understand how DNS works, including DNS records, and common DNS security threats. See how DNS related attacks happen, what can we infer from DNS logs.

Network Architecture and Design

Network Segmentation: Learn about network segmentation, including LAN, VLANs, VPNs, and network isolation. Can this help in some form of security measure ?  Can we segment some users on a LAN and apply some security policy on them ?

Network Architecture: Understand common network architectures, including 

Cloud Computing: Familiarize yourself with cloud computing basics, including IaaS, PaaS, and SaaS models. Why mention cloud here ? Much of the computing and Networking happens on Cloud these days, knowing some basics will help.

## Network Monitoring and Analysis

Network Traffic Analysis: Learn about network traffic analysis, including packet sniffing and protocol analysis.

Network Protocol Analyzers: Familiarize yourself with network protocol analyzers, such as Wireshark




----


## Common Ports and their usage

1. tcp/20 - FTP (active mode data transfer)
2. tcp/21 - FTP (control)
3. tcp/22 - SSH
4. tcp/22 - SFTP
5. tcp/23 - Telnet
6. tcp/25 - SMTP
7. udp/53 - DNS
8. udp/67 udp/68 - DHCP
9. udp/69 - TFTP (Trivial FTP)
10. tcp/80 - HTTP
11. tcp/110 - POP3
12. udp/123 - NTP - Network Time Protocol
13. tcp/143 - IMAP4
14. upd/161 - SNMP
15. tcp/389 - LDAP - Lightweight Directory Access Protocol
16. tcp/443 - HTTPS - HTTP(Secure)
17. tcp/445 - SMB (NetBIOS-Less) - Server Message Block
18. tcp/636 LDAPS - LDAP over SSL
19. tcp/1720 - VoIP using H.323
20. tcp/3389 - RDP - Remote Desktop Protocol
21. tcp/5060 tcp/5061 - Voice over IP(VoIP) using Session Initiation Protocol(SIP)
