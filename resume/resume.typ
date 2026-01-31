// James Brink Resume
// Compile: typst compile resume.typ ../public/JamesBrink-Resume.pdf

#let accent = rgb("#2563eb")
#let dark = rgb("#18181b")
#let muted = rgb("#71717a")

#set document(title: "James Brink - Resume", author: "James Brink")
#set page(paper: "us-letter", margin: (x: 0.5in, y: 0.5in))
#set text(font: "Georgia", size: 10pt, fill: dark)
#set par(justify: true, leading: 0.65em)
#set text(hyphenate: false)

// Section header
#let section(title) = {
  v(12pt)
  text(fill: accent, weight: "bold", size: 10pt, tracking: 0.08em, upper(title))
  v(4pt)
}

// Job entry
#let job(company, location, role, dates, body) = {
  v(8pt)
  grid(
    columns: (1fr, auto),
    [*#company*, #location], text(fill: muted, size: 9pt)[#dates]
  )
  text(style: "italic", fill: accent, size: 10pt)[#role]
  v(4pt)
  text(size: 9.5pt)[#body]
}

// Project entry
#let project(name, role, desc) = {
  v(6pt)
  [*#name* #h(4pt) #text(style: "italic", fill: muted, size: 9pt)[— #role]]
  linebreak()
  text(size: 9pt, fill: muted)[#desc]
}

// Sidebar entry
#let sidebar-entry(title, sub) = {
  v(4pt)
  text(weight: "bold", size: 9.5pt)[#title]
  linebreak()
  text(size: 9pt, fill: muted)[#sub]
}

// === HEADER ===
#grid(
  columns: (1fr, auto),
  [
    #text(font: "Georgia", size: 36pt, weight: "regular")[James Brink]
    #v(6pt)
    #text(size: 10pt, fill: muted)[
      I specialize in infrastructure as code, AI/ML integration, and building highly efficient, fault-tolerant environments using modern DevOps practices.
    ]
  ],
  align(right)[
    #set text(size: 9.5pt)
    Phoenix, AZ \
    *(480) 410-1846* \
    #link("mailto:brink.james@gmail.com")[brink.james\@gmail.com]
  ]
)

#v(8pt)
#line(length: 100%, stroke: 0.5pt + rgb("#e4e4e7"))
#v(4pt)

// === MAIN CONTENT ===
#grid(
  columns: (1fr, 170pt),
  column-gutter: 20pt,
  [
    // Experience
    #section("Experience")

    #job("Infosys, iCETS Department", "Remote", "Technology Architect", "Oct 2023 - Present")[
      Technology Architect in R&D-focused department, incubating NextGen services and offerings. Building technology capabilities to accelerate innovation in AI & ML, cloud technologies, and advanced analytics. Pioneering agentic AI workflows and LLM tooling integration.
    ]

    #job("Quantierra", "Remote", "Principal Consultant", "Sep 2023 - Present")[
      Building and maintaining a quantitative real estate platform for NYC property analysis. Developed dealflow automation, AI-powered document processing, geocoding services, and data scrapers using Rails, Go, Python, and React.
    ]

    #job("NFTCO/Unblocked", "Remote", "Site Reliability Engineer", "Aug 2022 - Apr 2023")[
      Maintained AWS infrastructure and CI/CD pipelines. Reduced operating costs by 45% through infrastructure optimization. Built custom Prometheus exporters and optimized GitHub Actions with self-hosted runners.
    ]

    #job("Blockfolio/FTX", "Remote", "Site Reliability Engineer", "Nov 2020 - Aug 2022")[
      Maintained AWS infrastructure for event-driven applications. Managed large-scale data with InfluxDB. Led infrastructure security initiatives and attack mitigation.
    ]

    #job("Synapse Studios", "Tempe, AZ", "Director of Infrastructure", "Jan 2020 - Oct 2020")[
      Designed modular Terraform infrastructure for AWS. Managed 15+ customer AWS environments with custom monitoring and CI/CD pipelines.
    ]

    #job("Solid Command Inc", "Phoenix, AZ", "Director of Infrastructure", "Aug 2019 - Aug 2022")[
      Built private cloud on bare metal using Apache CloudStack. Infrastructure as code with Ansible, Terraform, Packer, and Docker.
    ]

    #job("Kadima Ventures", "Phoenix, AZ", "Director of Infrastructure", "Dec 2017 - 2019")[
      Promoted from SysOps/DevOps to Director. Led operations team, managed AWS/Kubernetes infrastructure. Automated pipelines to drastically reduce deployment times.
    ]

    #job("GoDaddy", "Gilbert, AZ", "Site Reliability Engineer", "Sep 2015 - Nov 2016")[
      Progressed from Systems Administrator to SRE. Managed mixed Windows/Linux environments, mitigated network attacks, automated operational tasks.
    ]

    #job("Edward Jones", "Tempe, AZ", "Systems Administrator II", "Jan 2008 - May 2015")[
      Managed enterprise applications in mixed Linux/Windows environments. Application deployment, incident response, and infrastructure troubleshooting.
    ]

    // Projects
    #section("Open Source Projects")

    #project("MCP NixOS", "Creator", "Model Context Protocol Server for NixOS resources")
    #project("nxv", "Creator", "Blazingly fast CLI for finding any Nix package version")
    #project("Envisaged", "Creator", "Effortless Gource Visualizations with Docker")
    #project("Docker OpenGL", "Creator", "Mesa 3D OpenGL Software Rendering in Docker")
    #project("ComfyUI Nix", "Creator", "Nix flake for ComfyUI with curated custom nodes")
    #project("brinkOS", "Creator", "Arch-based Linux distribution for Engineers")
    #project("Essex", "Creator", "Docker project template generator in Rust")
  ],
  [
    // Sidebar
    #set par(justify: false)
    #section("Contact")
    #set text(size: 9pt)
    #link("mailto:brink.james@gmail.com")[brink.james\@gmail.com] \
    (480) 410-1846
    #v(4pt)
    #link("https://github.com/jamesbrink")[GitHub] \
    #link("https://linkedin.com/in/jamesbrink")[LinkedIn] \
    #link("https://jamesbrink.me")[jamesbrink.me]

    #section("Technical Expertise")
    #set text(size: 9pt)
    Docker, Terraform, Ansible \
    Packer, AWS, Kubernetes \
    Prometheus, InfluxDB \
    Apache CloudStack \
    CI/CD, Linux, NixOS
    #v(6pt)
    *AI/ML:* \
    Agentic AI \
    Agentic Workflows \
    LLM Tooling \
    AI-Augmented Dev

    #section("Education")
    #sidebar-entry("Certification, CCNA", "Cisco Systems - 2007")
    #sidebar-entry("Diploma, Network Switching Systems", "General Dynamics - 2001")
    #sidebar-entry("Diploma, Satellite Communications", "Department of the Army - 2001")

    #section("Languages")
    #set text(size: 9pt)
    Python \
    Bash \
    Ruby \
    Go \
    Rust \
    Nix
  ]
)
