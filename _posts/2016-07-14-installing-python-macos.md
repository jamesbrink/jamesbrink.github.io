---
layout: single
title: "Installing Python on macOS"
date: 2016-07-14 12:00:00 -0700
author_profile: true
categories: blog
tags: ["Development", "Operating Systems"]
---

# Installing Python on macOS

macOS comes with Python pre-installed, but it's usually an older version. If you're doing development work, you'll likely want to install a newer version and set up a proper development environment.

## Using Homebrew (Recommended)

The easiest way to install Python on macOS is using [Homebrew](https://brew.sh/), a package manager for macOS.

1. First, install Homebrew if you don't have it already:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Then, install Python:

```bash
brew install python
```

This will install the latest version of Python 3.

3. Verify the installation:

```bash
python3 --version
```

## Using pyenv for Multiple Python Versions

If you need to work with multiple Python versions, [pyenv](https://github.com/pyenv/pyenv) is an excellent tool:

1. Install pyenv using Homebrew:

```bash
brew install pyenv
```

2. Add pyenv to your shell:

```bash
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

3. Install a specific Python version:

```bash
pyenv install 3.11.0
```

4. Set a global Python version:

```bash
pyenv global 3.11.0
```

## Setting Up Virtual Environments

For Python development, it's best practice to use virtual environments to isolate project dependencies.

### Using venv (built-in)

Python 3 comes with `venv` for creating virtual environments:

```bash
# Create a virtual environment
python3 -m venv myproject_env

# Activate the environment
source myproject_env/bin/activate

# Deactivate when done
deactivate
```

### Using Poetry (Modern Python Project Management)

[Poetry](https://python-poetry.org/) is a modern tool for Python dependency management and packaging:

1. Install Poetry:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Create a new project:

```bash
poetry new myproject
cd myproject
```

3. Add dependencies:

```bash
poetry add requests
```

4. Activate the virtual environment:

```bash
poetry shell
```

## Conclusion

With Python properly installed and configured with virtual environments, you're ready to start developing Python applications on macOS. This setup ensures you have the right tools to manage dependencies and keep your projects isolated from each other.

Remember that using virtual environments is considered a best practice in Python development, as it helps avoid dependency conflicts between different projects.
