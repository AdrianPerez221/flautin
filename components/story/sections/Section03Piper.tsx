"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import PlaceholderAsset from "../PlaceholderAsset";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section03Piper() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const piper = root.querySelector('[data-el="piper"]') as HTMLElement;
      const notes = gsap.utils.toArray<HTMLElement>('[data-el="note"]', root);
      const glow = root.querySelector('[data-el="glow"]') as HTMLElement;

      gsap.set(t, { y: 18, opacity: 0 });
      gsap.set(piper, { x: -180, opacity: 0 });
      gsap.set(notes, { y: 30, opacity: 0, scale: 0.9 });
      gsap.set(glow, { opacity: 0, scale: 0.95 });

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

      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);
      tl.to(piper, { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.15);
      tl.to(glow, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.2);

      tl.to(
        notes,
        {
          y: -40,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
        },
        0.25
      );

      // subtle looping float (non-scrub) using gsap.to outside timeline
      notes.forEach((el, i) => {
        gsap.to(el, { y: "+=10", duration: 1.2 + i * 0.15, yoyo: true, repeat: -1, ease: "sine.inOut" });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-3" bg="/flautin-empieza-tocando.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.kicker}>Section 3</div>
        <h2 className={styles.h2}>A friendly Piper appears</h2>
        <p className={styles.p}>
          A kind musician arrived with a magical flute. “I can help,” he said with a warm smile.
        </p>
      </div>

      <div data-el="piper">
        <PlaceholderAsset label="PLACEHOLDER: Piper (full body PNG)" w={260} h={420} style={{ bottom: "10%", left: "10%" }} />
      </div>

      <div data-el="glow">
        <PlaceholderAsset label="PLACEHOLDER: soft magic glow" kind="circle" w={220} h={220} style={{ bottom: "26%", left: "23%" }} />
      </div>

      <div data-el="note">
        <PlaceholderAsset label="NOTE" kind="circle" w={70} h={70} style={{ top: "28%", left: "55%" }} />
      </div>
      <div data-el="note">
        <PlaceholderAsset label="NOTE" kind="circle" w={60} h={60} style={{ top: "22%", left: "66%" }} />
      </div>
      <div data-el="note">
        <PlaceholderAsset label="NOTE" kind="circle" w={78} h={78} style={{ top: "32%", left: "76%" }} />
      </div>
    </SectionFrame>
  );
}
