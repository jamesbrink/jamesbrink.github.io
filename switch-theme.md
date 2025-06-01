---
layout: single
title: Theme Switcher
permalink: /switch-theme/
---

# Theme Switcher

This page helps you switch between different themes. Select a theme from the dropdown menu below:

<form method="get" action="/switch-theme/">
  <label for="theme">Choose a theme:</label>
  <select name="theme" id="theme" onchange="this.form.submit()">
    <option value="rose-pine" {% if page.theme == 'rose-pine' %}selected{% endif %}>Rosé Pine Dawn</option>
    <option value="nord" {% if page.theme == 'nord' %}selected{% endif %}>Nord</option>
    <option value="dracula" {% if page.theme == 'dracula' %}selected{% endif %}>Dracula</option>
    <option value="gruvbox" {% if page.theme == 'gruvbox' %}selected{% endif %}>Gruvbox</option>
    <option value="catppuccin-latte" {% if page.theme == 'catppuccin-latte' %}selected{% endif %}>Catppuccin Latte</option>
  </select>
</form>

<script>
// Get theme from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme');

if (theme) {
  // Store theme preference
  localStorage.setItem('preferred-theme', theme);
  
  // Update the theme file being loaded
  document.cookie = `theme=${theme};path=/;max-age=31536000`;
  
  // Redirect to home page with new theme
  window.location.href = '/';
}
</script>