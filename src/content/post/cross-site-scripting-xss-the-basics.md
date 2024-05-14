---
title: "Cross-Site Scripting (XSS) - The Basics"
publishDate: 2021-04-07
updateDate: 2024-05-05
category: WebAppSec
author: Abhinav Kumar
image: '~/assets/images/XSS.jpg'
excerpt: XSS - Cross Site Scripting is an injection attack where users intentionally/unintentionally visit links/URLs containing scripts that execute in the browser.
draft: false
---

XSS - Cross Site Scripting is an injection attack where users intentionally/unintentionally visit links/URLs containing scripts that execute in the browser. Now this script might just throw a popup which is like a welcome message on the website - "Welcome to Ethical Hacking Tutorials" , or maybe a driver of malicious actions like stealing your cookies or redirecting to a phishing page. We will have some idea about the underlying theory that causes XSS, and move towards practical XSS.

### Let's break the above into parts for better understanding.

1. You trust a website you are browsing or a link in email/sms,
2. It is pointing out to another website which you maybe browsing very often or a website which has some offer or maybe just browsing is what you love, you open the link anyway.
3. The browser loads the website you clicked, browser having no method to verify the link was trusted or non-trusted.
4. The website/link you opened had a malicious payload/script (JavaScript), which extracts cookies, or acts as a phishing page, or a keylogger, or redirects you to fake pages, can be a number of things.
5. The extracted data ( session cookies, key-strokes, phishing pages) is sent to attacker/hacker by methods like writing to external domains/websites or maybe in other exploit forms.

### JavaScript is the Culprit ?

Whenever we talk about XSS, we tend to move towards JavaScript, why ? JavaScript is the language of web, specially dynamic web where user-interactions are made possible with JavaScript, the menu and the effects like dropdowns, or validations in forms, all possible with JavaScript.  
No JavaScript is not the culprit, it is lack of sanitization and validations.

### JavaScript Event Handlers

Event Handlers make page more interactive or reactive to events, the events like onclick, onload, onunload, onmouseover, onmouseout. So if any of these event occurs, an action can be associated with this event.  
  

<table><tbody><tr><td><strong>onload</strong></td><td>invokes JavaScript when an element like body/image or page loads</td></tr><tr><td><strong>onunload</strong></td><td>invokes JavaScript right after someone exiting/leaving this page.</td></tr><tr><td><strong>onmouseover</strong></td><td>invokes JavaScript if the mouse passes over some HTML element.</td></tr><tr><td><strong>onmouseout</strong></td><td>invokes JavaScript if the mouse away from some HTML element.</td></tr><tr><td><strong>onclick</strong></td><td>invokes JavaScript when you click some HTML element.</td></tr></tbody></table>

A much more comprehensive list of Event Handlers preset [here, Read more](https://www.javatpoint.com/javascript-events).  
  
For example the page contains onload , when the page/ associated element loads, the event can be used to trigger something. Here I am triggering Welcome message for visitors of my website when body element loads

```javascript
<body onload=alert(‘Welcome to Ethical Hacking Tutorials - learn XSS’)>
```

When the **body** tag **loads**, that is an **event**, and **onload** is **event handler** which responds to event by a **popup (alerting )** - **Welcome to Ethical Hacking Tutorials - learn XSS**.  
Similarly you can think of other event Handlers.

### Types of XSS

- Reflected XSS
- Stored XSS
- DOM (Document Object Model) based XSS

## Reflected XSS - or non-persistence XSS

This type of XSS as name says is reflected but is not persistent. The browser executes injected code without validating the script/code which might be harmful. But the injected code/script is not stored in database or server ( like Stored XSS ). Where do I look for this bug ? Say your search Query box is taking input and same is also reflected on parts of page like - you searched for I want to learn XSS . What if you injected malicious payload with script that reflects back and executes payload(malicious script).  
Input Field :  

![]((/public/images/Reflected_XSS_1.png)

Reflected XSS -1 : The input/payload reflecting back on page

Ok, we being good guys, how can hackers use this maliciously ?  
The payload can be malicious to alert a popup box saying you have been hacked , or can also get your session cookie. See below example.

payload -

```javascript
<script >alert("Welcome to EthicalHackX")</script>
```

![]((/public/images/Reflected_XSS_2.png)

![]((/public/images/Reflected_XSS_3.png)

Or it can be really malicious revealing your secrets like session cookies.

payload -

```javascript
"<script >alert("Welcome to EthicalHackX")</script>
```

![]((/public/images/Reflected_XSS_4.png)

The input is a malicious payload

![]((/public/images/Reflected_XSS_5.png)

Notice the session ID , this can be captured.

Since this is reflected / non-persistence XSS, the page reloads or someone without the link is not affected if no payload injected. How do we proceed ? Well while sharing the links inject the payload in the link itself , see the URL in image above. We can share something like below, , when the user/victims opens the URL , the malicious payload executes.

```html
http://192.168.56.101/dvwa/vulnerabilities/xss_r/?name=%22%3C%2Fscript%3E%3Cscript%3Ealert%28document.cookie%29%3C%2Fscript%3E#
``` 

**Why is this happening ? Source Code Review :**

We can see the user input is taken as passed to browser without sanitization which is very bad practice.

![]((/public/images/Reflected_XSS_6.png)

## Stored XSS / Persistence XSS

Unlike the Reflected XSS, stored XSS is stored in database/server. Whenever you browse the page where the stored payload is appearing, it executes ( if not sanitized ), and boom, again the same thing like above. The difference is hacker does not has to send crafted links, anyone browsing the page sees the same thing, and browser does what it does the best - execute the stored payload on page. Unlike Reflected XSS, the payload does not vanishes if you dont use crafted URL, as it is stored on page already. And you can now distribute the page URL everywhere, post it on groups, social media as some clickbait and see the malicious code do the magic. Lets see by example.

![]((/public/images/Stored_XSS_1-1.png)

![]((/public/images/Stored_XSS_2.png)

## DOM-Based XSS

Document Object Model helps programmers make the HTML more dynamic with JavaScript. HTML Document becomes the Document Object and document acting as root node / owner of all other objects. This enables programmers to change css styles, or insert/remove objects/HTML from page, create events on page, or change attributes.  
While all this benefit the programmer to make a more dynamic page, the same can also be used by attacker/hacker maliciously when the input is not properly sanitized.  
DOM based attacks happen when data is given by attacker controller **source** and passed to **sink** where it is evaluated. **eval()** is universal JavaScript function which support code execution.

Unlike Stored or Reflected XSS, any data/payload is not going to server , but the whole process happens on the client browser itself and hence it is difficult to detect.

DOM Based XSS Example

![]((/public/images/DOM_XSS_1.png)

![]((/public/images/DOM_XSS_2.png)

Ok, Bye Theories, What I do now ?

So from above reading , you now know that you can associate events to response. Say you crafted a URL that is redirecting to fake websites, acting as clickbait, or stealing session cookies ? We will see how to make payloads or beter say bypass the security in place for XSS in next post, we will also learn about how to exploit XSS Vulnerability rather than just throwing random alerts.
