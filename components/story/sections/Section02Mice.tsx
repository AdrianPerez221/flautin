"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section02Mice() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const mouseHit = root.querySelector('[data-role="mouse-hit"]') as HTMLElement | null;
      const mouseOne = root.querySelector('[data-role="mouse-one"]') as HTMLElement | null;
      const mice = gsap.utils
        .toArray<HTMLElement>('[data-el="mouse"]', root)
        .filter((el) => el !== mouseHit && el !== mouseOne);
      const bread = root.querySelector('[data-el="bread"]') as HTMLElement;
      const basket = root.querySelector('[data-el="basket"]') as HTMLElement;
      const offLeft = -Math.max(window.innerWidth * 0.6, 380);
      const offRight = Math.max(window.innerWidth * 0.6, 380);
      gsap.set(t, { y: 18, opacity: 0 });
      gsap.set(mice, { x: offLeft, opacity: 0.95 });
      if (mouseHit) {
        gsap.set(mouseHit, { x: offLeft - 120, y: 30, opacity: 0.6, rotate: -8, scale: 0.95 });
      }
      if (mouseOne) {
        gsap.set(mouseOne, { x: offRight + 120, y: -10, opacity: 0.9, rotate: 6, scale: 0.95 });
      }
      gsap.set(bread, { x: 0, y: 0, rotate: -8, opacity: 1, scale: 0.9 });
      gsap.set(basket, { y: 0, rotate: -4, opacity: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=160%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);

      // mice parade (chaos but cute)
      tl.to(
        mice,
        {
          x: 360,
          stagger: 0.08,
          ease: "none",
          duration: 1,
        },
        0.1
      );

      // mouse #3 brushes the basket
      if (mouseHit) {
        tl.to(mouseHit, { x: 40, y: 6, opacity: 0.95, duration: 0.3, ease: "power2.out" }, 0.2);
        tl.to(mouseHit, { x: 160, y: 12, rotate: 8, duration: 0.45, ease: "power2.in" }, 0.4);
      }

      // mouse #1 crosses from right to center-bottom
      if (mouseOne) {
        tl.to(mouseOne, { x: -120, y: 30, rotate: -6, duration: 0.9, ease: "none" }, 0.1);
      }

      // basket tips slightly like it fell
      tl.to(basket, { y: 10, rotate: -10, ease: "power1.out", duration: 0.3 }, 0.34);
      tl.to(basket, { y: 14, rotate: -16, ease: "sine.inOut", duration: 0.35 }, 0.5);

      // bread slips out and rolls a bit on the ground
      const breadExitX = Math.max(window.innerWidth * 0.28, 200);
      tl.to(
        bread,
        { scale: 1, x: breadExitX, y: 42, rotate: 160, ease: "power2.out", duration: 0.8 },
        0.44
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-2" bg="/pueblo-ratas.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.kicker}>Section 2</div>
        <h2 className={styles.h2}>Oh no… mice everywhere!</h2>
        <p className={styles.p}>
          One day, lots of tiny mice ran around the town. They weren’t scary—just very, very mischievous!
        </p>
      </div>

      {/* mice (you’ll replace with real sprites later) */}
      <div
        data-el="bread"
        className={styles.photoWrap}
        style={{ bottom: "16%", left: "9%", width: 150, height: 95, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/pan.png"
          alt="Pan rodando"
          loading="lazy"
        />
      </div>

      <div
        data-el="basket"
        className={styles.photoWrap}
        style={{ bottom: "14%", left: "6%", width: 190, height: 140 }}
      >
        <img
          className={styles.photoAsset}
          src="/basket-del-pan.png"
          alt="Canasta de pan"
          loading="lazy"
        />
      </div>

    </SectionFrame>
  );
}
