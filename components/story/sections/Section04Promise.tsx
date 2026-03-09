"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";

gsap.registerPlugin(ScrollTrigger);

export default function Section04Promise() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=140%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-4" bg="/flautin-negociando.jpeg">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          left: "clamp(10px, 4vw, 52px)",
          width: "clamp(360px, 42vw, 620px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <img
          src="/nube-texto.png"
          alt=""
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            transform: "scaleX(-1)",
          }}
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
            fontSize: "clamp(12px, 1.2vw, 20px)",
            lineHeight: 1.3,
            fontWeight: 600,
            color: "#1f2c3e",
          }}
        >
          El flautista dijo:
          <br />
          &ldquo;Si quito a los ratones, &iquest;me dar&eacute;is una recompensa?&rdquo;
          <br />
          El pueblo dijo que s&iacute;.
        </p>
      </div>
    </SectionFrame>
  );
}
