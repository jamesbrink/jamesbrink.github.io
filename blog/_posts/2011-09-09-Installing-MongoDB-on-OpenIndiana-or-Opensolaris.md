---
layout: post
title: Installing MongoDB on OpenIndiana/OpenSolaris
date: 2011-09-09
tags:
  - OpenIndiana
  - MongoDB
---
#Installing MongoDB on OpenIndiana/OpenSolaris

Okay so installing MongoDB on OpenIndiana was a few more steps than I would have expected. I figured I should share my process of installing MongoDB in hopes it will help any others who have issues with the install. When I initially downloaded MongoDB I realized right away that it would not run on my system(OpenIndiana build 151).When I attempted to run any of the MongoDB binaries I got the following result: "**ld.so.1: mongod: fatal: libstdc++.so.6: open failed: No such file or directory**"


The following instructions assume installation to /opt/mongodb, but obviously you can use any path you like.

Download MongoDB:
[http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)

Download mongo-extra package:
[http://www.mongodb.org/display/DOCS/Joyent](http://www.mongodb.org/display/DOCS/Joyent)

At the time of this writing version 2.0.0-rc2 was available so I used this.

Here is my complete list of commands, explained below.

    pkg install wget pkg:/developer/object-file
    wget http://fastdl.mongodb.org/sunos5/mongodb-sunos5-x86_64-2.0.0-rc2.tgz
    mkdir /opt/mongodb
    tar xfv mongodb-sunos5-x86_64-2.0.0-rc2.tgz
    mv mongodb-sunos5-x86_64-2.0.0-rc2/bin /opt/mongodb/
    curl -O http://downloads.mongodb.org.s3.amazonaws.com/sunos5/mongo-extra-64.tgz
    mkdir /opt/mongodb/lib
    tar xfv mongo-extra-64.tgz
    mv mongo-extra-64/* /opt/mongodb/lib/
    cd /opt/mongodb/bin/
    for x in ./*; do elfedit -e 'dyn:runpath $ORIGIN/../lib' $x;done


So first I download and install wget and **pkg:/developer/object-file**. The object-file package has a utility called **elfedit** which
we will need to properly link the MongoDB binaries to libraries found here: [http://www.mongodb.org/display/DOCS/Joyent](http://www.mongodb.org/display/DOCS/Joyent)
Once we have placed the files in /opt/mongodb/bin & /opt/mongodb/lib we run a for loop on all of the binaries in /opt/mongodb/bin and adjust the runpath to point to /opt/mongodb/lib. I found information on this little utility from a great blog here: [http://blogs.oracle.com/ali/entry/avoiding_ld_library_path_the](http://blogs.oracle.com/ali/entry/avoiding_ld_library_path_the).
Good luck.
