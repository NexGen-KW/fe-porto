// English site copy — the source of truth for the shape of every locale.
// ar.ts is typed against `Messages`, so a missing or extra key fails the typecheck.
// Strings are read as plain data through `useCopy()` (never compiled by vue-i18n), so `@`, `{` and `|` are safe here.

const en = {
  meta: {
    title: 'NexGen Solutions — Software & AI Engineering Partner',
    description: 'NexGen Solutions (NGS) designs, builds, and scales AI-powered software for ambitious teams — from product strategy to custom AI integration.',
    products: {
      title: 'Products — NexGen Solutions',
      description: 'Explore the NexGen Solutions products: Digital Workplace, Encryption, Smart-IT, Tender Management, and Visitor Management.'
    },
    services: {
      title: 'Services — NexGen Solutions',
      description: 'DevOps implementation, AI services, cloud services and system integration, and application modernization from NexGen Solutions.'
    },
    about: {
      title: 'About — NexGen Solutions',
      description: 'The vision, mission, strategy and values behind NexGen Solutions, an IT solutions company based in Kuwait.'
    },
    contact: {
      title: 'Contact — NexGen Solutions',
      description: 'Get in touch with NexGen Solutions to discuss your next AI-powered product.'
    }
  },

  nav: {
    links: {
      home: 'Home',
      products: 'Products',
      services: 'Services',
      about: 'About',
      contact: 'Contact'
    },
    getStarted: 'Get Started',
    toggleMenu: 'Toggle menu',
    pageSections: 'Page sections',
    backToTop: 'Back to top',
    logoAlt: 'NGS — NexGen Solutions',
    // the language toggle shows the *other* language
    switchLanguage: 'العربية',
    switchLanguageShort: 'ع',
    switchLanguageLabel: 'التبديل إلى العربية'
  },

  // labels for the floating section navigator (one per page section)
  sections: {
    overview: 'Overview',
    stack: 'Stack',
    whyUs: 'Why Us',
    solutions: 'Solutions',
    process: 'Process',
    metrics: 'Metrics',
    expertise: 'Expertise',
    letsTalk: 'Let\'s Talk',
    products: 'Products',
    architecture: 'Architecture',
    ngsMap: 'NGS Map',
    services: 'Services',
    results: 'Results',
    story: 'Story',
    vision: 'Vision',
    values: 'Values',
    team: 'Team',
    milestones: 'Milestones',
    impact: 'Impact',
    getInTouch: 'Get in Touch',
    faq: 'FAQ',
    newsletter: 'Newsletter'
  },

  common: {
    getStarted: 'Get Started',
    bookDemo: 'Book a Demo',
    readyWhenYouAre: 'Ready when you are',
    exploreServices: 'Explore Services',
    viewProducts: 'View Products',
    contactUs: 'Contact Us',
    ourServices: 'Our Services',
    subscribe: 'Subscribe',
    subscribed: 'Subscribed!',
    live: 'live'
  },

  footer: {
    blurb: 'NexGen Solutions builds AI-powered software that helps ambitious teams ship faster, scale smarter, and stay ahead.',
    company: 'Company',
    links: {
      about: 'About us',
      careers: 'Careers',
      services: 'Services',
      contact: 'Contact'
    },
    newsletterTitle: 'Stay in the loop',
    newsletterText: 'Product news and AI insights, once a month. No spam.',
    rights: 'NexGen Solutions (NGS). All rights reserved.'
  },

  hero: {
    badge: 'Smart Technology, Smart Living',
    title: 'Empowering Your Vision for a Smarter Tomorrow',
    highlight: 'Smarter Tomorrow',
    rotating: ['Smarter Tomorrow', 'Secure Workplace', 'Modern Cloud', 'Connected Business'],
    description: 'We provide perfect IT solutions and technology for any business — from DevOps, AI, and cloud services to ready-made products for the digital workplace.',
    capabilities: [
      { label: 'Pipeline', value: 'CI/CD' },
      { label: 'Infrastructure', value: 'IaC' },
      { label: 'Delivery', value: 'AI-driven' }
    ],
    encrypted: 'encrypted',
    cloudSynced: 'cloud synced',
    aiServices: 'AI services',
    aiStatus: 'online · monitoring'
  },

  home: {
    stackTitle: 'Engineered with the technologies that scale',
    why: {
      eyebrow: 'Why NexGen',
      title: 'Software partners who think like operators',
      description: 'We combine deep AI expertise with product discipline to build systems that hold up in production, not just in demos.',
      features: [
        { title: 'AI-native engineering', description: 'We build with AI at the core, not bolted on — from model selection to production monitoring.' },
        { title: 'Ship in weeks, not quarters', description: 'Lean, senior teams and a proven delivery process get you to production fast, without cutting corners.' },
        { title: 'Enterprise-grade security', description: 'SOC 2-aligned practices, audited infrastructure, and security reviews baked into every sprint.' },
        { title: 'Partnership, not a handoff', description: 'We stay close after launch with support, iteration, and a team that knows your system inside out.' }
      ]
    },
    solutions: {
      eyebrow: 'Solutions',
      title: 'Products built for the way you work',
      description: 'From the digital workplace to tender and visitor management — explore what NexGen presents.',
      viewAll: 'View all products'
    },
    process: {
      eyebrow: 'How it works',
      title: 'A proven path from idea to production',
      description: 'A transparent four-stage process built to de-risk delivery and keep you informed at every step.',
      steps: [
        { title: 'Discover', description: 'We map your goals, constraints, and data landscape to define a clear, de-risked plan.', duration: '1–2 weeks', outputs: ['Goals & KPIs', 'Data audit', 'Delivery roadmap'] },
        { title: 'Design', description: 'Product and technical architecture take shape, validated with rapid prototypes.', duration: '2–3 weeks', outputs: ['System architecture', 'UX prototypes', 'AI model plan'] },
        { title: 'Build', description: 'Senior engineers ship in tight, transparent sprints with continuous demos.', duration: '6–12 weeks', outputs: ['Sprint demos', 'CI/CD pipeline', 'QA & security review'] },
        { title: 'Launch & Scale', description: 'We deploy, monitor, and iterate — turning a launch into sustained growth.', duration: 'Ongoing', outputs: ['Production deploy', '24/7 monitoring', 'Growth iterations'] }
      ]
    },
    stack: {
      eyebrow: 'Our Stack',
      title: 'Built with tools engineers actually trust',
      description: 'Every engagement draws from the same production-grade toolkit — no grab-bag of frameworks, just what scales.'
    },
    cta: {
      title: 'Let\'s build your next breakthrough',
      highlight: 'next breakthrough',
      description: 'Tell us about your project and we\'ll get back to you within one business day.'
    }
  },

  processFlow: {
    stage: 'stage',
    showStage: 'Show stage',
    status: { done: 'passed', active: 'running', queued: 'queued' },
    runStage: 'run stage',
    artifacts: 'artifacts:'
  },

  liveMetrics: {
    badge: 'system.status — live',
    title: 'Numbers that back up the engineering',
    operational: 'all systems operational',
    timezone: 'AST',
    checks: ['pipeline · passing', 'deployments · healthy', 'monitoring · online', 'security scan · clean', 'backups · verified', 'support desk · open']
  },

  techStack: {
    core: 'core',
    stable: 'stable',
    cards: {
      ai: { title: 'AI', description: 'AI woven into product, not bolted on after — grounded in your data and monitored in production.' },
      backend: { title: 'Backend', description: 'Robust, testable services built the right way.' },
      database: { title: 'Database', description: 'Governed, performant data layers at any scale.' },
      devops: { title: 'DevOps', description: 'Ship often, ship safely, every single time.' },
      frontend: { title: 'Front-End', description: 'Interfaces that feel fast and look sharp.' },
      ux: { title: 'UX/UI', description: 'Design that earns trust before a word is read.' },
      azure: { title: 'Azure', description: 'Cloud-native infrastructure, built to scale — secured, observable, and close to your users.' }
    },
    chips: {
      llm: 'LLM Integration',
      fineTuning: 'Fine-tuning',
      evaluation: 'Evaluation',
      cleanArch: 'Clean Arch',
      restApis: 'REST APIs',
      i18n: 'i18n Locales',
      userFriendly: 'User-Friendly',
      designThinking: 'Design Thinking',
      colorSystems: 'Color Systems'
    }
  },

  solutionCard: {
    product: 'product',
    flagship: 'flagship',
    explore: 'Explore product'
  },

  products: {
    hero: {
      eyebrow: 'Products',
      title: 'Products that make work smarter and safer',
      highlight: 'smarter and safer',
      description: 'Digital workplace, encryption, smart IT, tender and visitor management — what NexGen presents, ready for your business.'
    },
    explore: 'Explore Services',
    list: {
      eyebrow: 'Our products',
      title: 'What we present',
      description: 'Pick a product to explore what it does and what it brings to your team.'
    },
    showcase: {
      product: 'product',
      whatYouGet: 'What you get',
      ask: 'Ask about this product',
      previous: 'Previous product',
      next: 'Next product'
    },
    architecture: {
      eyebrow: 'Under the hood',
      title: 'How we put the stack to work',
      description: 'Every NGS product is built on the same layered architecture — follow a request down the stack to see what powers each layer.',
      tracing: 'tracing request · layer',
      delivered: 'delivered · secure, end to end',
      resolving: 'resolving through the stack…',
      layers: {
        experience: { name: 'Experience', description: 'User-facing interfaces, localized and themeable.', earns: 'Interfaces your people pick up quickly, on any device, in light or dark.' },
        application: { name: 'Application', description: 'Use cases, orchestration, and API contracts.', earns: 'Clear contracts between systems, so integrations stay predictable.' },
        domain: { name: 'Domain', description: 'Business rules, isolated from frameworks.', earns: 'Your business logic outlives any framework change around it.' },
        data: { name: 'Data & AI', description: 'Governed storage and model inference.', earns: 'One governed source of data feeding reports and AI features alike.' },
        cloud: { name: 'Cloud & Identity', description: 'Deployment, secrets, and access control.', earns: 'Secure sign-in and repeatable deployments from day one.' }
      }
    },
    map: {
      eyebrow: 'NGS Map',
      title: 'The stack behind every product',
      description: 'Hover any node to see what it brings to the table. Everything orbits around one core.',
      hint: 'hover a node to pause the orbit',
      benefits: {
        vue: 'Reactive, fast UIs',
        dotnet: 'Robust service layer',
        csharp: 'Typed, battle-tested',
        cleanArch: 'Maintainable at scale',
        azure: 'Enterprise cloud scale',
        entra: 'Secure identity & access',
        sqlserver: 'Governed, reliable data',
        postgres: 'Flexible open-source SQL',
        nuxtui: 'Polished design system',
        docker: 'Consistent deployments'
      }
    },
    cta: {
      title: 'Ready to see NexGen products in action?',
      highlight: 'in action?',
      description: 'Get a guided walkthrough tailored to your team\'s stack and goals.'
    }
  },

  services: {
    hero: {
      eyebrow: 'Services',
      title: 'Professional IT services for every stage',
      highlight: 'every stage',
      description: 'We deal with the aspects of professional IT services — DevOps, AI, cloud and system integration, and application modernization.'
    },
    list: {
      eyebrow: 'Our services',
      title: 'What we do',
      description: 'Four service lines, each built around the benefits your teams feel day to day.'
    },
    card: {
      service: 'service',
      benefits: 'benefits'
    },
    process: {
      eyebrow: 'Our methodology',
      title: 'A disciplined process, built for transparency',
      description: 'Five stages designed to keep risk low and momentum high, from first workshop to production launch.',
      stages: 'stages',
      exit: 'exit 0',
      running: 'running…',
      queued: 'queued',
      allPassed: 'all stages passed — ready for launch',
      runningPipeline: 'running pipeline',
      steps: [
        { title: 'Discovery workshop', description: 'A structured session to align on goals, constraints, and success metrics before any code is written.' },
        { title: 'Architecture & design', description: 'Technical architecture, data flow, and UX are mapped and validated against real constraints.' },
        { title: 'Iterative build', description: 'Two-week sprints with live demos, so you always know exactly where the project stands.' },
        { title: 'QA & hardening', description: 'Load testing, security review, and edge-case coverage before anything reaches production.' },
        { title: 'Launch & handoff', description: 'A guided rollout plan, documentation, and knowledge transfer to your team.' }
      ]
    },
    results: {
      eyebrow: 'Results',
      title: 'Average client results after 6 months',
      description: 'Aggregate improvements across NexGen engagements in 2025 — measured before and after partnership.',
      metrics: {
        speed: 'Delivery speed',
        cost: 'Infra cost',
        deploys: 'Deploy frequency',
        incidents: 'Incident rate'
      },
      healthScore: '// engineering health score',
      healthAria: 'Health score improved from {before} to {after} out of 100',
      pts: 'pts',
      improved: '{count}/{total} metrics improved',
      runningBenchmark: 'running benchmark…'
    },
    cta: {
      title: 'Tell us what you\'re building',
      highlight: 'you\'re building',
      description: 'Book a 30-minute discovery call and leave with a clear technical path forward.'
    }
  },

  about: {
    hero: {
      eyebrow: 'About Us',
      title: 'Technology that moves your business forward',
      highlight: 'your business forward',
      description: 'NexGen Solutions offers tailored technology solutions to diverse industries — and stays for the long run with ongoing support.'
    },
    story: {
      eyebrow: 'Our story',
      title: 'We provide perfect IT solutions & technology for any business',
      lead: 'A company specializing in IT solution services exhibits versatility by catering to clients across diverse industries, including but not limited to healthcare, finance, education, and manufacturing.',
      body: 'Engaging in both project-based collaborations and long-term partnerships, we adeptly deliver tailored services to meet the unique requirements of each client, ensuring comprehensive and sustainable solutions for a myriad of technological challenges.',
      started: 'started journey',
      foundedAria: 'Founded in {year}',
      facts: [
        { label: 'Based in', value: 'Kuwait' },
        { label: 'What we bring', value: 'Provide Skills Services' },
        { label: 'How we show up', value: 'Urgent Support For Clients' }
      ]
    },
    why: {
      eyebrow: 'Why choose us',
      titleStart: 'Make your business great with',
      titleBrand: 'NexGen',
      titleEnd: 'Solutions',
      text: 'An IT solution service company offers tailored technology solutions to diverse industries such as healthcare, finance, education, and manufacturing. Operating on a project basis, they analyze client needs, fostering dynamic collaborations with multidisciplinary teams to deliver end-to-end services and ongoing support, ensuring lasting partnerships in a rapidly evolving digital landscape.',
      points: [
        { title: 'Emergency Solutions Anytime', text: 'On-call support that responds when it matters most, day or night.' },
        { title: 'Reliable & Experienced Team', text: 'Seasoned specialists who own your project from discovery to support.' },
        { title: 'Using Latest AI Methods', text: 'Modern AI applied where it adds real value to your business.' }
      ],
      hq: 'Kuwait HQ'
    },
    vision: {
      eyebrow: 'NexGen Solutions Co.',
      title: 'Our vision, mission and strategy',
      pillars: {
        vision: { title: 'Our Vision', text: 'Guided by our unwavering commitment to innovation, we strive to empower positive transformation through the relentless pursuit of cutting-edge technology. As a visionary force, we aspire to act as a catalyst for change, pioneering transformative solutions that not only redefine industries but also elevate the human experience to new heights.' },
        mission: { title: 'Our Mission', text: 'Fueled by an unyielding commitment to innovation, our mission is to drive positive transformation through the tireless pursuit of cutting-edge technology. Functioning as a visionary force, we aim to serve as a catalyst for change, leading the way in pioneering transformative solutions that not only redefine industries but also elevate the human experience to unprecedented heights.' },
        strategy: { title: 'Our Strategy', text: 'With a steadfast commitment to strategic excellence, our mission encompasses the development of innovative solutions that align seamlessly with the company\'s overarching vision. We continuously cultivate a future-focused, customer-centric strategy, driving sustainable growth and fostering lasting impact in the ever-evolving realm of technology.' }
      }
    },
    values: {
      eyebrow: 'Our values',
      title: 'The principles behind every engagement',
      items: [
        { title: 'Innovation', text: 'We foster a culture of continuous innovation, pushing the boundaries of technology to deliver cutting-edge solutions.' },
        { title: 'Integrity', text: 'Our commitment to honesty and transparency is unwavering, building trust with our clients, partners, and team members.' },
        { title: 'Agility', text: 'In a dynamic industry, we embrace agility, adapting swiftly to evolving technologies and market trends.' },
        { title: 'Security', text: 'We prioritize the security of our clients\' data and systems, implementing robust measures to safeguard against threats.' },
        { title: 'Respect', text: 'We value diversity and treat everyone with respect, creating an inclusive and supportive work environment.' },
        { title: 'Empathy', text: 'Cultivate empathy in our approach, understanding the end-users\' experiences and designing solutions that enhance their lives.' },
        { title: 'Inclusivity', text: 'Celebrate diversity and create an inclusive work environment where everyone feels valued and empowered.' },
        { title: 'Reliability', text: 'Build and deliver reliable software solutions that our clients can trust for their critical business operations.' }
      ]
    },
    team: {
      eyebrow: 'Our team',
      title: 'Senior talent, hand-picked for craft',
      description: 'A distributed team of engineers, designers, and strategists who\'ve shipped at scale before.',
      senior: 'Senior',
      toolkit: 'Toolkit',
      online: 'online',
      regions: ['Africa', 'Asia'],
      traits: [
        { key: 'standard', value: 'senior-only' },
        { key: 'review', value: 'every change' },
        { key: 'ownership', value: 'end-to-end' }
      ],
      roles: {
        engineering: { title: 'Engineering', detail: 'full-stack, platform & AI', skills: ['Full-stack', 'Cloud & DevOps', 'AI integration', 'Security'] },
        qa: { title: 'Quality Assurance', detail: 'QA & test automation', skills: ['Test automation', 'Performance', 'Regression', 'UAT'] },
        design: { title: 'Product Design', detail: 'product & UX', skills: ['UX research', 'UI design', 'Design systems', 'Accessibility'] },
        strategy: { title: 'Strategy & Delivery', detail: 'discovery & delivery', skills: ['Discovery', 'Roadmapping', 'Delivery', 'Partnership'] }
      },
      tools: {
        accessibility: 'Accessibility',
        localization: 'Localization',
        workshops: 'Workshops'
      },
      culture: [
        'Remote-first across continents',
        'Senior-only hiring bar',
        'Every PR reviewed, no exceptions',
        'Continuous learning, built into the work',
        'Many nationalities, one shared standard',
        'No single point of failure on any project'
      ]
    },
    milestones: {
      eyebrow: 'Milestones',
      title: 'Building since {year}, and still going',
      description: 'Every chapter so far has led to the next one. Our growth journey is ongoing, and there is no finish line.',
      steps: [
        { phase: '{year}', kicker: 'Founded', title: 'Started the journey', description: 'Founded in Kuwait to deliver tailored IT solutions.' },
        { phase: 'Then', kicker: 'Foundations', title: 'Core services take shape', description: 'DevOps, AI, cloud and modernization become our core.' },
        { phase: 'Growing', kicker: 'Products', title: 'A growing product suite', description: 'Five products join the suite, from workplace to security.' },
        { phase: 'Now', kicker: 'In progress', title: 'Building what\'s next', description: 'Investing in modern AI and lasting partnerships.' }
      ],
      next: {
        phase: 'Next',
        kicker: 'Always ahead',
        title: 'The journey continues',
        description: 'New products, partners and chapters ahead.'
      }
    },
    impact: {
      eyebrow: 'Impact log',
      title: 'Three years, logged and committed',
      entries: 'entries · working tree clean'
    },
    cta: {
      title: 'Want to work with a team like ours?',
      highlight: 'a team like ours?',
      description: 'We\'re always looking to partner with ambitious teams — tell us what you need.'
    }
  },

  // labels for the shared impact metrics (values live in data/company.ts)
  metrics: {
    years: { label: 'Years building', detail: 'since {year}', suffix: ' yrs' },
    projects: { label: 'Projects done', detail: 'delivered end to end' },
    clients: { label: 'Active clients', detail: 'long-term partnerships' },
    pullRequests: { label: 'Pull requests merged', detail: 'reviewed before merge' },
    deployments: { label: 'Deployments shipped', detail: 'through CI/CD' },
    codeReviews: { label: 'Code reviews', detail: 'every change, no exceptions' }
  },

  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Let\'s talk about your next project',
      highlight: 'your next project',
      description: 'Tell us where you\'re headed. We typically respond within one business day.'
    },
    form: {
      required: 'required',
      title: 'Send us a message',
      subtitle: 'Fill out the form and our team will follow up shortly.',
      aboutYou: 'About you',
      yourCompany: 'Your company',
      optional: 'optional',
      yourProject: 'Your project',
      name: 'Full name',
      namePlaceholder: 'Jane Doe',
      email: 'Work email',
      company: 'Company',
      companyPlaceholder: 'Acme Inc.',
      details: 'Project details',
      detailsPlaceholder: 'Tell us about your goals, timeline, and current stack...',
      min: 'min',
      send: 'Send message',
      sending: 'Sending…',
      sendAnother: 'Message sent — send another',
      responseTime: 'we typically respond within one business day',
      errors: {
        name: 'Please enter your full name',
        email: 'Please enter a valid email address',
        message: 'Tell us a little more about your project'
      },
      toastTitle: 'Message sent',
      toastText: 'Thanks, {name} — we\'ll be in touch within one business day.'
    },
    info: {
      email: 'Email address',
      phone: 'Phone number',
      writeToUs: 'Write to us',
      callUs: 'Call us',
      copied: 'Copied',
      copy: 'Copy',
      local: 'local',
      office: 'Office address',
      country: 'Kuwait',
      address: ['Khalid ben Waleed Street', 'AlSwaber tower 6, floor 3, office 7', 'AlAssima, 15001, Kuwait'],
      openMaps: 'Open in Maps'
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      description: 'Straight answers to what teams ask us most before kicking off.',
      items: [
        { label: 'How quickly can we start a project?', content: 'Most engagements kick off within 1–2 weeks of a signed agreement, following a short discovery workshop to align on scope.' },
        { label: 'Do you work with early-stage startups?', content: 'Yes. We work with teams from seed stage through enterprise, and tailor engagement size and pricing accordingly.' },
        { label: 'What does a typical engagement cost?', content: 'Projects range from $25k for focused AI integrations to $200k+ for full product builds. We\'ll scope a fixed estimate after discovery.' },
        { label: 'Can you integrate with our existing codebase?', content: 'Absolutely — most of our engagements extend an existing stack rather than starting from scratch. We audit before we build.' },
        { label: 'Do you offer ongoing support after launch?', content: 'Yes, with SLA-backed support retainers covering monitoring, incident response, and continued feature iteration.' }
      ],
      entries: 'entries',
      stillQuestions: 'Still have questions?',
      stillText: 'Can\'t find what you\'re looking for? A real engineer — not a bot — will get back to you.',
      avgReply: 'avg. reply',
      avgReplyValue: '< 24h',
      kickoff: 'kickoff',
      kickoffValue: '1–2 wks',
      sendMessage: 'Send a message',
      emailUs: 'Email us'
    },
    newsletter: {
      title: 'Stay ahead of the curve',
      text: 'Join our monthly newsletter for AI engineering insights and product updates.'
    }
  },

  catalog: {
    products: {
      'digital-workplace': {
        name: 'Digital Workplace Solutions',
        summary: 'Empower your workforce with our seamless digital workplace solution for enhanced collaboration and productivity.',
        description: 'Our Digital Workplace solution is a cutting-edge platform that empowers organizations to create a unified, collaborative, and efficient digital environment. By seamlessly integrating essential tools and applications, we enhance employee productivity, accelerate decision-making, and foster innovation. Our solution is designed to adapt to the evolving needs of your business, providing a robust foundation for growth, scalability, and long-term success.',
        benefits: [
          { title: 'Centralized Info. Access', text: 'A digital workplace centralizes information, making it easily accessible to all team members.' },
          { title: 'Employee Collaboration', text: 'Boost team morale by leveraging our digital tools and collaborative platforms for success.' },
          { title: 'Faster Decision-Making', text: 'Businesses benefit from agile decision-making with real-time data and analytics insights.' },
          { title: 'Customer Satisfaction', text: 'Improved processes and communication elevate customer satisfaction levels significantly.' }
        ]
      },
      'encryption': {
        name: 'Encryption Solution',
        summary: 'Ensure optimal data security with our advanced encryption solution, designed for enhanced privacy and comprehensive protection.',
        description: 'Our Encryption Solutions provide robust, enterprise-grade protection for your sensitive data. By implementing advanced encryption technologies, we safeguard your information from unauthorized access, ensuring data privacy and compliance with industry regulations. Our solutions are designed to be seamlessly integrated into your existing infrastructure, offering comprehensive protection without compromising performance or usability.',
        benefits: [
          { title: 'Secure Cloud Adoption', text: 'Safeguard data through encryption for secure storage and transmission within cloud systems.' },
          { title: 'Protection Across Devices', text: 'Securely encrypt data on laptops, mobiles, and external drives for comprehensive protection.' },
          { title: 'Prevention of Data Breaches', text: 'Encryption deters breaches, making unauthorized access unreadable without proper decryption.' },
          { title: 'Secure Communication', text: 'Encrypting channels and emails enhances security for internal and external information sharing.' }
        ]
      },
      'smart-it': {
        name: 'Smart-IT Solutions',
        summary: 'Leading the way in enterprise technology, our visionary IT solutions empower businesses for a brighter future.',
        description: 'Our Smart-IT Solutions deliver innovative and tailored IT services designed to optimize your business operations. By combining cutting-edge technology with deep industry expertise, we provide efficient, secure, and scalable solutions that drive growth and enhance productivity. Our dedicated team is committed to understanding your unique challenges and delivering customized strategies to help you achieve your business objectives.',
        benefits: [
          // NOTE: the source site repeats the "Real-time Reporting" text under this title — confirm the intended copy.
          { title: 'Integration with Systems', text: 'Analytics drive performance tracking, guide strategic decisions, providing vital success insights.' },
          { title: 'Real-time Reporting', text: 'Analytics propel performance tracking, guiding strategic decisions through invaluable insights.' },
          { title: 'Efficient Workflow', text: 'Automated integration workflows, minimizing delays through optimized, efficient processes.' },
          { title: 'User-Friendly Interface', text: 'Efficient employee use thrives with user-friendly design, simplifying tech adoption effortlessly.' }
        ]
      },
      'tender-management': {
        name: 'Tender Management',
        summary: 'A strategic platform that empowers organizations to excel in the competitive bidding landscape.',
        description: 'Our Tender Management solution is a strategic platform that empowers organizations to excel in the competitive bidding landscape. By optimizing every stage of the tender process, from opportunity identification to contract award, we equip your team with the tools and insights needed to increase win rates, improve bid quality, and drive revenue growth. Our solution fosters collaboration, enhances decision-making, and ensures compliance, ultimately positioning your organization for sustained success.',
        benefits: [
          { title: 'Innovation and Continuous Improvement', text: 'Tender competition fuels supplier innovation, providing access to cutting-edge solutions.' },
          { title: 'Vendor Relationship Management', text: 'Tenders build strong supplier ties, fostering long-term collaboration and mutual success.' },
          { title: 'Legal Compliance', text: 'Tender management ensures legal compliance, reducing risks and ensuring adherence.' },
          { title: 'Time Efficiency', text: 'Tendering\'s upfront time investment yields long-term efficiency procurement processes.' }
        ]
      },
      'visitor-management': {
        name: 'Visitor Management',
        summary: 'Transform the way you greet and manage guests with streamlined check-in, enhanced security, and visitor insights.',
        description: 'Our Visitor Management solution transforms the way you greet and manage guests. By streamlining the check-in process, enhancing security, and providing valuable visitor insights, we elevate the overall visitor experience. Our platform offers a seamless and efficient way to track visitors, comply with regulations, and protect your premises. With advanced features and customizable options, we empower organizations to create a welcoming and secure environment for everyone.',
        benefits: [
          { title: 'Compliance and Reporting', text: 'Visitor management ensures compliance, safety, and streamlined reporting for audits.' },
          { title: 'Notification Systems', text: 'Visitor systems notify hosts instantly, ensuring real-time awareness of arrivals.' },
          { title: 'Customization', text: 'Customizable solutions tailor check-in, badges, and security, offering business flexibility.' },
          { title: 'Improved Safety', text: 'Visitor management aids safety by quickly identifying on-site individuals during emergencies.' }
        ]
      }
    },
    services: {
      devops: {
        name: 'DevOps Implementation',
        summary: 'DevOps brings streamlined and efficient processes to development and operations teams.',
        description: 'DevOps implementation delivers numerous benefits to development and operations teams by promoting streamlined collaboration and automation. This fosters faster time-to-market, higher software quality through CI/CD, and standardized infrastructure management with IaC, empowering teams to adapt efficiently and prioritize customer needs in a rapidly evolving tech environment.',
        brief: 'DevOps implementation promotes streamlined collaboration and automation, fostering faster time-to-market, higher software quality through CI/CD, and standardized infrastructure management with IaC.',
        benefits: [
          { title: 'Faster Time To Market', text: 'DevOps integrates development and operations, using automation to accelerate software delivery, enabling quick adaptation to customer needs and dynamic market demands.' },
          { title: 'Improved Quality', text: 'DevOps enhances software quality by automating testing and continuous integration, identifying and resolving issues early in the development process for efficiency.' },
          { title: 'Enhanced Collaboration', text: 'DevOps cultivates improved communication and collaboration among development and operations teams, enhancing synergy for more efficient and effective processes.' },
          { title: 'Reduced Downtime', text: 'Utilizing automation and monitoring tools mitigates system downtime, minimizing failures\' impact and enhancing overall system resilience and reliability.' }
        ]
      },
      ai: {
        name: 'AI Services',
        summary: 'AI services reshape industries, fostering data-driven decisions, streamlining processes, and enhancing overall efficiency for a competitive future.',
        description: 'In recent years, artificial intelligence, a computer science discipline emulating human cognitive functions such as learning and reasoning, has made remarkable strides. Its diverse applications, ranging from natural language processing to autonomous vehicles, exert profound influence across industries and daily life, sparking ongoing ethical and societal deliberations concerning its pervasive deployment.',
        brief: 'Artificial intelligence, emulating human cognitive functions such as learning and reasoning, has made remarkable strides. Its diverse applications exert profound influence across industries and daily life.',
        benefits: [
          { title: 'Efficiency', text: 'AI enhances efficiency by automating tasks, reducing reliance on manual labor, and optimizing processes for streamlined and effective operations.' },
          { title: 'Accuracy', text: 'AI systems, with their exceptional precision, execute tasks meticulously, minimizing errors and elevating work quality by ensuring a high level of accuracy in performance.' },
          { title: 'Productivity', text: 'AI streamlines tasks, freeing human capacity for creative and strategic endeavors, enhancing overall productivity by optimizing the division of labor.' },
          { title: 'Cost Savings', text: 'AI-driven automation lowers operational expenses, resulting in sustained financial savings over the long term by streamlining processes and increasing efficiency.' }
        ]
      },
      cloud: {
        name: 'Cloud Services & System Integration',
        summary: 'Cloud services optimize operations, facilitating seamless system integration for enhanced efficiency and scalability in a competitive landscape.',
        description: 'Cloud services and system integration play a crucial role in modern IT strategies, enabling organizations to leverage the cloud\'s flexibility, scalability, and cost-efficiency to integrate various technologies and data sources seamlessly. This optimization enhances operational efficiency, supports innovation, strengthens data security, and ensures global accessibility.',
        brief: 'Cloud services and system integration enable organizations to leverage the cloud\'s flexibility, scalability, and cost-efficiency to integrate various technologies and data sources seamlessly.',
        benefits: [
          { title: 'Mobile Access', text: 'Cloud services cater to the modern workforce by allowing mobile device access, facilitating convenience and adaptability to contemporary work requirements.' },
          { title: 'Competitive Advantage', text: 'Leveraging cloud services and system integration offers a competitive advantage, allowing swift responses to market shifts and evolving customer demands.' },
          { title: 'Innovation and Speed', text: 'Cloud services expedite application development, fostering innovation and ensuring faster time-to-market for efficient deployment and delivery.' },
          { title: 'Resource Optimization', text: 'Cloud services optimize IT resources, ensuring efficient usage and scaling to meet organizational needs precisely, minimizing unnecessary expenditure.' }
        ]
      },
      modernization: {
        name: 'Application Modernization',
        summary: 'Application modernization updates systems, fostering efficiency and competitiveness through streamlined processes and enhanced functionality.',
        description: 'Application modernization is a strategic, iterative process that involves reevaluating and enhancing legacy software systems using contemporary technologies and methodologies to improve performance, security, and scalability, enabling organizations to remain competitive in a dynamic digital landscape while reducing technical debt and operational risks associated with outdated applications.',
        brief: 'A strategic, iterative process that enhances legacy software systems using contemporary technologies and methodologies to improve performance, security, and scalability.',
        benefits: [
          { title: 'Better User Experience', text: 'Enhance interfaces and features to elevate the overall user experience, ensuring a more seamless and improved interaction with the system.' },
          { title: 'Improved Performance', text: 'Enhance application speed and efficiency through code optimization and embracing contemporary technologies for improved performance.' },
          // NOTE: the source site repeats the cloud "Innovation and Speed" text under this title — confirm the intended copy.
          { title: 'Cost Reduction', text: 'Cloud services expedite application development, fostering innovation and ensuring faster time-to-market for efficient deployment and delivery.' },
          { title: 'Enhanced Security', text: 'Mitigate vulnerabilities, enhance security measures, and minimize data breach and cyber threat risks to safeguard organizational integrity effectively.' }
        ]
      }
    }
  }
}

export type Messages = typeof en
export default en
