---
layout: post
title: Installing Python via Homebrew on MacOS Sierra 10.12 (Developer Preview) 
date: 2016-07-14
author: "James Brink"
tags:
  - MacOs
  - Python
---
# Installing Python via Homebrew on MacOS Sierra 10.12 (Developer Preview) 

For anyone installing Python 2.7 via Homebrew on the new MacOS Sierra Developer preview, you may run into compilation failure during the build of component (PythonLauncher). I quickly ran through the open issues and pull requests and did not see any fixes on Github. If you are like me and do not require this component the quick workaround is as follows.

**brew edit python**

Simply comment out the *with-tcl-tk* option.

```
# Please don’t add a wide/ucs4 option as it won’t be accepted.
# More details in: https://github.com/Homebrew/homebrew/pull/32368
option :universal
option “with-quicktest”, “Run `make quicktest` after the build (for devs; may fail)”
# option “with-tcl-tk”, “Use Homebrew’s Tk instead of OS X Tk (has optional Cocoa and threads support)”
option “with-poll”, “Enable select.poll, which is not fully implemented on OS X (https://bugs.python.org/issue5154)"
```

![screenshot](/assets/blog/python-macos.png)


If anyone has a better fix for this at the moment please let me know, hopefully it will be updated soon. When time permits I will look for a better solution.
