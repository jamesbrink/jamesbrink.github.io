---
layout: single
title: "yum groupinstall \"Network Infrastructure Server\""
date: 2013-12-21 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Operating Systems"]
---

# yum groupinstall "Network Infrastructure Server"

So when I recently tried to install the Network Infrastructure Server on CentOS 6.5, yum replied with a rather unhelpful error message.

```bash
[root@localhost ~]# yum groupinstall "Network Infrastructure Server"
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: ftp.osuosl.org
 * extras: mirrordenver.fdcservers.net
 * updates: mirrordenver.fdcservers.net
Setting up Group Process
Checking for new repos for mirrors
Warning: Group network-server does not have any packages.
No packages in any requested group available to install or update
```

Well that was useful right? When you run a yum groupinfo "Network Infrastructure Server" you will notice there are not mandatory packages, just optional packages.

```bash
[root@localhost ~]# yum groupinfo "Network Infrastructure Server"
Loaded plugins: fastestmirror
Setting up Group Process
Loading mirror speeds from cached hostfile
 * base: ftp.osuosl.org
 * extras: mirrordenver.fdcservers.net
 * updates: mirrordenver.fdcservers.net

Group: Network Infrastructure Server
 Description: Servers for core network protocols and services, such as DHCP or DNS.
 Optional Packages:
   bind
   bind-chroot
   bind-dyndb-ldap
   dhcp
   dnsmasq
   freeradius
   quagga
   radvd
   rsyslog-gnutls
   rsyslog-gssapi
   rsyslog-mysql
   rsyslog-pgsql
   rsyslog-relp
   syslinux
   tftp-server
```

I did some Google searches on this and came up with a few unhelpful answers. In short, my final solution was a simple one-liner: **yum groupinfo "Network Infrastructure Server"|egrep "\s{3}"|xargs yum install -y**

```bash
[root@localhost ~]# yum groupinfo "Network Infrastructure Server"|egrep "\s{3}"|xargs yum install -y
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: ftp.osuosl.org
 * extras: mirrordenver.fdcservers.net
 * updates: mirrordenver.fdcservers.net
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package bind.x86_64 32:9.8.2-0.17.rc1.el6_4.6 will be installed
---> Package bind-chroot.x86_64 32:9.8.2-0.17.rc1.el6_4.6 will be installed
---> Package bind-dyndb-ldap.x86_64 0:2.3-5.el6 will be installed
---> Package dhcp.x86_64 12:4.1.1-38.P1.el6.centos will be installed
---> Package dnsmasq.x86_64 0:2.48-13.el6 will be installed
---> Package freeradius.x86_64 0:2.1.12-4.el6_3 will be installed
---> Package quagga.x86_64 0:0.99.15-7.el6_3.2 will be installed
---> Package radvd.x86_64 0:1.6-1.el6 will be installed
---> Package rsyslog-gnutls.x86_64 0:5.8.10-8.el6 will be installed
---> Package rsyslog-gssapi.x86_64 0:5.8.10-8.el6 will be installed
---> Package rsyslog-mysql.x86_64 0:5.8.10-8.el6 will be installed
---> Package rsyslog-pgsql.x86_64 0:5.8.10-8.el6 will be installed
---> Package rsyslog-relp.x86_64 0:5.8.10-8.el6 will be installed
---> Package syslinux.x86_64 0:4.02-8.el6 will be installed
---> Package tftp-server.x86_64 0:0.49-7.el6 will be installed
--> Finished Dependency Resolution
```

This command successfully installs all the optional packages from the "Network Infrastructure Server" group.
