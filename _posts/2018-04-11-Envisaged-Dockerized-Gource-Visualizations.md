---
layout: post
title: 
subtitle: ""
date: 2018-04-11
author: "James Brink"
tags:
  - docker
  - visualization
  - gource
---
# Envisaged — Easy Data Visualizations using Dockerized Gource

Recently I have been doing a lot of data visualizations using Gource ([http://gource.io/](http://gource.io/)). This is an awesome open source tool created to visualize source code repositories and their evolution over time. If you’re not familiar with it check it out and just do a quick search on YouTube for “Gource” and you will come across a handful of videos.  

I had been getting a lot of requests recently to generate similar videos for various projects. Gource runs great when you run it interactively, but when combined with a tool like FFmpeg, you can quickly bring your machine to a crawl. This was a problem I was facing, and it was further compounded by the fact that I was creating 4k videos at 60fps on a dated MacBook Pro. Thus I set out to figure out how I could run this in the cloud, specifically an ec2 instance and free up my laptop from the constant abuse of encoding 4k videos.  

A quick Google search turned up a handful of “headless” docker containers for Gource. Every one I found had 2 major issues for my use case.  

1. Nearly all of them had a tendency to create either raw, or lossless videos consuming 100’s of GB on disk.
2. Although they were all headless, they all still required a GPU to render the OpenGL.  

It was obvious I needed to create my own container to get this accomplished. I was able to overcome the GPU issue by building the **Mesa3d llvmpipe** driver ([https://www.mesa3d.org/llvmpipe.html](https://www.mesa3d.org/llvmpipe.html)) combined with **Xvfb** which allows us to render OpenGL on the CPU. This is definitely a hit in performance, but solves the big issue of requiring a GPU. In addition to this I use named pipes between my Gource process and FFmpeg, this alleviates the issue with the disk consumption.

What I finally ended up with was two Docker images, the first one I use as a base image, so anyone can easily extend off of it.  

