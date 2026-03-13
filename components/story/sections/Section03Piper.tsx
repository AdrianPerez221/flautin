"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section03Piper() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement | null;
      if (t) {
        gsap.set(t, { y: 18, opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (t) {
        tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-3" bg="/llegada-flautista/flautista-llegando.jpeg">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          right: "clamp(10px, 4vw, 52px)",
          width: "clamp(260px, 32vw, 440px)",
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
            fontSize: "clamp(14px, 1.7vw, 20px)",
            lineHeight: 1.3,
            fontWeight: 600,
            color: "#1f2c3e",
          }}
        >
          Entonces apareci&oacute; un flautista misterioso.
          <br />
          Llevaba una flauta m&aacute;gica y una gran sonrisa.
          <br />
          Dijo que pod&iacute;a ayudar.
        </p>
      </div>

    </SectionFrame>
  );
}

