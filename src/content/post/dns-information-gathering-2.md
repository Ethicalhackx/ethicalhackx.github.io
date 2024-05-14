---
title: DNS Information Gathering
publishDate: 2017-02-13
category: Offensive
image:   '~/assets/images/dns-and-ipv6.jpg'
author: Abhinav Kumar
excerpt: DNS Enumeration
---

In this tutorial we will gather DNS information about our target.

But before starting with basics of DIG we must know different types of DNS records.

The following list describes the common DNS record types and their use:

**A (Address)** Maps a hostname to an IP address

**SOA (Start of Authority)** Identifies the DNS server responsible for the domain information

**CNAME (Canonical Name)** Provides additional names or aliases for the address record

**MX (Mail Exchange)** Identifies the mail server for the domain

**SRV (Service)** Identifies services such as directory services

**PTR (Pointer)** Maps IP addresses to hostnames

**NS (Name Server)** Identifies other name servers for the domain

**AXFR (Zone Tranfer)** Can leak all the Sub-Domain Names registered for the domain

To install it on Windows: 1) Go to [ftp://ftp.isc.org/isc/bind9/9.5.0-P2/](ftp://ftp.isc.org/isc/bind9/9.5.0-P2/) 2) Download [BIND9.5.0-P2.zip](ftp://ftp.isc.org/isc/bind9/9.5.0-P2/BIND9.5.0-P2.zip) 3) Open the archive with WinZip 4) Extract dig.exe, libbind9.dll, libdns.dll, libisc.dll, libisccfg.dll, liblwres.dll to c:\\windows\\system32

DIG Syntax **DIG**

Now to get the information on all of these records at once we can use ANY keyword. As shown below **DIG ANY <domain>**

If you want to get NS records for the domain then you can go for the given query **DIG NS <domain>**

In the same manner you have to change the option to get different records. **DIG <option> <domain>**

 

Read More on Information Gathering

[Information Gathering with Fierce](https://ethicalhackx.com/information-gathering-fierce/)

[Information Gathering with online websites](https://ethicalhackx.com/information-gathering-online-websites/)

[Information Gathering with NMAP](https://ethicalhackx.com/information-gathering-nmap/)

[Reverse IP Lookup - How To Find Other Websites on Same Server](https://ethicalhackx.com/reverse-ip-lookup-find-websites-server/)
