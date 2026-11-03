"use client";

import { useEffect } from "react";

// Page-wide progressive enhancements: custom cursor, scroll reveals, hero spotlight,
// "scrolled" flag for the back-to-top button, and the experience index highlight.
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const cleanups: (() => void)[] = [];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // back-to-top flag
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) root.setAttribute("data-scrolled", "");
      else root.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // custom cursor (fine pointers only)
    const cursor = document.getElementById("cursor");
    if (cursor && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const move = (e: PointerEvent) => {
        cursor.classList.add("on");
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        const hit = (e.target as Element | null)?.closest?.("a, button, input, [role=button]");
        cursor.classList.toggle("big", !!hit && !hit.matches("input"));
      };
      const leave = () => cursor.classList.remove("on");
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      });
    }

    // hero spotlight + gentle grid parallax
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const light = document.querySelector<HTMLElement>("[data-hero-light]");
    const lines = document.querySelector<HTMLElement>("[data-hero-lines]");
    if (hero && light && !reduced) {
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        light.style.setProperty("--sx", `${e.clientX - r.left}px`);
        light.style.setProperty("--sy", `${e.clientY - r.top}px`);
        light.dataset.on = "1";
        if (lines) {
          const dx = (e.clientX / r.width - 0.5) * -16;
          const dy = ((e.clientY - r.top) / r.height - 0.5) * -16;
          lines.style.transform = `translate(${dx}px, ${dy}px)`;
        }
      };
      const leave = () => (light.dataset.on = "0");
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
      });
    }

    // experience index: highlight the job nearest the top of the viewport
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-xp-item]"));
    const jobs = Array.from(document.querySelectorAll<HTMLElement>("[data-job]"));
    if (items.length && jobs.length) {
      const pick = () => {
        const line = window.innerHeight * 0.4;
        let active = 0;
        jobs.forEach((j, i) => {
          if (j.getBoundingClientRect().top < line) active = i;
        });
        items.forEach((it, i) => (it.dataset.on = i === active ? "1" : "0"));
      };
      pick();
      window.addEventListener("scroll", pick, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", pick));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div id="cursor" aria-hidden="true" />;
}
