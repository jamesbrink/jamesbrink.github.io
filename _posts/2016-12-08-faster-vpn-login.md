---
layout: single
title: "Faster VPN Login"
date: 2016-12-08 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Security"]
---

# Faster VPN Login

## For the ADHD and impatient

![logo](/assets/blog/rsa-logo.png)

So I've been going through some of my old scripts and projects from my time at GoDaddy, finding all kinds of neat stuff, most of which I never finished. There was a time where I was doing a significant amount of my work remotely. Being in operations it was important for me to be connected and available.

Like many other corporate networks, GoDaddy used a VPN with an RSA-SecureID token. Now if I had to close my laptop, or maybe wandered away from WiFi briefly, I had to re-launch the SecureID application, re-enter my PIN, reconnect and enter the time-sensitive password provided. I am the most impatient person I know, furthermore the SecureID client had a tendency of hanging… pretty much all the time it sucked. The following is a quick little script I hacked together to allow me to re-connect to the corporate VPN much faster. The script is made possible by an awesome project called stoken — Software Token for Linux/UNIX ([https://github.com/cernekee/stoken](https://github.com/cernekee/stoken)).

Below is the gist of the script, feel free to clean it up and submit any modifications. This thing was a life saver for me.

[https://gist.github.com/jamesbrink/115a16bc2aecac4bcc4d57c843124d74](https://gist.github.com/jamesbrink/115a16bc2aecac4bcc4d57c843124d74)

```shell
vpn(){
  if [ -z $1 ]; then
  	echo "Usage: vpn [PIN]"
  	return 128
  else
  	scutil --nc start "GoDaddy Corp VPN"
  	password=`echo $1|stoken|grep '^\d'|tr -d '\n'`
  	sleep 2
  	osascript -e "tell application \"System Events\" to keystroke \"$password\""
  	osascript -e "tell application \"System Events\" to keystroke return"
  fi
}
```

![demo](/assets/blog/fast-vpn-login.gif)
