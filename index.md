---
layout: default
title: James Brink
---

<h2>Blog Posts</h2>
<ul class="post-list list-unstyled">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}"><span class="date">{{ post.date }}</span> {{post.title}}</a>
    </li>
  {% endfor %}
</ul>
