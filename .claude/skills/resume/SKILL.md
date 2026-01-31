---
name: resume
description: Edit and regenerate the PDF resume. Use when the user wants to update resume content, add jobs, modify skills, or regenerate the PDF.
argument-hint: '[action: edit|build|open]'
allowed-tools: Read, Edit, Write, Bash(typst *), Bash(open *)
---

# Resume Management

Source file: `resume/resume.typ` (Typst format)
Output: `public/JamesBrink-Resume.pdf`

## Actions

Based on `$ARGUMENTS`:

- **edit** or no args: Read the source file and help the user make changes
- **build**: Compile the resume to PDF
- **open**: Compile and open the PDF

## Build Command

```bash
typst compile resume/resume.typ public/JamesBrink-Resume.pdf
```

## File Structure

The Typst file has these sections:

- **Header**: Name, tagline, contact info
- **Experience**: Job entries with company, location, role, dates, description
- **Open Source Projects**: Project name, role, description
- **Sidebar**: Contact, Technical Expertise, Education, Languages

## Helper Functions in resume.typ

- `#job(company, location, role, dates)[description]` - Add a job entry
- `#project(name, role, desc)` - Add a project entry
- `#section(title)` - Add a section header
- `#sidebar-entry(title, subtitle)` - Add sidebar item

## When Editing

1. Read `resume/resume.typ` first
2. Make the requested changes
3. Compile with `typst compile resume/resume.typ public/JamesBrink-Resume.pdf`
4. Open with `open public/JamesBrink-Resume.pdf` so user can review

Always preserve the existing style and formatting.
