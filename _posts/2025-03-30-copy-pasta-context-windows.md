---
layout: single
title: "Forking Around: Copy-Pasta - The ADHD Engineer's Guide to Massive Context Windows"
excerpt: "How I leverage Gemini's massive context window to review entire codebases and save my ADHD brain from project chaos."
date: 2025-03-30 12:00:00 -0700
author_profile: true
categories: blog
tags: ["AI & Automation", "Development"]
series: "Forking Around"
seriesOrder: 1
---

# Forking Around: Copy-Pasta

## The ADHD Engineer's Guide to Massive Context Windows

_By James Brink, "SRE" and Tinkerer of Terror_

Welcome to "Forking Around" - a new series where I'll be documenting my chaotic workflows and methodology as I stumble through the brave new world of AI. Consider this my public therapy session for dealing with the constant existential crisis of being an SRE in 2025. And yes, I'm fully aware this is the first post in what will inevitably become yet another abandoned project that I'll rediscover six months from now and think, "Oh yeah, I was totally going to do that regularly." Let's all pretend I'll actually maintain this series for more than two posts.

## When Your ADHD Brain Meets AI

I'll be honest - I rarely write Python these days because I'm project-hopping between Terraform, Ansible 🤮, NixOS, and all kinds of other shit that keeps my ADHD brain sufficiently distracted from dusk till dawn. So when I started working on my first [model context protocol server](https://github.com/utensils/mcp-nixos) recently, I was basically dusting off cobwebs in my brain while trying not to write code that would make junior devs point and laugh. Like any self-respecting engineer with commitment issues to any single technology stack, I immediately reached for AI assistance. Trust me, I am not concerned about being a great developer lol.

But here's where I hit a wall that every engineer working with AI has encountered: context limitations. You know the drill - you're trying to review your growing codebase, but your AI agent is stuck in a perpetual state of amnesia, forgetting what it wrote where. It's like trying to explain your infrastructure to a new hire who keeps forgetting how SSH works.

## Enter Gemini's Ridiculous Context Window

That's when I stumbled upon the totally obvious fact that Gemini's new 2.5 pro model can have a benefit to me.

Why is this a game-changer for me? Because I can take my entire small/medium project and yeet that fucker ALL into a single prompt. No more fragmented reviews or AI amnesia (I hope). With the entire codebase visible at once, the LLM can actually see the mess I have been brewing locally.

### My new workflow looks something like this:

1. Write mediocre code locally with my AI sidekick - let's not kid around, I might have written the README.md, and that's a lie too
2. Realize things are getting unwieldy
3. Export codebase to prompt format
4. Dump into Gemini
5. Get a comprehensive review that catches all the stupid stuff
6. Fix said stupid stuff by passing it right back into the Agent that made the mess to begin with
7. Repeat until code is marginally acceptable

## The Tools That Make This Work

I've been using two tools to prep my code for these mega-reviews:

1. **RepoPrompt** ([https://repoprompt.com/](https://repoprompt.com/)) - A GUI tool that's perfect for Mac users or those allergic to the command line. I liked it enough to grab a subscription, so shout out to that dev.
2. **code2prompt** ([https://github.com/mufeedvh/code2prompt](https://github.com/mufeedvh/code2prompt)) - Just discovered this one after RepoPrompt. Likely will be my go-to moving forward because I already have an ungodly amount of apps running constantly.

Both these tools can help you do the same thing, with Repo Prompt having far more features that I might never need: help you gather all your code into a format you can paste into Gemini's prompt. Your browser will hate you for it (seriously, it gets hella sluggish with larger codebases), but your future self will thank you.

## Real Benefits I've Seen

In my first 48 hours of using this approach, I've already seen some serious wins:

1. **Quick refactoring validation** - When I knew my flat directory structure wasn't going to last, Gemini confirmed my suspicions and suggested a better structure while ensuring package names, modules, and implementation details all remained consistent.
2. **Catching architectural nonsense** - With the entire codebase in context, Gemini can spot inconsistencies across files that might be missed when reviewing isolated chunks of code.
3. **Time savings** - Instead of manually poring through files to ensure my code isn't trash, I can get a detailed report on the entire codebase in minutes.

## Avoiding the AI Death Spiral

Now a word of caution for those of you diving into "vibe coding" (a term I refuse to embrace, despite my clear dependence on AI tools). There's a dangerous cycle that happens when you take your hands completely off the wheel:

We all know this story: the AI implements something, realizes it doesn't work, unimplements it, implements it again slightly differently, with the exception of the AI agents that leverage memory and hilariously re-implement the exact bad solution. Looking at you Windsurf ❤️, all the while leaving a trail of unreachable code, broken tests, mock data where it shouldn't be and a mountain of absolutely stupid shell scripts nobody asked for when using Claude 3.7. Soon you've got a codebase that resembles the aftermath of a [Soup Kitchen](https://www.urbandictionary.com/define.php?term=Soup%20Kitchen).

This workflow isn't about replacing your brain - I will cover that in a future post - it's about augmenting it. Use the massive context window to get a 10,000-foot view of your code and create a solid feedback loop, then apply your own judgment to the recommendations.

## The Misconception About AI and Coding

There's this persistent idea floating around that AI can only write bad code and isn't truly useful for "real" engineering work. I don't buy it. What I've found is that AI tools let me focus more on product or feature-based thinking while relaxing some of the low-level implementation details.

Is it perfect? Hell no. It will still miss trivial shit that any junior dev would catch. But as another tool in the toolkit? It's proving to be invaluable - especially for someone like me who's constantly context-switching between projects and technologies thanks to my ADHD brain's inability to focus on any one thing for more than 37 seconds.

## Current Limitations and Future Thoughts

This workflow is absolutely nothing groundbreaking, and is still new to me - as I have only been using it the last two days, but I'm already seeing a big fellow value that I wanted to share it with fellow tinkerers who might benefit.

Some limitations to be aware of:

- The approach works best for small to medium-sized projects (my current context size is around 300,000 tokens)
- For larger projects, you'll need to be more selective about which parts you analyze together
- Gemini is currently free on the website (probably because it's experimental), but that might change... no clue because you know I am too lazy to go read their docs 😂

---

_If you've got your own AI workflows that have saved your dignity (or at least made your code marginally less embarrassing), drop me a line. My ADHD brain will probably forget it immediately, but it'll make for great content in future installments of "Forking Around."_
