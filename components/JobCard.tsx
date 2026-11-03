"use client";

import { useState } from "react";
import type { Job } from "@/lib/data";
import Rich from "./Rich";

// On narrow screens the body collapses behind the title; on desktop it is always open.
export default function JobCard({ job, first }: { job: Job; first: boolean }) {
  const [open, setOpen] = useState(first);
  const bodyId = `${job.id}-body`;

  return (
    <article className="job reveal" id={job.id} data-job data-open={open ? "1" : "0"}>
      <p className="job__when">
        <b>{job.when}</b>
        {job.where}
      </p>
      <h3>
        <button type="button" className="job__toggle" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen(!open)}>
          <span>
            {job.role} <span className="job__at">— {job.org}</span>
          </span>
          <span className="job__chev" aria-hidden="true" />
        </button>
      </h3>
      <div className="job__body" id={bodyId}>
        <p className="job__lede">{job.lede}</p>
        <ul className="points">
          {job.points.map((p) => (
            <li key={p}>
              <Rich text={p} />
            </li>
          ))}
        </ul>
        <div className="s-chips">
          {job.chips.map((c) => (
            <span key={c} className="s-chip">
              {c}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
