---
layout: single
title: "10 Things I Hate About NixOS"
date: 2025-03-27 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Infrastructure", "Operating Systems"]
---

# 10 Things I Hate About NixOS

_By James Brink, Tinkerer of Terror_

It's been about 9 months since I finally succumbed to the peer pressure and dove into the world of NixOS. As someone who has been in this industry for decades, you'd think I'd know better than to complicate my life with yet another overhyped tech fad. But here we are. Let me share the 10 things I hate about NixOS (and why I'm still using it anyway).

## 1. I hate your documentation

For years, I visited the NixOS website and left more confused than when I arrived. What the hell is Nix? What's NixOS? Remind me again what "Declarative" means? 😂 I thought all packages were "declared" at some point! What problem does it even solve? The documentation seems written exclusively for people who already understand it. Classic catch-22 that sent my ADHD brain spinning in circles every time.

Oh, I'm sorry—I got the website confused with the non-existent documentation... or maybe users should be using [https://nixos.wiki/](https://nixos.wiki/) or is it [https://wiki.nixos.org/](https://wiki.nixos.org/)? Like, come on, let's be vague and confusing and then make sure there are TWO damn wikis. Nothing says "user-friendly" like a documentation treasure hunt that starts with "which wiki is the real wiki?"

## 2. I hate your smug evangelists

Nothing breaks a man like relentless peer pressure. I finally cracked in mid-2024 when I was neck-deep in an Ansible project for Windows home computers (don't ask). Some infrastructure nerd wouldn't shut up about provisioning Headscale with NixOS and "never going back." That was the final straw – I fired up a VM just to make them stop talking.

## 3. I hate your learning curve

I'll admit it: I brute-forced my way through learning NixOS. My patience has limits, and NixOS found them all. I leaned on AI more than I care to admit just to make progress. The number of times I stared blankly at incomprehensible error messages made me question my decades of experience. Not my proudest moment. I quickly learned I can just copy and paste my errors into AI for translations 😂 — the modern version of using Google Translate for ancient hieroglyphics.

## 4. I hate your overambitious templates

Starting with that massive GitHub template ([https://github.com/dustinlyons/nixos-config](https://github.com/dustinlyons/nixos-config)) was like trying to learn swimming by being dropped in the Mariana Trench. Sure, it handles nix-darwin, home-manager, and NixOS beautifully – if you already know what any of that means. My macOS configuration is still a horrifying disaster I'm afraid to touch, a time bomb of my own creation.

(Side note: It actually is a fantastic project that's saved countless engineers hours of setup time—if you already know what you're doing. For NixOS beginners like me, it's like being handed the controls to a fighter jet when you've only ever driven a golf cart.)

```nix
# My first NixOS config looked something like this:
{ config, pkgs, ... }: {
  # Copied from template, no idea what it does
  # But removing it crashed everything
  # ...500 more lines of mystery...
}
```

## 5. I hate your ZFS integration

I nearly had a heart attack when my ZFS setup almost collapsed on itself. Pro tip: don't declare datasets in your config before actually creating them in the pool. Nothing like staring into the abyss of potential data loss to make you appreciate a working rescue shell. Or maybe I should have read those confusing non-existent docs from one of the two wikis 😂 — if only I knew which one was canonical this time!

## 6. I hate explaining you to others

"So, it's like a declarative, functional package manager that builds reproducible systems from a purely functional language that..." _watches eyes glaze over_ "...it's like Git for your entire operating system." I can't even explain NixOS to other engineers without sounding like I've joined a cult. Which, to be fair, I probably have.

## 7. I hate your error messages

The irony isn't lost on me that I fled Ansible's incomprehensible error messages only to embrace NixOS's equally baffling ones. It's like trading a flip phone for a smartphone but they both speak Klingon.

## 8. I hate how addictive you are

In a few short weeks, I went from "what is this nonsense?" to provisioning production servers with monitoring, networking, and Headscale – all while cackling maniacally about the poor soul who'd eventually inherit my work. Sink or swim, buddy! Learn Nix or find another job!

## 9. I hate how it exposes my impatience

NixOS forces you to slow down and understand what's happening under the hood. For someone who likes immediate results (hello, fellow ADHD engineers), this is both torture and, ultimately, salvation. I hate that it's good for me.

## 10. I hate that I can't go back

The most frustrating thing about NixOS? It's like herpes—once you get it, you can't un-get it. The frustrations pale in comparison to the alternatives. Ansible has its place, but after experiencing the reproducibility and reliability of NixOS, going back feels like trading in power tools for a rock tied to a stick.

As I deployed NixOS across all my personal machines and servers, I realized something: it's not that NixOS is perfect – it's that everything else now feels fundamentally broken by comparison.

To quote a wise teenager from the 90s: "But mostly I hate the way I don't hate you. Not even close, not even a little bit, not even at all."

---

_If you're considering NixOS, start basic. Don't be like me and dive into the deep end with template configurations you don't understand. And when you inevitably ignore this advice, remember: the rescue shell is your friend._
