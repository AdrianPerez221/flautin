"use client";

import React from "react";
import SectionFrame from "../SectionFrame";

export default function Section08PradoCompleto() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const laughAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const laughCooldownRef = React.useRef(false);

  const handleLaughEnded = React.useCallback(() => {
    laughCooldownRef.current = false;
  }, []);

  const playLaugh = React.useCallback(() => {
    if (laughCooldownRef.current) return;

    if (!laughAudioRef.current) {
      const audio = new Audio("/sounds/magiaz-risada-infantil-447316.mp3");
      audio.preload = "auto";
      audio.addEventListener("ended", handleLaughEnded);
      laughAudioRef.current = audio;
    }

    const audio = laughAudioRef.current;
    if (!audio) return;

    laughCooldownRef.current = true;
    audio.currentTime = 0;

    void audio.play().catch(() => {
      // If autoplay is blocked, unlock immediately to allow retry.
      laughCooldownRef.current = false;
    });
  }, [handleLaughEnded]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.addEventListener("pointerdown", playLaugh);

    return () => {
      root.removeEventListener("pointerdown", playLaugh);
      const audio = laughAudioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener("ended", handleLaughEnded);
      }
      laughAudioRef.current = null;
      laughCooldownRef.current = false;
    };
  }, [handleLaughEnded, playLaugh]);

  return (
    <SectionFrame ref={rootRef} id="section-8" bg="/prado-completo/flautista-prado.png">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px, 34vw, 520px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <img
          src="/nube-texto.png"
          alt=""
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        <p
          style={{
            position: "absolute",
            inset: "24% 16% 28% 16%",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "clamp(14px, 1.7vw, 20px)",
            lineHeight: 1.3,
            fontWeight: 600,
            color: "#1f2c3e",
          }}
        >
          El flautista llev&oacute; a los ni&ntilde;os
          <br />
          a un prado lleno de flores.
          <br />
          All&iacute; jugaron y se rieron.
        </p>
      </div>
    </SectionFrame>
  );
}

