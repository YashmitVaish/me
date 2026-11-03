"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const NAV = [
  ["About", "/#about"],
  ["Skills", "/#skills"],
  ["Experience", "/#experience"],
  ["Work", "/#work"],
  ["Contact", "/#contact"],
] as const;

function isDark() {
  const set = document.documentElement.dataset.theme;
  return set ? set === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function SiteBar({ back }: { back?: boolean }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDark());
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute("data-drawer", "");
    else root.removeAttribute("data-drawer");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(next === "dark");
  };

  const label = dark ? "Switch to light" : "Switch to dark";

  return (
    <>
      <header className="bar" data-stuck={stuck ? "1" : "0"}>
        <Link className="mark" href="/#top" aria-label="Top of page">
          {profile.initials}
        </Link>
        {back ? (
          <Link className="bar__back" href="/">
            ← Back home
          </Link>
        ) : (
          <nav>
            {NAV.map(([name, href]) => (
              <a key={href} href={href.slice(1)}>
                {name}
              </a>
            ))}
          </nav>
        )}
        <button type="button" className="themepick" onClick={toggleTheme} aria-label={label} title={label}>
          {dark ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
            </svg>
          )}
        </button>
        <a className="bar__cta" href={profile.resume} download>
          <span>Résumé</span>
          <span className="long"> PDF ↓</span>
        </a>
        {!back && (
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        )}
      </header>
      {!back && (
        <>
          <aside className="drawer" id="site-drawer" aria-hidden={!open}>
            <nav>
              {NAV.map(([name, href]) => (
                <a key={href} href={href.slice(1)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  {name}
                </a>
              ))}
              <Link className="drawer__extra" href="/terminal" tabIndex={open ? 0 : -1}>
                Open the terminal <span aria-hidden="true">→</span>
              </Link>
            </nav>
          </aside>
          <button className="drawer__scrim" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} />
        </>
      )}
    </>
  );
}
