"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section00Intro() {
  const rootRef = useRef<HTMLElement | null>(null);
  const squeakAudioRef = useRef<HTMLAudioElement | null>(null);

  const playRatSqueak = React.useCallback(() => {
    if (!squeakAudioRef.current) {
      const audio = new Audio("/sounds/sound_garage-rat-squeaks-2-fx-396301.mp3");
      audio.preload = "auto";
      squeakAudioRef.current = audio;
    }

    const audio = squeakAudioRef.current;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore failed playback attempts.
    });
  }, []);

  React.useEffect(() => {
    return () => {
      if (squeakAudioRef.current) {
        squeakAudioRef.current.pause();
        squeakAudioRef.current = null;
      }
    };
  }, []);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const title = root.querySelector('[data-el="title"]') as HTMLElement;
      const mouse = root.querySelector('[data-el="mouse"]') as HTMLElement;
      const hint = root.querySelector('[data-el="hint"]') as HTMLElement;
      const frames = gsap.utils.toArray<HTMLElement>('[data-el="frame"]', mouse);

      const frameMouthRatioX = [0.58, 0.58, 0.58, 0.58];
      const mouthLeadPx = -8;
      const chewStart = 0.25;
      const chewDuration = 1.5;
      let activeFrameIndex = 0;

      const syncTitleBiteWithMouse = () => {
        const titleRect = title.getBoundingClientRect();
        const mouseRect = mouse.getBoundingClientRect();

        if (titleRect.width <= 0) {
          return;
        }

        const mouthRatioX = frameMouthRatioX[activeFrameIndex] ?? frameMouthRatioX[0];
        const mouthX = mouseRect.left + mouseRect.width * mouthRatioX;
        const bitePx = gsap.utils.clamp(0, titleRect.width, mouthX - titleRect.left);
        const bitePercent = (bitePx / titleRect.width) * 100;

        gsap.set(title, { clipPath: `inset(0 0 0 ${bitePercent}%)` });
      };

      gsap.set([title, mouse, hint, ...frames], { clearProps: "all" });

      gsap.set(title, {
        y: 18,
        opacity: 0,
        clipPath: "inset(0 0 0 0)",
      });

      gsap.set(mouse, {
        x: () => -Math.max(window.innerWidth * 0.5, 360),
        y: 0,
        yPercent: -50,
        rotate: 0,
        opacity: 1,
        scale: 0.95,
      });

      gsap.set(hint, { opacity: 0.95 });

      gsap.set(frames, { autoAlpha: 0 });
      if (frames[0]) {
        gsap.set(frames[0], { autoAlpha: 1 });
      }
      syncTitleBiteWithMouse();

      if (!prefersReduced) {
        gsap.to(hint, {
          y: 8,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        title,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.15,
        },
        0
      );

      tl.to(
        mouse,
        {
          x: () => {
            const titleRect = title.getBoundingClientRect();
            const mouseRect = mouse.getBoundingClientRect();
            const mouthRatioX = frameMouthRatioX[activeFrameIndex] ?? frameMouthRatioX[0];
            const mouthX = mouseRect.left + mouseRect.width * mouthRatioX;
            const targetMouthX = titleRect.right + mouthLeadPx;
            const currentX = Number(gsap.getProperty(mouse, "x"));

            return currentX + (targetMouthX - mouthX);
          },
          y: -3,
          rotate: 3,
          scale: 1,
          ease: "none",
          duration: chewDuration,
          onStart: () => {
            activeFrameIndex = 0;
            syncTitleBiteWithMouse();
          },
          onUpdate: syncTitleBiteWithMouse,
        },
        chewStart
      );

      if (frames.length >= 4) {
        const finalStart = chewStart + chewDuration;
        const closeLead = Math.max(0.12, chewDuration * 0.14);
        const titleRect = title.getBoundingClientRect();
        const mouseRect = mouse.getBoundingClientRect();
        const startMouthRatioX = frameMouthRatioX[0] ?? 0.58;
        const startMouthX = mouseRect.left + mouseRect.width * startMouthRatioX;
        const endMouthX = titleRect.right + mouthLeadPx;
        const totalTravelX = endMouthX - startMouthX;
        const rawContactProgress =
          Math.abs(totalTravelX) < 0.001 ? 0 : (titleRect.left - startMouthX) / totalTravelX;
        const contactProgress = gsap.utils.clamp(0, 1, rawContactProgress);
        const openStart = chewStart + chewDuration * contactProgress;
        const closeStart = Math.max(openStart + 0.1, finalStart - closeLead);
        const openVariantStart = Math.min(
          closeStart - 0.02,
          openStart + Math.max(0.08, (closeStart - openStart) * 0.58)
        );

        tl.call(() => {
          activeFrameIndex = 0;
          syncTitleBiteWithMouse();
        }, undefined, chewStart);
        tl.set(frames[0], { autoAlpha: 1 }, chewStart);

        tl.call(() => {
          activeFrameIndex = 1;
          syncTitleBiteWithMouse();
        }, undefined, openStart);
        tl.set(frames[0], { autoAlpha: 0 }, openStart);
        tl.set(frames[1], { autoAlpha: 1 }, openStart);

        tl.call(() => {
          activeFrameIndex = 2;
          syncTitleBiteWithMouse();
        }, undefined, openVariantStart);
        tl.set(frames[1], { autoAlpha: 0 }, openVariantStart);
        tl.set(frames[2], { autoAlpha: 1 }, openVariantStart);

        tl.call(() => {
          activeFrameIndex = 3;
          syncTitleBiteWithMouse();
        }, undefined, closeStart);
        tl.set(frames[2], { autoAlpha: 0 }, closeStart);
        tl.set(frames[3], { autoAlpha: 1 }, closeStart);
      } else {
        const frameDuration = frames.length > 0 ? chewDuration / frames.length : chewDuration;

        frames.forEach((frame, index) => {
          const startTime = chewStart + frameDuration * index;
          const endTime = startTime + frameDuration;

          tl.call(() => {
            activeFrameIndex = index;
            syncTitleBiteWithMouse();
          }, undefined, startTime);

          tl.set(frame, { autoAlpha: 1 }, startTime);

          if (index > 0) {
            tl.set(frames[index - 1], { autoAlpha: 0 }, startTime);
          }

          if (index === frames.length - 1) {
            tl.set(frame, { autoAlpha: 1 }, endTime);
          }
        });
      }

      tl.to(
        hint,
        {
          opacity: 0,
          ease: "power2.in",
          duration: 0.2,
        },
        0.35
      );

      tl.to(
        mouse,
        {
          y: 0,
          rotate: 0,
          ease: "elastic.out(1, 0.5)",
          duration: 0.3,
        },
        1.75
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef} id="section-0" bg="/pueblo-feliz-section1.jpeg">
      <div className={styles.content}>
        <div className={`${styles.kicker} ${styles.introKickerBlack}`}>Historia interactiva</div>

        <div className={styles.titleWrap}>
          <h1 className={`${styles.h1} ${styles.introTitleBlack}`} data-el="title">
            El Flautista de{" "}
            <span className={styles.section01StoryTitleAccent}>Hamel&iacute;n</span>
          </h1>
          <div
            className={styles.introMouse}
            data-el="mouse"
            role="button"
            tabIndex={0}
            aria-label="Reproducir sonido de rata"
            onClick={playRatSqueak}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                playRatSqueak();
              }
            }}
          >
            <img
              className={`${styles.photoAsset} ${styles.introMouseFrame} ${styles.introMouseFrameRight} ${styles.introMouseFrame4}`}
              src="/intro/rata-frame4.png"
              alt="Rata comiendo el titulo frame 4"
              loading="eager"
              decoding="async"
              data-el="frame"
            />
            <img
              className={`${styles.photoAsset} ${styles.introMouseFrame} ${styles.introMouseFrameRight} ${styles.introMouseFrame3}`}
              src="/intro/rata-frame3-masticando.png"
              alt="Rata comiendo el titulo frame 3"
              loading="eager"
              decoding="async"
              data-el="frame"
            />
            <img
              className={`${styles.photoAsset} ${styles.introMouseFrame} ${styles.introMouseFrameRight} ${styles.introMouseFrame3}`}
              src="/intro/rata-frame3-masticando.png"
              alt="Rata comiendo el titulo frame 3"
              loading="eager"
              decoding="async"
              data-el="frame"
            />
            <img
              className={`${styles.photoAsset} ${styles.introMouseFrame} ${styles.introMouseFrameRight} ${styles.introMouseFrame4}`}
              src="/intro/rata-frame4.png"
              alt="Rata comiendo el titulo frame 4"
              loading="eager"
              decoding="async"
              data-el="frame"
            />
          </div>
        </div>

        <p className={`${styles.p} ${styles.introBodyBlack}`}>
          Desliza hacia abajo y mira como la historia cobra vida. Musica alegre, ratones traviesos y una leccion sobre cumplir promesas.
        </p>

        <div className={styles.badge}>
          <span className={styles.dot} />
          <span className={styles.introBadgeBlack}>Desliza para comenzar</span>
        </div>
      </div>

      <div className={styles.hint} data-el="hint">
        <div className={`${styles.arrow} ${styles.introArrowBlack}`} />
        <div className={`${styles.hintText} ${styles.introHintTextBlack}`}>Desliza</div>
      </div>
    </SectionFrame>
  );
}
