---
title: Splunk for Security Analysts / Engineers
publishDate: 2024-05-20
updateDate: 2024-05-20
author: Abhinav Kumar
image:   '~/assets/images/roadmap.jpg'
excerpt: Getting started with Splunk for SOC / Security Engineers
draft: False
category: SOC
tags:
    - SOC Analyst
    - Security Engineer
    - DFIR
    - roadmap
    - Splunk
    - SIEM

---

Shortest path to get into Cyber Security (SOC) is knowledge of one of the SIEM Tools,
Lets see Splunk for that matter which is I guess the most widely used SIEM solution.

Worried about cost ? Lets focus onlearning thorught the Trial Splunk Setup.

### Table of Contents

## Splunk Instalation

in Docker Container - 
```bash
docker run -d -p 8000:8000 -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_PASSWORD=<FILLINAPASSWORDANDDONTFORGETIT>" --name splunk splunk/splunk:latest```