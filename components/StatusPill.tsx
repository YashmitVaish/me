const LABEL = { live: "Live", wip: "In progress", done: "Delivered" } as const;

export default function StatusPill({ state, label }: { state: keyof typeof LABEL; label?: string }) {
  return <span className={`pill pill--${state}`}>{label ?? LABEL[state]}</span>;
}
