---
title: "How to Convert SID to Username and Vice Versa"
publishDate: 2016-12-05
category: Hacking 101
image:   '~/assets/images/powershellgetuser.jpg'
excerpt: Convert SID to Username and Vice-Versa.
author: Abhinav Kumar
---

In Windows , each domain and local user, a group or other security objects are assigned a unique identifier — **Security Identifier** or **SID**. It is an SID, but not the user name, that is used to control access to different resources: network shares, registry keys, file system objects, etc. We now learn to get SID by username and the reverse procedure – how to determine Windows username by SID.

To translate username to SID you can use an excellent tool from Sysinternals kit — [PsGetSid](https://technet.microsoft.com/en-us/sysinternals/bb897417.aspx). But you will have to download it and install on each computer manually.

It’s much easier to use the command prompt or Powershell script.

## How to Get SID of a Local User

To get the SID of the local account on a given computer, you may use **wmic** to get access to the WMI storage. For a local user test\_user, the command will look like this:

```
wmic useraccount where name='test_user' get sid
```
![wmic useraccount where name='test_user' get sid](~/assets/images/wmic-useraccount-get-sid.jpg)

In this example, the user SID is S-1-5-21-1175659216-1321616944-201305354-1005

If you need to get the SID of the current user, run the following command:

```
wmic useraccount where name='%username%' get sid
```
In PowerShell, the script returning the same result can be written using two classes SecurityIdentifier and NTAccount.

```
$objUser = New-Object System.Security.Principal.NTAccount("LOCAL_USER_NAME") $strSID = $objUser.Translate([System.Security.Principal.SecurityIdentifier]) $strSID.Value
```
## How to Convert Domain UserName to SID

The following command can be used to get an SID of the current domain account:

```
whoami /user
```
![whoami /user](~/assets/images/whoami-user.jpg)

To get an SID of a domain user, you can use [Get-ADUser](http://woshub.com/get-aduser-getting-active-directory-users-data-via-powershell/) cmdlet being a part of Active Directory Module for Windows PowerShell.

```
Get-ADUser -Identity 'jabrams' | select SID
```
![Get-ADUser select SID](~/assets/images/Get-ADUser-select-SID.jpg)

If you don’t have the AD Module for PowerShell, you can request data from the domain using PowerShell as follows:

```
$objUser = New-Object System.Security.Principal.NTAccount("corp.woshub.com","jabrams") $strSID = $objUser.Translate([System.Security.Principal.SecurityIdentifier]) $strSID.Value
```
![System.Security.Principal.SecurityIdentifier](~/assets/images/System.Security.Principal.NTAccount.jpg)

The same command in one line:

```
(new-object security.principal.ntaccount “jabrams").translate([security.principal.securityidentifier])
```
## How to Convert a SID to User Name

To get the name of the user account by the SID (a reverse procedure), you can use one of the following commands:

```
wmic useraccount where sid='S-1-3-12-12451234567-1234567890-1234567-1434' get name
```
In PowerShell using AD Module for PowerShell:

```
Get-ADUser -Identity S-1-3-12-12451234567-1234567890-1234567-1434
```

Or like this:

```
$objSID = New-Object System.Security.Principal.SecurityIdentifier ("S S-1-3-12-12451234567-1234567890-1234567-1434") $objUser = $objSID.Translate( [System.Security.Principal.NTAccount]) $objUser.Value
```