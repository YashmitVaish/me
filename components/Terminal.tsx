"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { about, awards, education, jobs, profile, projects, skills, smallBuilds, stats, status } from "@/lib/data";

type Line = { id: number; node: ReactNode };

const PROMPT = "guest@yashmit:~$";
const strip = (s: string) => s.replace(/\*\*/g, "");
const LINKS: Record<string, string> = { ...profile.links, resume: profile.resume, email: `mailto:${profile.email}` };

const HELP: [string, string][] = [
  ["whoami", "who this is"],
  ["about", "the longer version"],
  ["ls", "list projects (ls jobs, ls skills)"],
  ["cat <project>", "read a project, e.g. cat pdf2video"],
  ["status", "what's running in production"],
  ["experience", "roles, newest first"],
  ["awards", "things that went well"],
  ["contact", "how to reach me"],
  ["open <link>", "github, linkedin, leetcode, resume, email"],
  ["theme", "toggle light / dark"],
  ["clear", "clear the screen"],
  ["exit", "back to the normal site"],
];

const COMMANDS = [...HELP.map(([c]) => c.split(" ")[0]), "help", "history", "neofetch", "sudo", "uptime", "date", "echo", "pwd", "cd"];

const k = (s: string) => <span className="term__key">{s}</span>;
const m = (s: string) => <span className="term__muted">{s}</span>;

function pill(state: string, label: string) {
  const cls = state === "live" ? "term__ok" : state === "wip" ? "term__warn" : "term__muted";
  return <span className={cls}>● {label.padEnd(10)}</span>;
}

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const nextId = useRef(0);
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const print = (...nodes: ReactNode[]) =>
    setLines((ls) => [...ls, ...nodes.map((node) => ({ id: nextId.current++, node }))]);

  useEffect(() => {
    print(
      <>
        {k(`${profile.name}`)} {m("— portfolio shell v1.0")}
      </>,
      m("Type 'help' to see commands. Tab completes, ↑/↓ walks history."),
      " "
    );
    input.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  const printJobs = () => {
    jobs.forEach((j) => print(<>{k(j.role)} {m("@")} {j.org}</>, m(`  ${j.when} · ${j.where}`), `  ${j.lede}`));
    print(" ");
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print(
      <>
        <span className="term__prompt">{PROMPT}</span> {cmd}
      </>
    );
    if (!cmd) return;
    history.current.push(cmd);
    cursor.current = history.current.length;
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        print(...HELP.map(([c, d]) => <>{k(c.padEnd(16))}{m(d)}</>), " ");
        break;
      case "whoami":
        print(`${profile.name} · ${profile.location}`, m("Backend and LLM infrastructure engineer."), " ");
        break;
      case "about":
        print(about.lede, " ", ...about.notes.map((n) => m(n)), " ");
        break;
      case "ls":
        if (arg === "jobs" || arg === "experience") {
          printJobs();
          break;
        }
        if (arg === "skills") {
          print(...skills.map((g) => <>{k(g.group.padEnd(17))}{g.tools.map((t) => t.name).join(", ")}</>), " ");
          break;
        }
        print(
          ...projects.map((p) => <>{k(p.slug.padEnd(26))}{m(p.tag)}</>),
          ...smallBuilds.map((b) => <>{k(b.name.toLowerCase().replace(/\s+/g, "-").padEnd(26))}{m(b.meta)}</>),
          " ",
          m("Try: cat " + projects[0].slug)
        );
        break;
      case "cat": {
        if (!arg) {
          print("cat: missing project name. Try 'ls'.", " ");
          break;
        }
        const p = projects.find((x) => x.slug === arg || x.slug.startsWith(arg) || x.name.toLowerCase().startsWith(arg));
        if (p) {
          print(
            <span className="term__prompt"># {p.name}</span>,
            m(`${p.year} · ${p.kind} · ${p.tag}`),
            " ",
            ...p.points.map((pt) => `- ${strip(pt)}`),
            " ",
            <>{m("stack: ")}{p.stack.join(", ")}</>,
            p.repo ? <>{m("repo:  ")}<a href={p.repo} target="_blank" rel="noopener noreferrer">{p.repo}</a></> : m("repo:  private"),
            " "
          );
          break;
        }
        const b = smallBuilds.find((x) => x.name.toLowerCase().replace(/\s+/g, "-").startsWith(arg));
        if (b) {
          print(<span className="term__prompt"># {b.name}</span>, b.note, <a href={b.href} target="_blank" rel="noopener noreferrer">{b.href}</a>, " ");
          break;
        }
        print(`cat: ${arg}: no such project. Try 'ls'.`, " ");
        break;
      }
      case "status":
        print(m("SERVICE                    STATE       DETAIL"), ...status.map((s) => <>{s.name.padEnd(27)}{pill(s.state, s.label)}  {m(s.detail)}</>), " ");
        break;
      case "experience":
        printJobs();
        break;
      case "awards":
        print(...awards.map((a) => <>{k("🏆 " + a.title)} {m("— " + a.org)}</>), ...education.map((e) => <>{k("🎓 " + e.title)} {m("— " + e.meta)}</>), " ");
        break;
      case "contact":
        print(
          <>{m("email     ")}<a href={`mailto:${profile.email}`}>{profile.email}</a></>,
          ...Object.entries(profile.links).map(([n, u]) => <>{m(n.padEnd(10))}<a href={u} target="_blank" rel="noopener noreferrer">{u}</a></>),
          " "
        );
        break;
      case "open": {
        const url = LINKS[arg];
        if (!url) {
          print(`open: try one of ${Object.keys(LINKS).join(", ")}`, " ");
          break;
        }
        print(m(`opening ${arg}…`), " ");
        if (url.startsWith("mailto:")) location.href = url;
        else window.open(url, "_blank", "noopener");
        break;
      }
      case "theme": {
        const root = document.documentElement;
        const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = dark ? "light" : "dark";
        try {
          localStorage.setItem("theme", root.dataset.theme);
        } catch {}
        print(m(`theme set to ${root.dataset.theme}`), " ");
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "history":
        print(...history.current.map((h, i) => m(`${String(i + 1).padStart(4)}  ${h}`)), " ");
        break;
      case "exit":
        print(m("logout"));
        router.push("/");
        break;
      // the ones not in help
      case "sudo":
        print(<span className="term__warn">guest is not in the sudoers file. This incident will be reported.</span>, m("(to the ACM General Secretary, who is me)"), " ");
        break;
      case "neofetch":
        print(
          <>{k("guest@yashmit")}</>,
          m("-------------"),
          <>{k("OS        ")}Thapar Institute, B.E. CoE 2024–2028</>,
          <>{k("Host      ")}{profile.location}</>,
          <>{k("Kernel    ")}Python, Go</>,
          <>{k("Shell     ")}FastAPI + Redis</>,
          <>{k("Uptime    ")}5,000+ concurrent, zero downtime</>,
          ...stats.map((s) => <>{k(s.label.padEnd(10).slice(0, 10))}{s.value}</>),
          " "
        );
        break;
      case "uptime":
        print("up since 2024, load average: 1 internship, 1 chapter, 4 side projects", " ");
        break;
      case "date":
        print(new Date().toString(), " ");
        break;
      case "echo":
        print(args.join(" "), " ");
        break;
      case "pwd":
        print("/home/guest", " ");
        break;
      case "cd":
        print(m("there's nowhere else to go. try 'exit'."), " ");
        break;
      case "rm":
        print(<span className="term__warn">rm: permission denied. Nice try.</span>, " ");
        break;
      default:
        print(`${name}: command not found. Type 'help'.`, " ");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = value.split(" ");
      const pool =
        parts.length === 1 ? COMMANDS : parts[0] === "cat" ? projects.map((p) => p.slug) : parts[0] === "open" ? Object.keys(LINKS) : [];
      const hits = pool.filter((c) => c.startsWith(parts[parts.length - 1]));
      if (hits.length === 1) setValue([...parts.slice(0, -1), hits[0]].join(" ") + " ");
      else if (hits.length > 1) print(m(hits.join("  ")));
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const chips = ["help", "whoami", "ls", "status", "cat pdf2video", "contact"];

  return (
    <>
      <div className="term">
        <div className="term__top">
          <span className="term__dot" style={{ background: "#ff5f57" }} />
          <span className="term__dot" style={{ background: "#febc2e" }} />
          <span className="term__dot" style={{ background: "#28c840" }} />
          <span className="term__title">guest@yashmit: ~</span>
        </div>
        <div className="term__screen" ref={screen} onClick={() => window.getSelection()?.isCollapsed && input.current?.focus()} aria-live="polite">
          {lines.map((l) => (
            <div className="term__line" key={l.id}>
              {l.node}
            </div>
          ))}
          <form
            className="term__form"
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
          >
            <label htmlFor="term-in" className="term__prompt">
              {PROMPT}
            </label>
            <input
              id="term-in"
              ref={input}
              className="term__input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Command"
            />
          </form>
        </div>
      </div>
      <div className="term__chips" aria-label="Quick commands">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => (run(c), input.current?.focus())}>
            {c}
          </button>
        ))}
      </div>
      <p className="term__note">No keyboard? Tap a command above.</p>
    </>
  );
}
