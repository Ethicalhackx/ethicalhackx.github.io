---
title: CRTP Notes
publishDate: 2023-09-09
author: Abhinav Kumar
image:   '~/assets/images/bash.jpeg'
excerpt: Linux Privilege Escalation.
draft: true
category: Hacking 101
---

Enumerating Domain with Native Executables and .Net classes
Thesea are in PowerShell.

```powershell
$ADClass = [System.DirectoryServices.ActiveDirectory.Domain]
$ADClass::GetCurrentDomain()
```
We can Use PowerView or ActiveDirectory Module from Microsoft (Using Import-Module)

Microsoft Module also works in Constraint Language mode .


