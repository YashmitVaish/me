import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import Effects from "@/components/Effects";
import JobCard from "@/components/JobCard";
import Portrait from "@/components/Portrait";
import ProjectShot from "@/components/ProjectShot";
import SiteBar from "@/components/SiteBar";
import StatusPill from "@/components/StatusPill";
import { ICON, about, awards, education, jobs, profile, projects, skills, smallBuilds, stats, status } from "@/lib/data";

const HEADLINE_PLAIN = ["Backend", "engineer", "building"];
const HEADLINE_BOLD = ["LLM", "infrastructure", "and", "async", "systems"];
const HEADLINE_TAIL = ["that", "stay", "up", "when", "real", "people", "show", "up."];

function Words({ words, offset }: { words: string[]; offset: number }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">
            <span style={{ "--i": offset + i } as React.CSSProperties}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Effects />
      <div className="site">
        <SiteBar />

        <section className="hero" data-hero>
          <div className="hero__grid" aria-hidden="true">
            <div className="hero__lines" data-hero-lines />
          </div>
          <div className="hero__light" data-hero-light aria-hidden="true" />
          <div className="wrap hero__inner">
            <p className="eyebrow hero__eyebrow fade-in">{profile.location}</p>
            <h1 className="name">
              <span className="name__line">
                <span>{profile.first}</span>
              </span>
              <span className="name__line">
                <span>{profile.last}</span>
              </span>
            </h1>
            <p className="headline">
              <Words words={HEADLINE_PLAIN} offset={0} />
              <b>
                <Words words={HEADLINE_BOLD} offset={HEADLINE_PLAIN.length} />
              </b>
              <Words words={HEADLINE_TAIL} offset={HEADLINE_PLAIN.length + HEADLINE_BOLD.length} />
            </p>
            <div className="hero__actions fade-in">
              <a className="cta" href="#work">
                <span className="cta__fill" aria-hidden="true" />
                <span className="cta__text">See the work</span>
                <span className="cta__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
              <Link className="ghost" href="/terminal">
                <span className="ghost__dot" aria-hidden="true" />
                Prefer a shell? There&apos;s a terminal version
                <span className="ghost__badge">try it</span>
              </Link>
            </div>
            <ul className="s-stats fade-in">
              {stats.map((s) => (
                <li key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <div className="section__head reveal">
              <p className="eyebrow">About</p>
              <h2>Hi, I&apos;m Yashmit.</h2>
            </div>
            <div className="about__grid">
              <Portrait src={profile.photo} name={profile.name} initials={profile.initials} caption={about.caption} />
              <div>
                <p className="about__lede reveal">{about.lede}</p>
                <div className="about__notes reveal">
                  {about.notes.map((n) => (
                    <p key={n}>{n}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="wrap">
            <div className="section__head reveal">
              <p className="eyebrow">Toolbox</p>
              <h2>What I build with</h2>
            </div>
            <div className="skills__grid">
              {skills.map((g) => (
                <div className="skillgroup reveal" key={g.group}>
                  <h3>{g.group}</h3>
                  <div className="s-tools">
                    {g.tools.map((t) =>
                      t.icon ? (
                        <span className="s-tool" key={t.name}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${ICON}/${t.icon}.svg`} alt="" width={30} height={30} loading="lazy" />
                          {t.name}
                        </span>
                      ) : (
                        <span className="s-tool s-tool--text" key={t.name}>
                          {t.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap xp__grid">
            <aside className="xp__index">
              <div className="section__head reveal" style={{ marginBottom: 0 }}>
                <p className="eyebrow">Experience</p>
                <h2>Where I&apos;ve been</h2>
              </div>
              <ol className="xp__list" aria-label="Roles">
                {jobs.map((j, i) => (
                  <li key={j.id}>
                    <a className="xp__item" href={`#${j.id}`} data-xp-item data-on={i === 0 ? "1" : "0"}>
                      <span className="xp__bullet" aria-hidden="true" />
                      <span>
                        <b>{j.org}</b>
                        <span>
                          {j.role} · {j.year}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
            <div className="xp__detail">
              {jobs.map((j, i) => (
                <JobCard key={j.id} job={j} first={i === 0} />
              ))}
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="wrap">
            <div className="section__head reveal">
              <p className="eyebrow">Selected work</p>
              <h2>Four things worth opening</h2>
              <p>Each one has a full write-up: what it does, how it&apos;s built, and the numbers.</p>
            </div>
            <div className="cases">
              {projects.map((p, i) => (
                <article className="case reveal" key={p.slug}>
                  <ProjectShot project={p} image={p.image} link />
                  <div className="case__body">
                    <p className="case__no">
                      {String(i + 1).padStart(2, "0")} / {p.year} · {p.status ? <StatusPill state={p.status} /> : p.kind}
                    </p>
                    <h3>{p.name}</h3>
                    <p className="case__tag">{p.tag}</p>
                    <p className="case__lede">{p.lede}</p>
                    {p.award && <p className="case__award">🏆 {p.award}</p>}
                    <div className="s-chips">
                      {p.chips.map((c) => (
                        <span key={c} className="s-chip">
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link className="case__go" href={`/work/${p.slug}/`}>
                      Read the write-up <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="minis">
              <div className="minis__head reveal">
                <p className="eyebrow">Also built</p>
              </div>
              {smallBuilds.map((b) => (
                <a className="mini reveal" key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
                  <b>
                    {b.name} <span aria-hidden="true">↗</span>
                  </b>
                  <p>{b.note}</p>
                  <span>{b.meta}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section__head reveal">
              <p className="eyebrow">The rest of it</p>
              <h2>Education, awards, what&apos;s running</h2>
            </div>
            <div className="creds">
              <div className="cred reveal">
                <h3>Education</h3>
                <ul>
                  {education.map((e) => (
                    <li key={e.title}>
                      <b>{e.title}</b>
                      <span>{e.org}</span>
                      <span>{e.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cred reveal">
                <h3>Awards</h3>
                <ul>
                  {awards.map((a) => (
                    <li key={a.title}>
                      <b>{a.title}</b>
                      <span>{a.org}</span>
                      <span>{a.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cred reveal">
                <h3>Running right now</h3>
                <ul>
                  {status.map((s) => (
                    <li key={s.name}>
                      <StatusPill state={s.state} label={s.label} />
                      <b>{s.name}</b>
                      <span>{s.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="closer" id="contact">
          <div className="closer__field" aria-hidden="true" />
          <div className="wrap closer__inner">
            <h2>
              <span style={{ display: "block" }}>Let&apos;s build</span>
              <span style={{ display: "block" }}>something.</span>
            </h2>
            <p>
              Open to backend and LLM infrastructure roles. Send me the problem and I&apos;ll reply with how I&apos;d approach it.
            </p>
            <div className="mailrow">
              <a className="closer__mail" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <div className="closer__links">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode <span aria-hidden="true">↗</span>
              </a>
              <a href={profile.resume} download>
                Résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="door" id="terminal">
              <div className="door__copy">
                <p className="door__title">Rather read this from a shell?</p>
                <p>
                  The same portfolio, as a terminal. Type <code>help</code>, poke around, run <code>status</code> to see what&apos;s live.
                </p>
                <p>There may be a few commands that aren&apos;t in the help text.</p>
              </div>
              <div className="door__go">
                <Link href="/terminal">
                  Open the terminal <span aria-hidden="true">→</span>
                </Link>
                <p className="door__note">Works best with a keyboard.</p>
              </div>
            </div>
          </div>
        </section>

        <a className="totop" href="#top" aria-label="Back to top">
          <span aria-hidden="true">↑</span>
        </a>
        <footer className="foot">
          <div className="wrap">
            <span>
              {profile.name} · {profile.location}
            </span>
            <span>Thanks for scrolling all the way down.</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
