"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import PlaceholderAsset from "../PlaceholderAsset";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section00Intro() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const title = root.querySelector('[data-el="title"]') as HTMLElement;
      const mask = root.querySelector('[data-el="mask"]') as HTMLElement;
      const mouse = root.querySelector('[data-el="mouse"]') as HTMLElement;
      const hint = root.querySelector('[data-el="hint"]') as HTMLElement;

      gsap.set([title, mask, mouse, hint], { clearProps: "all" });
      gsap.set(title, { y: 18, opacity: 0 });
      gsap.set(mask, { width: "0%" });
      gsap.set(mouse, { x: -40, y: 0, rotate: 0, opacity: 1 });
      gsap.set(hint, { opacity: 0.95 });

      if (!prefersReduced) {
        gsap.to(hint, { y: 8, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=140%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(title, { y: 0, opacity: 1, ease: "power2.out", duration: 0.2 }, 0);

      // "Mouse eats the title": mask grows, mouse follows the mask edge
      tl.to(mask, { width: "112%", ease: "none", duration: 1 }, 0.15);

      tl.to(
        mouse,
        {
          x: () => {
            const w = title.getBoundingClientRect().width;
            return Math.max(220, w * 0.75);
          },
          y: 0,
          rotate: 6,
          ease: "none",
          duration: 1,
        },
        0.15
      );

      // fade hint out as we start the story
      tl.to(hint, { opacity: 0, ease: "none", duration: 0.25 }, 0.45);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-0" bg="/pueblo-feliz-section1.jpeg">
      <div className={styles.content}>
        <div className={styles.kicker}>Interactive story</div>

        <div className={styles.titleWrap}>
          <h1 className={styles.h1} data-el="title">
            The Pied Piper of Hamelin
          </h1>
          <div className={styles.eatMask} data-el="mask" />
        </div>

        <p className={styles.p}>
          Scroll down and watch the story come alive. Friendly music, silly mice, and a lesson about keeping promises.
        </p>

        <div className={styles.badge}>
          <span className={styles.dot} />
          <span style={{ fontSize: 14, opacity: 0.95 }}>Scroll to start</span>
        </div>
      </div>

      {/* Mouse placeholder that "eats" the title (you'll replace later) */}
      <div data-el="mouse">
        <PlaceholderAsset
          label="PLACEHOLDER: little mouse (PNG)"
          kind="circle"
          w={110}
          h={110}
          style={{ top: "18%", left: "10%" }}
        />
      </div>

      <div className={styles.hint} data-el="hint">
        <div className={styles.arrow} />
        <div className={styles.hintText}>Scroll</div>
      </div>
    </SectionFrame>
  );
}
