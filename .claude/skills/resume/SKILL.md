---
name: resume
description: Edit and regenerate the PDF resume. Use when the user wants to update resume content, add jobs, modify skills, or regenerate the PDF.
argument-hint: '[full|condensed] [edit|build|open]'
allowed-tools: Read, Edit, Write, Bash(typst *), Bash(open *), Bash(cp *)
---

# Resume Management

## Templates

| Template  | Source                        | Output                                   | Pages |
| --------- | ----------------------------- | ---------------------------------------- | ----- |
| Full      | `resume/resume.typ`           | `public/JamesBrink-Resume.pdf`           | 2     |
| Condensed | `resume/resume-condensed.typ` | `public/JamesBrink-Resume-Condensed.pdf` | 1     |

## Usage

`/resume [template] [action]`

**Templates:** `full` (default), `condensed`
**Actions:** `edit` (default), `build`, `open`

Examples:

- `/resume` — Edit full resume
- `/resume condensed` — Edit condensed resume
- `/resume build` — Build full resume
- `/resume condensed build` — Build condensed resume
- `/resume open` — Build and open full resume
- `/resume condensed open` — Build and open condensed resume

## Build Commands

```bash
# Full (2-page)
typst compile resume/resume.typ public/JamesBrink-Resume.pdf

# Condensed (1-page)
typst compile resume/resume-condensed.typ public/JamesBrink-Resume-Condensed.pdf
```

## Helper Functions

Both templates use:

- `#job(company, location, role, dates)[description]` — Job entry
- `#project(name, role, desc)` — Project entry
- `#section(title)` — Section header
- `#sidebar-entry(title, subtitle)` — Sidebar item

## Workflow

1. Read the appropriate `.typ` file
2. Make requested changes
3. Compile to PDF
4. Open for review

When editing content that applies to both (new job, updated skills), update both templates.
