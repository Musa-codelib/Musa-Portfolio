export const portfolio = {
  // Hero Section
  hero: {
    indexLabel: "00 / INDEX",
    name: "MUSA.",
    headline: "AI Engineer. Video Editor. Builder.",
    description: "I build AI tools, edit cinematic video, and something between them.",
    ctaPrimary: {
      text: "View Work",
      href: "#selected-work",
    },
    ctaSecondary: {
      text: "Get in Touch →",
      href: "#connect",
    },
    stats: [
      { label: "3+ AI Tools Built" },
      { label: "GIKI BSc AI 2025" },
      { label: "Pakistan 🇵🇰" },
      { label: "AI + Video + Web" },
    ],
  },

  // About Section
  about: {
    sectionLabel: "01 / Highlights",
    //sectionSubtitle: "ARCHIVAL DOSSIER",
    bio: "AI graduate from GIKI (BSc AI '25). Combining machine learning with cinematic video production since university. Currently building mkodes — an independent AI tools studio.",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "@mkodes.minimal", url: "https://instagram.com" },
    ],
    stats: [
      {
        id: "RECORD_01",
        value: "3+",
        label: "AI Tools Shipped",
      },
      {
        id: "RECORD_02",
        value: "2025",
        label: "GIKI Graduate",
      },
      {
        id: "RECORD_03",
        value: "PKR → $",
        label: "Going Global",
      },
    ],
  },

  // Skills Section
  skills: {
    sectionLabel: "02 / CAPABILITIES",
    //sectionSubtitle: "TECHNICAL MATRIX",
    categories: [
      {
        title: "AI & Software",
        subtitle: "MODELS, RUNTIMES, ARCHITECTURES",
        items: [
          "Python",
          "PyTorch",
          "SAM2",
          "Whisper",
          "Gemini",
          "CLIP",
          "OpenCV",
          "Groq/Llama 3.1",
          "Electron",
          "aiohttp",
          "SocketIO",
          "React",
          "Next.js",
          "Node.js",
          "MongoDB",
        ],
      },
      {
        title: "Video Production",
        subtitle: "EDITORIAL, COLOR, FINISHING",
        items: [
          "Adobe Premiere Pro",
          "DaVinci Resolve",
          "Fusion",
          "Color Grading",
          "Documentary Editing",
          "Cinematography",
        ],
      },
      {
        title: "Design & 3D",
        subtitle: "VISUAL FORM & SPATIAL ASSETS",
        items: [
          "Blender",
          "Photoshop",
          "Illustrator",
          "Photopea",
          "Affinity",
          "Canva",
        ],
      },
    ],
  },

  // Work Section
  work: {
    sectionLabel: "03 / WORK",
    tabs: [
      { id: "ai-tools", label: "[AI Tools]" },
      { id: "video", label: "[Video]" },
      { id: "web", label: "[Web]" },
    ],
    projects: {
      "ai-tools": {
        featured: {
          label: "FLAGSHIP RELEASE · 2025",
          title: "MK Masker V2.0",
          status: "PRODUCTION ACTIVE",
          description:
            "Automated video subject segmentation & rotoscoping engine built on SAM2 and OpenCV. Eliminates frame-by-frame masking latency with native local inference acceleration.",
          techStack: ["PyTorch", "SAM2", "Electron", "Python"],
          links: [
            { text: "GitHub →", url: "https://github.com" },
            { text: "mkodes.ai →", url: "https://mkodes.ai" },
          ],
        },
        secondary: [
          {
            id: "AUDIO_TRANSCRIBE_ENGINE",
            title: "VidScribe AI",
            status: "Coming Soon",
            description:
              "Intelligent timestamp-synchronized documentary script generation and automated speech diarization pipeline optimized for multi-speaker longform video footage.",
            techStack: ["Whisper v3", "Groq", "FastAPI"],
          },
          {
            id: "SEMANTIC_BROLL_FINDER",
            title: "MK Scout",
            status: "Coming Soon",
            description:
              "Vectorized local footage exploration tool powered by open-source vision embeddings. Search thousands of gigabytes of unstructured camera rolls via natural language prompts.",
            techStack: ["CLIP ViT-L", "ChromaDB", "Electron"],
          },
        ],
      },
      video: {
        projects: [
          {
            id: 1,
            category: "Islamic / Documentary",
            title: "Echoes of the Indus",
            description:
              "Direction, pacing, and archival audio reconstruction exploring historical trade corridors across northern Pakistan.",
            software: "DaVinci Resolve Studio",
            year: "2024",
            aspectRatio: "16:9 · 4K DCI",
            imageUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDJsZmGIOqQMTPCmePelkRC280xNiTwoMm7SwpGE--dICViS5Oe2dsx9QCMBW9LonqaJhpFy6XXpdyPY1aNX3GH0fVDSZyCyz7NRqurtAnDdL-SFWApckpskJpKC-IMOLFb4HyJdzxAbIN6l1vLQz69OPI6x0Dy9s_MVCoWUjpNrg1_5yaVlHgizXcRrGqBN0EvOFWkA1YU3kR5uVd8I4dRGVAFvDn7p6fxgdA_XI2ImRn7gMEynD829w",
            imageAlt:
              "Monochromatic high contrast cinematic film still showing an ancient stone architectural courtyard in Lahore Pakistan under overcast sky, precise geometric shadows, 35mm film grain documentary aesthetic.",
          },
          {
            id: 2,
            category: "Educational / Technical",
            title: "Machine Mind: GIKI Monograph",
            description:
              "Comprehensive pacing and multi-camera documentary capture analyzing graduate deep-learning research pipelines.",
            software: "Premiere Pro · Fusion",
            year: "2024",
            aspectRatio: "16:9 · 4K DCI",
            imageUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCJKFgxPWbmIU1jiFZNCRoQ0KJveD-HObgRh6OvP6zpwV1ZmB58So9w12hYAcCTXhiIOWIcfLlOXbWB-OYk3T_BBDbb7FarVBDQmvCNmMr0Ty1fDPzqtYVqrPEvnuFjlCNGxlScOh_cHYNm2EVxeq8f9kGNzeDAT-iDuec_VYcNlCv8A4zeUyAK5sa64rYfYGdgX_iQ3QTRDK28ISLmriXc7CA75VyehVqwHbnBYrnkMrYAws8uDRwIhg",
            imageAlt:
              "Editorial black and white portrait of a mechanical scholar working in a concrete engineering laboratory, sharp natural lighting from high clerestory windows, deep architectural brutalist lines.",
          },
          {
            id: 3,
            category: "Documentary / Cinematic",
            title: "The Karakoram Dialectic",
            description:
              "Atmospheric landscape cinematography with strict visual pacing and high dynamic range monochrome grading.",
            software: "Color Grading · Edit",
            year: "2023",
            aspectRatio: "16:9 · 4K DCI",
            imageUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuB3VL_JSESMCRuq8-6mNnyIXWtZ2NuIRlLl3e6SdHpJnBUXr2Bc8f-ePKI4LmOg6lGnVRu_GCe8ttFzVHICDIOPpeqBKzSDcWn0Gm09r8StZoFZflWtb2hgQNsdAQvhvOO4j4rbKctwhQLk61L_WkSNy3lAETQIyFavq0LJ9cv8oKGIbwKvL6Web9kFi-z9cRWOqyTZabrFVZyccknESMh8FUUjHpjvT1YRQhDuIZA_Ndp4ZrEkSmVL-g",
            imageAlt:
              "Monochrome landscape frame showing brutalist concrete spillway and mountain ridges in northern Pakistan, dramatic chiaroscuro contrast with misty dawn sky.",
          },
        ],
        archiveLinks: [
          { text: "Google Drive Archive →", url: "https://drive.google.com" },
          { text: "Instagram Studio →", url: "https://instagram.com" },
        ],
      },
      web: {
        projects: [
          {
            id: "SYS_WEB_01",
            title: "Perceptive Learning Zone",
            status: "Production",
            description:
              "Adaptive digital instructional platform designed with severe grid discipline, strict typographic contrast, and robust server-side analytics for higher-education learning tracks.",
            techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
            links: [
              { text: "Live Deployment →", url: "#" },
              { text: "Source Archive →", url: "https://github.com" },
            ],
          },
          {
            id: "INDEX_RESERVED",
            title: "More coming soon",
            description:
              "Additional web systems, API gateways, and client projects currently in private deployment staging.",
            isPlaceholder: true,
          },
        ],
      },
    },
  },

  // Mkodes Block Section
  mkodes: {
    sectionLabel: "04 / STUDIO",
    title: "mkodes.",
    description:
      "My independent AI tools studio. Building software that eliminates the most painful parts of video post-production.",
    cta: {
      text: "Visit mkodes.ai →",
      url: "https://mkodes.ai",
    },
  },

  // Contact Section
  contact: {
    sectionLabel: "05 / CONNECT",
    //sectionSubtitle: "TRANSMISSION CHANNEL",
    headline: "Start a Conversation.",
    description:
      "Available for technical AI tools consulting, specialized video post-production pipelines, and select engineering initiatives.",
    email: "musa88@alumni.giki.edu.pk",
    emailLabel: "INSTITUTIONAL DIRECT CHANNEL",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Instagram", url: "https://instagram.com" },
    ],
    form: {
      fields: [
        {
          name: "name",
          label: "IDENTIFIER / NAME",
          placeholder: "e.g. Tariq Vance",
          type: "text",
        },
        {
          name: "email",
          label: "TRANSMISSION RETURN / EMAIL",
          placeholder: "name@domain.com",
          type: "email",
        },
        {
          name: "message",
          label: "DISPATCH MESSAGE",
          placeholder: "Describe project parameters or collaborative scope...",
          type: "textarea",
        },
      ],
      submitText: "Send Message →",
      successMessage: "TRANSMISSION RECORDED. ACKNOWLEDGMENT IMMINENT.",
    },
  },

  // Footer
  footer: {
    copyright: "© 2025 Musa",
    location: "Pakistan 🇵🇰",
    stack: "Built with MERN stack.",
  },

  // Navigation
  navigation: [
    { label: "Work", href: "#selected-work" },
    { label: "Skills", href: "#capabilities" },
    { label: "mkodes", href: "#studio" },
    { label: "Contact", href: "#connect" },
  ],
};
