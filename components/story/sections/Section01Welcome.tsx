"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import PlaceholderAsset from "../PlaceholderAsset";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section01Welcome() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const bg = root.querySelector(`.${styles.bg}`) as HTMLElement;
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const cloud1 = root.querySelector('[data-el="cloud1"]') as HTMLElement;
      const cloud2 = root.querySelector('[data-el="cloud2"]') as HTMLElement;
      const birds = root.querySelector('[data-el="birds"]') as HTMLElement;
      const sign = root.querySelector('[data-el="sign"]') as HTMLElement;

      gsap.set(t, { y: 18, opacity: 0 });
      gsap.set([cloud1, cloud2], { x: -120, opacity: 0.95 });
      gsap.set(birds, { x: 140, y: -10, opacity: 0 });
      gsap.set(sign, { y: 40, opacity: 0, rotate: -6 });

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

      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);

      // gentle parallax
      tl.to(bg, { scale: 1.08, duration: 1, ease: "none" }, 0);

      tl.to(cloud1, { x: 160, opacity: 1, duration: 1, ease: "none" }, 0);
      tl.to(cloud2, { x: 220, opacity: 1, duration: 1, ease: "none" }, 0.05);

      tl.to(birds, { x: -220, y: 10, opacity: 1, duration: 1, ease: "none" }, 0.15);

      tl.to(sign, { y: 0, opacity: 1, rotate: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.25);

      if (!prefersReduced) {
        gsap.to(sign, { rotate: 2, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-1" bg="/pueblo-feliz-section1.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.kicker}>Section 1</div>
        <h2 className={styles.h2}>Welcome to Hamelin</h2>
        <p className={styles.p}>
          Hamelin is a colorful little town. The streets are clean, the fountain sparkles, and everyone feels safe.
        </p>
      </div>

      <div data-el="cloud1">
        <PlaceholderAsset label="PLACEHOLDER: cloud (left)" w={220} h={120} style={{ top: "12%", left: "8%" }} />
      </div>

      <div data-el="cloud2">
        <PlaceholderAsset label="PLACEHOLDER: cloud (right)" w={260} h={130} style={{ top: "18%", left: "58%" }} />
      </div>

      <div data-el="birds">
        <PlaceholderAsset label="PLACEHOLDER: birds" w={180} h={90} style={{ top: "10%", left: "78%" }} />
      </div>

      <div data-el="sign">
        <PlaceholderAsset
          label="PLACEHOLDER: wooden sign 'Hamelin'"
          w={260}
          h={120}
          style={{ bottom: "14%", left: "10%" }}
        />
      </div>
    </SectionFrame>
  );
}
