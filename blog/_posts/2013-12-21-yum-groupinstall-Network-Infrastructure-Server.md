---
layout: post
title: yum groupinstall "Network Infrastructure Server"
subtitle: ""
date: 2013-12-21
author: "James Brink"
header-img: "img/post-bg-01.jpg"
tags:
  - Linux
  - RHEL
  - CENTOS
  - ScientificLinux
  - yum
---
#yum groupinstall "Network Infrastructure Server"#

So when I recently tried to install the Network Infrastructure Server on CENTOS 6.5, yum replied with big "fuck you!".


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

Well that was useful right? When you run a yum groupinfo "Network Infrastructure Server" you will notice there are not mandatory packages, just optional packages.

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

I did do some google searches on this and came up with a few useles answers. In short my final solution was a simple 1 liner: **yum groupinfo "Network Infrastructure Server"|egrep "\s{3}"|xargs yum install -y**

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

	Dependencies Resolved

	===========================================================================================================================================================================
	 Package                                    Arch                              Version                                                Repository                       Size
	===========================================================================================================================================================================
	Installing:
	 bind                                       x86_64                            32:9.8.2-0.17.rc1.el6_4.6                              base                            4.0 M
	 bind-chroot                                x86_64                            32:9.8.2-0.17.rc1.el6_4.6                              base                             71 k
	 bind-dyndb-ldap                            x86_64                            2.3-5.el6                                              base                             69 k
	 dhcp                                       x86_64                            12:4.1.1-38.P1.el6.centos                              base                            817 k
	 dnsmasq                                    x86_64                            2.48-13.el6                                            base                            149 k
	 freeradius                                 x86_64                            2.1.12-4.el6_3                                         base                            1.4 M
	 quagga                                     x86_64                            0.99.15-7.el6_3.2                                      base                            1.1 M
	 radvd                                      x86_64                            1.6-1.el6                                              base                             75 k
	 rsyslog-gnutls                             x86_64                            5.8.10-8.el6                                           base                             27 k
	 rsyslog-gssapi                             x86_64                            5.8.10-8.el6                                           base                             29 k
	 rsyslog-mysql                              x86_64                            5.8.10-8.el6                                           base                             21 k
	 rsyslog-pgsql                              x86_64                            5.8.10-8.el6                                           base                             21 k
	 rsyslog-relp                               x86_64                            5.8.10-8.el6                                           base                             21 k
	 syslinux                                   x86_64                            4.02-8.el6                                             base                            859 k
	 tftp-server                                x86_64                            0.49-7.el6                                             base                             39 k

	Transaction Summary
	===========================================================================================================================================================================
	Install      15 Package(s)

	Total download size: 8.6 M
	Installed size: 22 M
	Downloading Packages:
	(1/15): bind-9.8.2-0.17.rc1.el6_4.6.x86_64.rpm                                                                                                      | 4.0 MB     00:05
	(2/15): bind-chroot-9.8.2-0.17.rc1.el6_4.6.x86_64.rpm                                                                                               |  71 kB     00:00
	(3/15): bind-dyndb-ldap-2.3-5.el6.x86_64.rpm                                                                                                        |  69 kB     00:00
	(4/15): dhcp-4.1.1-38.P1.el6.centos.x86_64.rpm                                                                                                      | 817 kB     00:02
	(5/15): dnsmasq-2.48-13.el6.x86_64.rpm                                                                                                              | 149 kB     00:00
	(6/15): freeradius-2.1.12-4.el6_3.x86_64.rpm                                                                                                        | 1.4 MB     00:03
	(7/15): quagga-0.99.15-7.el6_3.2.x86_64.rpm                                                                                                         | 1.1 MB     00:02
	(8/15): radvd-1.6-1.el6.x86_64.rpm                                                                                                                  |  75 kB     00:00
	(9/15): rsyslog-gnutls-5.8.10-8.el6.x86_64.rpm                                                                                                      |  27 kB     00:00
	(10/15): rsyslog-gssapi-5.8.10-8.el6.x86_64.rpm                                                                                                     |  29 kB     00:00
	(11/15): rsyslog-mysql-5.8.10-8.el6.x86_64.rpm                                                                                                      |  21 kB     00:00
	(12/15): rsyslog-pgsql-5.8.10-8.el6.x86_64.rpm                                                                                                      |  21 kB     00:00
	(13/15): rsyslog-relp-5.8.10-8.el6.x86_64.rpm                                                                                                       |  21 kB     00:00
	(14/15): syslinux-4.02-8.el6.x86_64.rpm                                                                                                             | 859 kB     00:01
	(15/15): tftp-server-0.49-7.el6.x86_64.rpm                                                                                                          |  39 kB     00:00
	---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Total                                                                                                                                      440 kB/s | 8.6 MB     00:19
	Running rpm_check_debug
	Running Transaction Test
	Transaction Test Succeeded
	Running Transaction
	  Installing : 32:bind-9.8.2-0.17.rc1.el6_4.6.x86_64                                                                                                                  1/15
	  Installing : 32:bind-chroot-9.8.2-0.17.rc1.el6_4.6.x86_64                                                                                                           2/15
	  Installing : bind-dyndb-ldap-2.3-5.el6.x86_64                                                                                                                       3/15
	  Installing : rsyslog-pgsql-5.8.10-8.el6.x86_64                                                                                                                      4/15
	  Installing : syslinux-4.02-8.el6.x86_64                                                                                                                             5/15
	  Installing : rsyslog-gssapi-5.8.10-8.el6.x86_64                                                                                                                     6/15
	  Installing : rsyslog-mysql-5.8.10-8.el6.x86_64                                                                                                                      7/15
	  Installing : rsyslog-relp-5.8.10-8.el6.x86_64                                                                                                                       8/15
	  Installing : rsyslog-gnutls-5.8.10-8.el6.x86_64                                                                                                                     9/15
	  Installing : freeradius-2.1.12-4.el6_3.x86_64                                                                                                                      10/15
	  Installing : tftp-server-0.49-7.el6.x86_64                                                                                                                         11/15
	  Installing : dnsmasq-2.48-13.el6.x86_64                                                                                                                            12/15
	  Installing : radvd-1.6-1.el6.x86_64                                                                                                                                13/15
	  Installing : quagga-0.99.15-7.el6_3.2.x86_64                                                                                                                       14/15
	  Installing : 12:dhcp-4.1.1-38.P1.el6.centos.x86_64                                                                                                                 15/15
	  Verifying  : 32:bind-9.8.2-0.17.rc1.el6_4.6.x86_64                                                                                                                  1/15
	  Verifying  : 12:dhcp-4.1.1-38.P1.el6.centos.x86_64                                                                                                                  2/15
	  Verifying  : quagga-0.99.15-7.el6_3.2.x86_64                                                                                                                        3/15
	  Verifying  : radvd-1.6-1.el6.x86_64                                                                                                                                 4/15
	  Verifying  : 32:bind-chroot-9.8.2-0.17.rc1.el6_4.6.x86_64                                                                                                           5/15
	  Verifying  : dnsmasq-2.48-13.el6.x86_64                                                                                                                             6/15
	  Verifying  : tftp-server-0.49-7.el6.x86_64                                                                                                                          7/15
	  Verifying  : freeradius-2.1.12-4.el6_3.x86_64                                                                                                                       8/15
	  Verifying  : rsyslog-gnutls-5.8.10-8.el6.x86_64                                                                                                                     9/15
	  Verifying  : rsyslog-relp-5.8.10-8.el6.x86_64                                                                                                                      10/15
	  Verifying  : rsyslog-mysql-5.8.10-8.el6.x86_64                                                                                                                     11/15
	  Verifying  : rsyslog-gssapi-5.8.10-8.el6.x86_64                                                                                                                    12/15
	  Verifying  : syslinux-4.02-8.el6.x86_64                                                                                                                            13/15
	  Verifying  : bind-dyndb-ldap-2.3-5.el6.x86_64                                                                                                                      14/15
	  Verifying  : rsyslog-pgsql-5.8.10-8.el6.x86_64                                                                                                                     15/15

	Installed:
	  bind.x86_64 32:9.8.2-0.17.rc1.el6_4.6    bind-chroot.x86_64 32:9.8.2-0.17.rc1.el6_4.6    bind-dyndb-ldap.x86_64 0:2.3-5.el6     dhcp.x86_64 12:4.1.1-38.P1.el6.centos
	  dnsmasq.x86_64 0:2.48-13.el6             freeradius.x86_64 0:2.1.12-4.el6_3              quagga.x86_64 0:0.99.15-7.el6_3.2      radvd.x86_64 0:1.6-1.el6
	  rsyslog-gnutls.x86_64 0:5.8.10-8.el6     rsyslog-gssapi.x86_64 0:5.8.10-8.el6            rsyslog-mysql.x86_64 0:5.8.10-8.el6    rsyslog-pgsql.x86_64 0:5.8.10-8.el6
	  rsyslog-relp.x86_64 0:5.8.10-8.el6       syslinux.x86_64 0:4.02-8.el6                    tftp-server.x86_64 0:0.49-7.el6

	Complete!

