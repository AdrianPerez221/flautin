"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section01Welcome() {
  const rootRef = useRef<HTMLElement | null>(null);
  const sunSmallRef = useRef<HTMLImageElement | null>(null);
  const sunBigRef = useRef<HTMLImageElement | null>(null);
  const sunExpandedRef = useRef(false);
  const sunSoundRef = useRef<HTMLAudioElement | null>(null);
  const sunCooldownUntilRef = useRef(0);

  const handleSunClick = React.useCallback(() => {
    const now = Date.now();
    if (now < sunCooldownUntilRef.current) return;
    sunCooldownUntilRef.current = now + 1000;

    if (!sunSoundRef.current) {
      const audio = new Audio("/sounds/sonido-de-sol.mp3");
      audio.preload = "auto";
      sunSoundRef.current = audio;
    }

    const sunSound = sunSoundRef.current;
    sunSound.currentTime = 0;
    void sunSound.play().catch(() => {
      // Ignore blocked autoplay attempts.
    });

    const sunSmall = sunSmallRef.current;
    const sunBig = sunBigRef.current;
    if (!sunSmall || !sunBig) return;

    const nextExpanded = !sunExpandedRef.current;
    sunExpandedRef.current = nextExpanded;
    gsap.killTweensOf([sunSmall, sunBig]);

    const tl = gsap.timeline();

    if (nextExpanded) {
      tl.to(sunSmall, {
        autoAlpha: 0,
        scale: 0.74,
        duration: 0.18,
        ease: "power2.in",
      });
      tl.fromTo(
        sunBig,
        { autoAlpha: 0, scale: 0.68, rotate: -10, y: -4 },
        { autoAlpha: 1, scale: 1, rotate: 0, y: 0, duration: 0.28, ease: "back.out(1.8)" },
        0.1
      );
      tl.to(
        sunBig,
        { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" },
        0.38
      );
    } else {
      tl.to(sunBig, {
        autoAlpha: 0,
        scale: 0.72,
        rotate: 8,
        duration: 0.18,
        ease: "power2.in",
      });
      tl.fromTo(
        sunSmall,
        { autoAlpha: 0, scale: 0.86, rotate: -6, y: 2 },
        { autoAlpha: 1, scale: 1, rotate: 0, y: 0, duration: 0.24, ease: "back.out(1.6)" },
        0.08
      );
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (sunSoundRef.current) {
        sunSoundRef.current.pause();
        sunSoundRef.current = null;
      }
    };
  }, []);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;

    const ctx = gsap.context(() => {
      const bg = root.querySelector(`.${styles.bg}`) as HTMLElement;
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const sunSmall = sunSmallRef.current;
      const sunBig = sunBigRef.current;

      gsap.set(t, { y: 18, opacity: 0 });
      sunExpandedRef.current = false;
      sunCooldownUntilRef.current = 0;
      if (sunSmall) {
        gsap.set(sunSmall, { autoAlpha: 1, scale: 1, rotate: 0, transformOrigin: "50% 50%" });
      }
      if (sunBig) {
        gsap.set(sunBig, { autoAlpha: 0, scale: 0.68, rotate: -10, transformOrigin: "50% 50%" });
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

      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);

      // gentle parallax
      tl.to(bg, { scale: 1.08, duration: 1, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-1" bg="/pueblo-feliz-section1.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.section01StoryPanel}>
          <h2 className={`${styles.h2} ${styles.section01StoryTitle}`}>
            Había una vez un pueblo llamado Hamelín.
          </h2>
          <p className={`${styles.p} ${styles.section01StoryText}`}>
            Era bonito, con casas de colores y gente amable.
            A todos les gustaba vivir allí.
          </p>
        </div>
      </div>

      <div
        className={styles.clickable}
        style={{ position: "absolute", top: "9%", left: "56%", width: 195, height: 195, zIndex: 4 }}
        onClick={handleSunClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSunClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Cambiar al sol grande"
      >
        <img
          ref={sunSmallRef}
          className={styles.photoAsset}
          src="/presentacion-pueblo/sol-chiquito.png"
          alt="Sol pequeno"
          loading="lazy"
          decoding="async"
        />
        <img
          ref={sunBigRef}
          className={styles.photoAsset}
          src="/presentacion-pueblo/sol-grande.png"
          alt="Sol grande"
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            width: "125%",
            height: "125%",
            left: "-12.5%",
            top: "-12.5%",
          }}
        />
      </div>

    </SectionFrame>
  );
}

