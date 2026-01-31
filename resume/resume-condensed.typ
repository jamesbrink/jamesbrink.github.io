// James Brink Resume - Single Page
// Compile: typst compile resume.typ ../public/JamesBrink-Resume.pdf

#let accent = rgb("#2563eb")
#let dark = rgb("#18181b")
#let muted = rgb("#6b7280")

#set document(title: "James Brink - Resume", author: "James Brink")
#set page(paper: "us-letter", margin: (x: 0.4in, y: 0.4in))
#set text(font: "Georgia", size: 9pt, fill: dark, hyphenate: false)
#set par(justify: false, leading: 0.5em)

#let section(title) = {
  v(6pt)
  text(fill: accent, weight: "bold", size: 9pt, tracking: 0.06em, upper(title))
  v(2pt)
}

#let job(company, location, role, dates, body) = {
  v(4pt)
  grid(
    columns: (1fr, auto),
    [*#company*, #location], text(fill: muted, size: 8pt)[#dates]
  )
  text(style: "italic", fill: accent, size: 9pt)[#role]
  v(2pt)
  text(size: 8.5pt)[#body]
}

#let sidebar-entry(title, sub) = {
  v(2pt)
  text(weight: "bold", size: 8.5pt)[#title]
  linebreak()
  text(size: 8pt, fill: muted)[#sub]
}

// === HEADER ===
#grid(
  columns: (1fr, auto),
  [
    #text(font: "Georgia", size: 28pt)[James Brink]
    #v(2pt)
    #text(size: 9pt, fill: muted)[
      Infrastructure & AI/ML architect building fault-tolerant systems with modern DevOps practices.
    ]
  ],
  align(right)[
    #set text(size: 8.5pt)
    Phoenix, AZ #h(4pt) *(480) 410-1846* \
    #link("mailto:brink.james@gmail.com")[brink.james\@gmail.com] #h(4pt) #link("https://github.com/jamesbrink")[GitHub] #h(4pt) #link("https://linkedin.com/in/jamesbrink")[LinkedIn]
  ]
)

#v(4pt)
#line(length: 100%, stroke: 0.4pt + rgb("#d4d4d8"))
#v(2pt)

// === MAIN CONTENT ===
#grid(
  columns: (1fr, 145pt),
  column-gutter: 14pt,
  [
    #section("Experience")

    #job("Infosys, iCETS", "Remote", "Technology Architect", "Oct 2023 - Present")[
      R&D department incubating NextGen services. Building AI/ML capabilities, agentic workflows, LLM tooling. NixOS on HPE bare-metal for AI sandboxes.
    ]

    #job("Quantierra", "Remote", "Principal Consultant", "Sep 2023 - Present")[
      NYC real estate intelligence platform. AI-powered dealflow with agentic workflows, geocoding, ACRIS scrapers. NixOS/Terraform infrastructure.
    ]

    #job("NFTCO/Unblocked", "Remote", "Site Reliability Engineer", "Aug 2022 - Apr 2023")[
      AWS infrastructure and CI/CD. Reduced costs 45%. Custom Prometheus exporters, GitHub Actions optimization.
    ]

    #job("Blockfolio/FTX", "Remote", "Site Reliability Engineer", "Nov 2020 - Aug 2022")[
      AWS infrastructure for event-driven apps. Large-scale InfluxDB management. Security and attack mitigation.
    ]

    #job("Synapse Studios", "Tempe, AZ", "Director of Infrastructure", "Jan 2020 - Oct 2020")[
      Modular Terraform for AWS. Managed 15+ customer environments with monitoring and CI/CD.
    ]

    #job("Solid Command Inc", "Phoenix, AZ", "Director of Infrastructure", "Aug 2019 - Aug 2022")[
      Private cloud on bare metal with Apache CloudStack. IaC with Ansible, Terraform, Packer, Docker.
    ]

    #job("Kadima Ventures", "Phoenix, AZ", "Director of Infrastructure", "Dec 2017 - 2019")[
      Promoted to Director. AWS/Kubernetes infrastructure. Automated pipelines for faster deployments.
    ]

    #job("GoDaddy", "Gilbert, AZ", "Site Reliability Engineer", "Sep 2015 - Nov 2016")[
      Systems Admin to SRE. Mixed Windows/Linux environments. Network attack mitigation, automation.
    ]

    #job("Edward Jones", "Tempe, AZ", "Systems Administrator II", "Jan 2008 - May 2015")[
      Enterprise applications in mixed environments. Deployment, incident response, infrastructure.
    ]

    #section("Open Source")
    #v(2pt)
    #set text(size: 8.5pt)
    *MCP NixOS* — Model Context Protocol for NixOS #h(6pt)
    *nxv* — Fast Nix package version finder #h(6pt)
    *Envisaged* — Gource visualizations in Docker #h(6pt)
    *Docker OpenGL* — Mesa 3D software rendering #h(6pt)
    *ComfyUI Nix* — Nix flake for ComfyUI #h(6pt)
    *brinkOS* — Arch-based Linux distro #h(6pt)
    *Essex* — Docker project generator in Rust
  ],
  [
    #set par(justify: false)

    #section("Technical Skills")
    #set text(size: 8.5pt)
    Docker, Terraform, Ansible \
    Packer, AWS, Kubernetes \
    Prometheus, InfluxDB \
    Apache CloudStack \
    CI/CD, Linux, NixOS
    #v(4pt)
    *AI/ML:* \
    Agentic AI, LLM Tooling \
    Agentic Workflows \
    AI-Augmented Development

    #section("Languages")
    #set text(size: 8.5pt)
    Python, Bash, Ruby \
    Go, Rust, Nix

    #section("Education")
    #sidebar-entry("CCNA Certification", "Cisco Systems - 2007")
    #sidebar-entry("Network Switching Systems", "General Dynamics - 2001")
    #sidebar-entry("Satellite Communications", "US Army - 2001")
  ]
)
