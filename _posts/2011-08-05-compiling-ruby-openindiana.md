---
layout: single
title: "Compiling Ruby 1.9.2 on OpenIndiana/OpenSolaris"
date: 2011-08-05 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Development", "Operating Systems"]
---

# Compiling Ruby 1.9.2 on OpenIndiana/OpenSolaris

After fighting for a few hours trying to install RVM (Ruby Version Manager) and Ruby-1.9.2, I thought I would share how I managed to get it done. My environment was a fresh install of OpenIndiana b151, and I was installing into a Solaris container (zone). I chose to install RVM in multi-user mode, but these steps should work the same for single user mode as well. To get started you will need to install the following packages:

```bash
pkg install gawk autoconf gnu-tar gcc-3 gnu-findutils wget git gnu-grep
```

Now follow the usual instructions for installing RVM ([http://beginrescueend.com/rvm/install/](http://beginrescueend.com/rvm/install/)), but be sure to pass the -sk options to curl like so:

```bash
bash < <(curl -sk https://rvm.beginrescueend.com/install/rvm).
```

The -k option tells curl to allow connections to SSL sites without certs. Now I did not bother with fixing the root of this problem as this was a development box and I couldn't care less. There is a post here: [http://stackoverflow.com/questions/6414232/curl-certificate-error-when-using-rvm-to-install-ruby-1-9-2](http://stackoverflow.com/questions/6414232/curl-certificate-error-when-using-rvm-to-install-ruby-1-9-2) that explains the proper way to fix the certificate issues (if you run into this like I did). The method I chose to get around this issue was to simply edit the following file /usr/local/rvm/scripts/fetch and append -k to the curl commands like so:

```bash
vi /usr/local/rvm/scripts/fetch
"fetch_command="curl -k -x${rvm_proxy} -f -L --create-dirs -C - " # -s for silent"
"fetch_command="curl -k -f -L --create-dirs -C - " # -s for silent"
```

Now there is one more crucial piece to this puzzle that you will need to compile Ruby. At the time of this writing OpenIndiana/OpenSolaris are missing a math library that used to be included in SUNWlibm. You can read more about the missing library here: [http://comments.gmane.org/gmane.os.illumos.devel/3001](http://comments.gmane.org/gmane.os.illumos.devel/3001).

The simple way to resolve this issue is by downloading a tar from sun.com, extracting it and manually placing the required header files in your /usr/include.
http://dlc.sun.com/osol/devpro/downloads/20081119/ <--alternative downloads

```bash
wget http://dlc.sun.com/osol/devpro/downloads/20081119/devpro-libm-src-20060131.tar.bz2
#Extract the tar file and copy the contents from tar file like so
tar xfvj devpro-libm-src-20060131.tar.bz2
cp -r ./usr/src/libm/inc/* /usr/include/
```

You should now be ready to log out and back in, and issue rvm install ruby-1.9.2 (or whatever version you would like).
Everything compiled fine for me after this. Good luck.
