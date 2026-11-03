import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Effects from "@/components/Effects";
import ProjectShot from "@/components/ProjectShot";
import Rich from "@/components/Rich";
import SiteBar from "@/components/SiteBar";
import StatusPill from "@/components/StatusPill";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.lede } : {};
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="top">
      <Effects />
      <div className="site">
        <SiteBar back />
        <article className="doc">
          <p className="doc__meta">
            <span>
              {String(i + 1).padStart(2, "0")} / {p.year}{p.status ? "" : ` · ${p.kind}`}
            </span>
            {p.status && <StatusPill state={p.status} />}
          </p>
          <h1>{p.name}</h1>
          <p className="doc__tag">{p.tag}</p>
          <p className="doc__lede">{p.lede}</p>
          {p.award && <p className="case__award">🏆 {p.award}</p>}

          <ProjectShot project={p} image={p.image} />

          <div className="doc__body">
            <div className="reveal">
              <h2>Highlights</h2>
              <ul className="points">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <Rich text={pt} />
                  </li>
                ))}
              </ul>
            </div>
            <aside className="doc__side reveal">
              <h2>Stack</h2>
              <div className="s-chips">
                {p.stack.map((s) => (
                  <span key={s} className="s-chip">
                    {s}
                  </span>
                ))}
              </div>
              {p.repo && (
                <div className="doc__links">
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    Source on GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </aside>
          </div>

          <div className="doc__foot">
            <Link href="/#work">← All work</Link>
            <Link href={`/work/${next.slug}/`}>
              Next: {next.name} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
