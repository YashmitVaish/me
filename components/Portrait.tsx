"use client";

import { useEffect, useRef, useState } from "react";

// Flip card: photo on the front, a caption on the back. Falls back to initials until /me.jpg exists.
export default function Portrait({ src, name, initials, caption }: { src: string; name: string; initials: string; caption: string }) {
  const [flipped, setFlipped] = useState(false);
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  // The image can fail before React hydrates and attaches onError, so check once on mount too.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  return (
    <div className="portrait reveal">
      <button
        type="button"
        className="portrait__card"
        data-flipped={flipped ? "1" : "0"}
        onClick={() => setFlipped(!flipped)}
        aria-label={flipped ? "Show photo" : "Flip the card"}
      >
        <span className="portrait__face">
          {missing ? (
            <span className="portrait__empty">{initials}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={img} src={src} alt={name} onError={() => setMissing(true)} />
          )}
        </span>
        <span className="portrait__face portrait__face--back">
          <span className="portrait__back">{caption}</span>
        </span>
      </button>
      <p className="portrait__hint">Tap the card.</p>
    </div>
  );
}
