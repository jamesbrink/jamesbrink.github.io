---
layout: single
title: "Using MySQL Workbench with a remote OpenIndiana/OpenSolaris host"
date: 2011-08-06 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Databases", "Operating Systems"]
---

# Using MySQL Workbench with a remote OpenIndiana/OpenSolaris host

For anyone having issues connecting the MySQL Workbench via SSH Tunnel to an OpenIndiana/OpenSolaris host with error messages like:

```
"Error connecting SSH tunnel: Incompatible ssh server (no acceptable ciphers)".
```

This is actually an easy fix. Checking the `/var/adm/messages` file you will see something like:

```
Aug 6 07:06:21 db01 sshd[7090]: [ID 800047 auth.crit] fatal: Client and server could not agree on a common cipher: client "aes128-cbc,blowfish-cbc,aes256-cbc,3des-cbc", server "aes128-ctr,aes192-ctr,aes256-ctr,arcfour128,arcfour256,arcfour". The server cipher list can be controlled using the "Ciphers" option, see sshd_config(4) for more information.
```

Here is the easy fix.

**/etc/ssh/sshd_config**

```
Ciphers aes128-cbc,blowfish-cbc,aes256-cbc,3des-cbc
```

**svcadm restart ssh** and that's it!
