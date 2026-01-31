// James Brink Resume - Full Version
// Compile: typst compile resume.typ ../public/JamesBrink-Resume.pdf

#let accent = rgb("#2563eb")
#let dark = rgb("#18181b")
#let muted = rgb("#71717a")

#set document(title: "James Brink - Resume", author: "James Brink")
#set page(paper: "us-letter", margin: (x: 0.5in, y: 0.5in))
#set text(font: "Georgia", size: 10pt, fill: dark, hyphenate: false)
#set par(justify: false, leading: 0.65em)

#let section(title) = {
  v(12pt)
  text(fill: accent, weight: "bold", size: 10pt, tracking: 0.08em, upper(title))
  v(4pt)
}

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

#let project(name, role, desc) = {
  v(1pt)
  [*#name* #h(4pt) #text(style: "italic", fill: muted, size: 9pt)[— #role]]
  linebreak()
  text(size: 9pt, fill: muted)[#desc]
}

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
      I specialize in infrastructure as code, and building out highly efficient and fault-tolerant environments using CI/CD pipelines.
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
    #section("Experience")

    #text(size: 9.5pt)[Extensive experience with Docker, Terraform, Ansible, Packer, AWS, Apache CloudStack, Kubernetes, Prometheus, InfluxDB, and various other relational database systems.]

    #job("Infosys, iCETS Department", "Remote", "Technology Architect", "Oct 2023 - Present")[
      Working as a Technology Architect in the Research and Development (R&D) focused Infosys Center for Emerging Technology Solutions (iCETS) department, focusing on incubating NextGen services and offerings. Involved in identifying and building technology capabilities to accelerate innovation in areas including AI & ML, cloud technologies, and advanced analytics. Deployed NixOS-based AI sandbox environments on HPE bare-metal servers for rapid prototyping and model experimentation. Contributing to the development of emerging technology solutions that help enterprises navigate their digital transformation journey through adaptive systems, automation, and cognitive solutions.
    ]

    #job("Quantierra", "Remote", "Principal Consultant", "Sep 2023 - Present")[
      Architecting and maintaining a microservices platform for NYC commercial real estate intelligence. Built a dealflow automation pipeline with AI-powered email classification using ReACT-style agentic loops, autonomous browser automation, and LLM-based document processing. Developed a geocoding service with sub-20ms query latency. Created high-throughput ACRIS document scrapers. Managing large-scale property datasets with PLUTO zoning and tax data integration. Full NixOS production infrastructure with ZFS, Terraform, Podman, and comprehensive Prometheus/Grafana monitoring. Tech stack spans Rails 8, FastAPI, Go, React, PostgreSQL/PostGIS, Elasticsearch, and AWS.
    ]

    #job("NFTCO/Unblocked", "Remote", "Site Reliability Engineer", "Aug 2022 - Apr 2023")[
      Worked within a small engineering team and maintained the AWS infrastructure, monitoring, and all things CI/CD related. Spent a good amount of effort to drastically reduce our applications operating costs by about 45%. Built out custom monitoring, including Prometheus exporters. Did a lot of work with GitHub Actions, and leveraged self-hosted runners for faster pipelines.
    ]

    #job("Blockfolio/FTX", "Remote", "Site Reliability Engineer", "Nov 2020 - Aug 2022")[
      Worked directly with a small and highly talented team of engineers to maintain and improve an AWS infrastructure for an event-driven, and very active application. This role required me to become familiar with Cassandra, and InfluxDB and ensure we stayed ahead of the curve on scaling both as we had very massive data sets. In addition to the usual DevOps/SRE tasks, I assisted in mitigating multiple attacks on the infrastructure regularly.
    ]

    #job("Synapse Studios", "Tempe, AZ", "Director of Infrastructure", "Jan 2020 - Oct 2020")[
      Worked closely with software engineering teams to build out a reusable and modular terraform covering a very specific application stack on AWS. Managed & monitored around 15 different AWS accounts owned by customers. Set up custom monitoring and VPN solutions as well as maintain CI/CD pipelines and improve build times.
    ]

    #job("Solid Command Inc", "Phoenix, AZ", "Director of Infrastructure", "Aug 2019 - Aug 2022")[
      Built out a private cloud on bare metal servers using Apache Cloudstack. Built out infrastructure that ran on top of the private cloud. All of this work was infrastructure as code using Ansible, Terraform, Packer, and Docker.
    ]

    #job("Kadima Ventures", "Phoenix, AZ", "Director of Infrastructure", "Dec 2017 - 2019")[
      Building awesome stuff, with an amazing team. Initially hired into a SysOps/DevOps role which also included R&D work and building proof of concepts for various products. Was quickly promoted to Director of Infrastructure where I became responsible for managing the operations team, and all production infrastructure. Extensive work with AWS, Kubernetes, Docker, Terraform, and CI/CD pipelines. Created automated pipelines for an existing production application drastically reducing deployment times.
    ]

    #job("GoDaddy", "Gilbert, AZ", "Site Reliability Engineer", "Sep 2015 - Nov 2016")[
      Hired as a Systems Administrator for shared hosting operations, and later progressed into an Engineering role on the Hosting Automation Team. Managed a mixed Windows/Linux production environment. Daily tasks included mitigating network attacks, monitoring infrastructure, resolving system configuration, performance, and capacity issues. I later transitioned into an engineering role where our team automated most of the daily operational tasks, reducing the workload of the operations team as well as decreasing downtime across the environment.
    ]

    #job("Taste.com", "San Francisco, CA", "Lead Engineer", "May 2015 - Sep 2015")[
      Lead engineer for an online catering company based in San Francisco, CA. This role involved re-factoring and improving upon an existing Ruby on Rails application.
    ]

    #job("Yahoo", "Sunnyvale, CA", "Senior Services Engineer", "Jul 2015 - Aug 2015")[
      Contracted to work on the Small Business Services Team to migrate all Yahoo Small Business Services from Yahoo to Aabaco. Assisted with day-to-day operations of production, development, and QA environments.
    ]

    #job("Edward Jones", "Tempe, AZ", "Systems Administrator II", "Jan 2008 - May 2015")[
      Brought on board to take over management and monitoring for a range of enterprise applications. Responsibilities included application deployment, incident triage, and troubleshooting Linux and Windows environments. Promoted to System Administrator II after demonstrating an aptitude for tackling complicated infrastructure problems from availability to disaster recovery.
    ]

    #job("Media Solutions Corp", "Tempe, AZ", "Software Engineer", "Sep 2011 - Oct 2012")[
      Hired to lead efforts to bring a project that was 4 months behind schedule up to date and deployed to production. By Utilizing Ruby on Rails, I started a new and rapidly prototyped and deployed the requested feature set within 2 weeks. In addition to application maintenance, I was responsible for the oversight and mentorship of new Ruby developers.
    ]

    #job("Accram", "Phoenix, AZ", "Network Engineer/Systems Integrator", "Jan 2004 - Jan 2008")[
      While at Accram, my time was split between managing internal infrastructure, running the company's small ISP, as well as managing customers' networks and servers. My daily duties varied dramatically from one day to another, as we were always taking on new customers with new challenges. Spent a lot of time on projects, generally working as a lead. Selected to manage and lead customer technical onboarding and integrations. Worked directly with sales teams to identify and pursue new customers and deliver solutions specific to their needs.
    ]

    #section("Projects")

    #project("MCP NixOS", "Creator / Maintainer", "Model Context Protocol Server for NixOS resources.")
    #project("nxv", "Creator", "Blazingly fast CLI for finding any version of any Nix package.")
    #project("ComfyUI Nix", "Creator / Maintainer", "Nix flake for ComfyUI with curated custom nodes.")
    #project("Envisaged", "Creator / Maintainer", "Effortless Gource Visualizations with Docker.")
    #project("Docker OpenGL", "Creator / Maintainer", "Mesa 3D OpenGL Software Rendering (Gallium) - LLVMpipe, and OpenSWR Drivers.")
    #project("brinkOS", "Creator", "Experimental Linux distribution based on Arch Linux.")
    #project("Essex", "Creator / Maintainer", "Docker project template generator written in Rust.")
    #project("Arch Linux", "AUR Package Maintainer", "Maintaining packages not included in the distributions primary repository.")
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
