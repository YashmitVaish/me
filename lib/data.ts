// All site content lives here. Edit this file to update the portfolio;
// the pages only handle layout.

export const ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

export const profile = {
  name: "Yashmit Vaish",
  first: "Yashmit",
  last: "Vaish",
  initials: "YV",
  location: "Lucknow, India",
  email: "contact@yashmitvaish.me",
  resume: "/resume.pdf",
  photo: "/me.jpg",
  links: {
    github: "https://github.com/YashmitVaish",
    linkedin: "https://www.linkedin.com/in/yashmit-vaish-9184a1315/",
    leetcode: "https://leetcode.com/u/yashmitv/",
  },
};

export const stats = [
  { value: "5,000+", label: "Peak concurrent users" },
  { value: "30%", label: "LLM cost cut" },
  { value: "100+", label: "Lectures generated" },
  { value: "9.28", label: "CGPA" },
];

export const about = {
  lede: "I build backend systems and LLM infrastructure: RAG pipelines, async job queues, and the deployment work that keeps them up when real people show up.",
  notes: [
    "Computer Engineering at Thapar Institute of Engineering and Technology, class of 2028, with a CGPA of 9.28.",
    "Right now I'm the sole engineer on the AI architecture at Clyra, and General Secretary of Thapar's ACM Student Chapter, where I also end up running the deployments.",
    "On the side I'm building DigiTwin, a local-first AI assistant with long-term memory, and writing Go for a Redis-style server and a peer-to-peer compute experiment.",
  ],
  caption: "ships on fridays anyway",
};

type Tool = { name: string; icon?: string };
export const skills: { group: string; tools: Tool[] }[] = [
  {
    group: "Languages",
    tools: [
      { name: "Python", icon: "python/python-original" },
      { name: "Go", icon: "go/go-original-wordmark" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "C++", icon: "cplusplus/cplusplus-original" },
      { name: "C", icon: "c/c-original" },
    ],
  },
  {
    group: "LLM engineering",
    tools: ["RAG", "GraphRAG", "LangChain", "LangGraph", "CrewAI", "vLLM", "Ollama", "llama.cpp", "GGUF quantization"].map((name) => ({ name })),
  },
  {
    group: "Backend",
    tools: [
      { name: "FastAPI", icon: "fastapi/fastapi-original" },
      { name: "Django", icon: "django/django-plain" },
      { name: "Gin" },
      { name: "Redis", icon: "redis/redis-original" },
      { name: "Celery" },
      { name: "Microservices" },
    ],
  },
  {
    group: "Data",
    tools: [
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Neo4j", icon: "neo4j/neo4j-original" },
      { name: "Elasticsearch", icon: "elasticsearch/elasticsearch-original" },
      { name: "MongoDB", icon: "mongodb/mongodb-original" },
      { name: "SQLite", icon: "sqlite/sqlite-original" },
      { name: "MySQL", icon: "mysql/mysql-original" },
      { name: "Supabase", icon: "supabase/supabase-original" },
      { name: "pgvector" },
      { name: "Pinecone" },
    ],
  },
  {
    group: "Infra",
    tools: [
      { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark" },
      { name: "Azure", icon: "azure/azure-original" },
      { name: "Docker", icon: "docker/docker-original" },
      { name: "Nginx", icon: "nginx/nginx-original" },
      { name: "Cloudflare", icon: "cloudflare/cloudflare-original" },
      { name: "CI/CD", icon: "githubactions/githubactions-original" },
    ],
  },
  {
    group: "Tools",
    tools: [
      { name: "Git", icon: "git/git-original" },
      { name: "GitHub", icon: "github/github-original" },
      { name: "Vercel", icon: "vercel/vercel-original" },
      { name: "Locust" },
    ],
  },
];

export type Job = {
  id: string;
  org: string;
  role: string;
  year: string;
  when: string;
  where: string;
  lede: string;
  points: string[]; // **bold** is rendered as <strong>
  chips: string[];
};

export const jobs: Job[] = [
  {
    id: "job-clyra",
    org: "Clyra",
    role: "Generative AI Intern",
    year: "2025",
    when: "Dec 2025 – present",
    where: "Remote",
    lede: "Sole engineer on the AI architecture of an AI-powered content platform.",
    points: [
      "Designed and shipped production **RAG pipelines on LangGraph, Elasticsearch and Neo4j**, with async job processing, retries and error handling. Load-tested with Locust to sustain **30–40 content files a day**.",
      "Cut LLM inference cost by **30%** and redundant re-processing by **70–80%** with model routing and response caching: simple tasks go to cheaper models, and repeated retrieval calls are cached.",
      "Raised RAG output quality by **30% (ROUGE)** by redesigning chunking, tuning retrieval across Elasticsearch and Neo4j, and reworking agent orchestration. Validated on a held-out content benchmark.",
    ],
    chips: ["LangGraph", "Elasticsearch", "Neo4j", "Locust", "Python"],
  },
  {
    id: "job-campus-portal",
    org: "Thapar Institute",
    role: "Backend Developer Intern",
    year: "2026",
    when: "2026",
    where: "Patiala",
    lede: "Built and deployed the Campus Permission Portal, Thapar's night permission system, in a two-person team.",
    points: [
      "Gathered requirements from faculty and administration, scoped **multi-role approval workflows**, then built and deployed the platform. Observed a peak of **5,000+ concurrent users** in usage logs, with **zero downtime**.",
      "**Async FastAPI and a Redis job queue** behind an Nginx reverse proxy absorb bursts in the portal's daily 4 to 5 hour active window, at roughly **3,000 page views a day**.",
      "Transactional email with direct status links cut follow-up questions to faculty from **50+ to 1–2 a week**.",
      "Unit tests cover the core approval logic. Deployed on **AWS** through the admission-cycle traffic peak.",
    ],
    chips: ["FastAPI", "React", "PostgreSQL", "Redis", "Nginx", "AWS"],
  },
  {
    id: "job-acm",
    org: "ACM Student Chapter",
    role: "General Secretary",
    year: "2026",
    when: "Aug 2026 – present",
    where: "Thapar Institute",
    lede: "Running a 100+ member chapter, and the infrastructure underneath it.",
    points: [
      "Lead **100+ members** across coordinated sub-teams. Planned and ran **4 chapter-wide events**, including a freshman orientation, a hackathon and several technical workshops.",
      "Own event operations end to end: planning, logistics, team coordination and on-ground execution.",
      "Ran deployment for the chapter's **recruitment test** in Oct 2026 on AWS EC2, Azure VMs and S3: **1,000 students**, **500 concurrent** at peak, **570 ms p95** and **no incidents**. Deployment was my part; I did not build the application.",
      "Manage the chapter's **Cloudflare** account for DNS and email routing, and handle its deployments on AWS EC2, Azure VMs and S3.",
    ],
    chips: ["Cloudflare", "AWS EC2", "S3", "Azure VM", "Nginx", "Docker"],
  },
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  kind: string;
  tag: string;
  lede: string;
  award?: string;
  status?: "live" | "wip";
  shot: { big: string; small: string }; // shown in the preview panel when there is no image
  image?: string; // e.g. "/work/pdf2video.png" once you add a screenshot to public/work/
  chips: string[];
  repo?: string;
  points: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "campus-permission-portal",
    name: "Campus Permission Portal",
    year: "2026",
    kind: "Production",
    tag: "Thapar's night permission system",
    lede: "Multi-role approval workflows for an entire campus, built by a two-person team and live in production.",
    status: "live",
    shot: { big: "5,000+", small: "peak concurrent users · zero downtime" },
    image: "/work/campus-permission-portal.png",
    chips: ["FastAPI", "React", "PostgreSQL", "Redis"],
    points: [
      "Gathered requirements from faculty and administration, scoped **multi-role approval workflows**, then built and deployed the platform. Observed a peak of **5,000+ concurrent users** in usage logs, with **zero downtime**.",
      "**Async FastAPI and a Redis job queue** behind an Nginx reverse proxy absorb bursts in the portal's daily 4 to 5 hour active window, at roughly **3,000 page views a day**.",
      "Transactional email with direct status links cut follow-up questions to faculty from **50+ to 1–2 a week**.",
      "Unit tests cover the core approval logic. Deployed on AWS through the admission-cycle traffic peak.",
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Supabase", "Nginx", "SMTP", "AWS"],
  },
  {
    slug: "pdf2video",
    name: "Pdf2Video",
    year: "2025",
    kind: "System",
    tag: "Academic PDFs into narrated, animated lectures",
    lede: "A fully offline multi-agent pipeline that has turned academic PDFs into 100+ animated lectures with Manim. No GPU rental, no cloud bill.",
    award: "Became EDUSCENE: Innovation Award, Ulster University",
    shot: { big: "100+", small: "lectures generated · fully offline" },
    image: "/work/pdf2video.jpg",
    chips: ["CrewAI", "LangChain", "Manim", "Piper"],
    repo: "https://github.com/YashmitVaish/Pdf2Video",
    points: [
      "Multi-agent pipeline that turned academic PDFs into **100+ narrated, animated lectures** with Manim, running fully offline. No GPU rental or cloud cost.",
      "**Multi-process task scheduling** and CPU-only TTS through Piper cut per-video generation time by **15%**.",
      "**Six CrewAI agents** (orchestrator, extractor, script generator, scene generator, audio renderer, final compositor) share context through LangChain across a microservices task architecture.",
      "This pipeline became the base of **EDUSCENE**, my Innovation Award entry at the Agentic AI Hackathon 2025, Ulster University.",
    ],
    stack: ["Manim", "LangChain", "CrewAI", "Ollama", "vLLM", "Piper"],
  },
  {
    slug: "digitwin",
    name: "DigiTwin",
    year: "2026",
    kind: "In progress",
    tag: "A personal AI assistant with long-term memory",
    lede: "An assistant that remembers your goals, preferences and life, gives you a daily brief and keeps you on track. It runs on a local model by default and only reaches for the cloud when you let it.",
    status: "wip",
    shot: { big: "local-first", small: "Ollama · ChromaDB · graph memory" },
    image: "/work/digitwin.svg",
    chips: ["FastAPI", "Ollama", "ChromaDB", "Neo4j"],
    repo: "https://github.com/YashmitVaish/digi2win",
    points: [
      "**Local-first chat:** a FastAPI backend talks to Mistral 7B through Ollama. In auto mode it health-checks the local model and **falls back to a cloud LLM** only when local inference is unavailable.",
      "**Redacted before it leaves:** anything sent to the cloud provider first goes through a local **spaCy NER** model plus regex, which swaps names, organisations, places, dates and amounts for placeholders.",
      "**A “user brain” of typed memories:** messages are split into phrases, chunked and classified as **goals, preferences, facts, events or style**, then embedded (nomic-embed-text through Ollama, with a local bge-small fallback) into **ChromaDB**, with metadata in SQL.",
      "**Retrieval that ages like memory:** each memory is scored by importance × type weight × similarity, with a **30-day half-life decay**, a boost for frequently recalled memories and an emotional-weight term.",
      "Background tasks extract profile facts and decide what is worth remembering after every chat. Goals, reminders, sessions and onboarding each have their own API.",
      "**Next:** moving the memory store to a **graph database (Neo4j) for GraphRAG**, and running quantized GGUF models on the phone through llama.cpp.",
    ],
    stack: ["FastAPI", "Ollama", "Mistral 7B", "ChromaDB", "sentence-transformers", "spaCy NER", "SQLAlchemy", "Celery", "Redis", "Neo4j (planned)", "llama.cpp (planned)"],
  },
  {
    slug: "vdo-process",
    name: "Media Pipeline",
    year: "2025",
    kind: "System",
    tag: "Async video processing and normalization",
    lede: "A video-processing microservice with about 6 s end-to-end latency on live streams, shipped as one Docker Compose command.",
    shot: { big: "~6 s", small: "end-to-end live-stream latency" },
    chips: ["FastAPI", "Redis", "FFmpeg", "MinIO"],
    repo: "https://github.com/YashmitVaish/vdo-process",
    points: [
      "Async video-processing microservice with about **6 s end-to-end latency** on live-stream processing. Redis queues, MinIO storage and FFmpeg normalization, shipped with **one-command Docker Compose**.",
      "Signed upload URLs, FFprobe metadata analysis, **multi-pass normalization** of resolution, FPS and loudness, and crossfade merge, inside a CI/CD-driven pipeline built to scale horizontally.",
    ],
    stack: ["FastAPI", "Redis", "MinIO", "FFmpeg", "MongoDB", "MediaMTX", "Docker"],
  },
];

export const smallBuilds = [
  {
    name: "Contest Portal Backend",
    note: "Whole backend for the FCC contest portal, solo. Go and Gin on Supabase, served 500 people.",
    meta: "Go · Gin · Supabase · Locust",
    href: "https://github.com/YashmitVaish/contest-portal-backend",
  },
  {
    name: "Dredis",
    note: "A Redis-style server written in Go. Handles a basic command set, early stage.",
    meta: "Go · Experiment",
    href: "https://github.com/YashmitVaish/Dredis",
  },
  {
    name: "P2PCS",
    note: "Peer-to-peer compute sharing: run your code on someone else's machine. Signalling service plus executor.",
    meta: "Go · In progress",
    href: "https://github.com/YashmitVaish/P2PCS",
  },
];

export const education = [
  {
    title: "B.E. Computer Engineering",
    org: "Thapar Institute of Engineering & Technology",
    meta: "CGPA 9.28 · 2024 – 2028",
  },
];

export const awards = [
  {
    title: "Innovation Award",
    org: "Agentic AI Hackathon 2025, Ulster University (UK)",
    meta: "EDUSCENE · Team .gitignore",
  },
];

export const status: { name: string; state: "live" | "done" | "wip"; label: string; detail: string }[] = [
  { name: "Campus Permission Portal", state: "live", label: "Live", detail: "5,000+ peak concurrent, zero downtime" },
  { name: "Clyra RAG platform", state: "live", label: "Live", detail: "30–40 content files a day" },
  { name: "ACM test portal", state: "done", label: "Delivered", detail: "500 concurrent, 570 ms p95" },
  { name: "DigiTwin", state: "wip", label: "Building", detail: "Local-first AI with long-term memory" },
];
