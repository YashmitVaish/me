import Link from "next/link";
import type { Project } from "@/lib/data";

// Preview panel for a project. Drop public/work/<slug>.png to replace the stat card with a screenshot.
export default function ProjectShot({ project, link, image }: { project: Project; link?: boolean; image?: string }) {
  const inner = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" loading="lazy" />
  ) : (
    <>
      <span className="shot__name">{project.name}</span>
      <span className="shot__card">
        <span className="shot__big">{project.shot.big}</span>
        <span className="shot__small">{project.shot.small}</span>
      </span>
    </>
  );
  return link ? (
    <Link className="case__shot" href={`/work/${project.slug}/`} tabIndex={-1} aria-hidden="true">
      {inner}
    </Link>
  ) : (
    <div className="case__shot">{inner}</div>
  );
}
