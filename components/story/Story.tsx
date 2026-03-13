"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./story.module.css";
import { PARADE_AUDIO_START_EVENT, PARADE_AUDIO_STOP_EVENT } from "./audioEvents";

import Section00Intro from "./sections/Section00Intro";
import Section01Welcome from "./sections/Section01Welcome";
import Section02Mice from "./sections/Section02Mice";
import Section03Piper from "./sections/Section03Piper";
import Section04Promise from "./sections/Section04Promise";
import Section05Parade from "./sections/Section05Parade";
import Section06Estafa from "./sections/Section06Estafa";
import Section07CaminataConNinos from "./sections/Section07CaminataConNinos";
import Section08PradoCompleto from "./sections/Section08PradoCompleto";
import Section09AdultosPueblo from "./sections/Section09AdultosPueblo";
import Section10AdultosSorry from "./sections/Section10AdultosSorry";
import Section11Reunion from "./sections/Section11Reunion";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const backgroundAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const specialSectionAudioCountRef = React.useRef(0);
  const narrationAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const activeNarrationSectionRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!backgroundAudioRef.current) {
      const audio = new Audio("/sounds/musica-fondo.mp3");
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0.15;
      backgroundAudioRef.current = audio;
    }

    const backgroundAudio = backgroundAudioRef.current;
    if (!backgroundAudio) return;

    const playBackgroundAudio = () => {
      if (specialSectionAudioCountRef.current > 0) return;
      void backgroundAudio.play().catch(() => {
        // Ignore blocked autoplay attempts.
      });
    };

    const pauseBackgroundAudio = () => {
      backgroundAudio.pause();
    };

    const handleParadeStart = () => {
      specialSectionAudioCountRef.current += 1;
      pauseBackgroundAudio();
    };

    const handleParadeStop = () => {
      specialSectionAudioCountRef.current = Math.max(0, specialSectionAudioCountRef.current - 1);
      playBackgroundAudio();
    };

    const handleFirstInteraction = () => {
      playBackgroundAudio();
    };

    playBackgroundAudio();

    window.addEventListener(PARADE_AUDIO_START_EVENT, handleParadeStart);
    window.addEventListener(PARADE_AUDIO_STOP_EVENT, handleParadeStop);
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener(PARADE_AUDIO_START_EVENT, handleParadeStart);
      window.removeEventListener(PARADE_AUDIO_STOP_EVENT, handleParadeStop);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      pauseBackgroundAudio();
      backgroundAudio.currentTime = 0;
    };
  }, []);

  React.useLayoutEffect(() => {
    const sectionIdsWithPause = ["section-6", "section-7", "section-8", "section-9", "section-10", "section-11"];
    const triggers: ScrollTrigger[] = [];

    for (const id of sectionIdsWithPause) {
      const section = document.getElementById(id);
      if (!section) continue;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=55%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        })
      );
    }

    return () => {
      for (const trigger of triggers) {
        trigger.kill();
      }
    };
  }, []);

  React.useEffect(() => {
    const sectionIds = Array.from({ length: 11 }, (_, index) => `section-${index + 1}`);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const visibilityById = new Map<string, number>();

    const stopNarration = () => {
      const audio = narrationAudioRef.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    };

    const playNarrationForSection = (sectionId: string) => {
      const sectionNumber = sectionId.replace("section-", "");
      const src = `/sounds/narracion/narracion-seccion-${sectionNumber}.mp3`;
      const audio = narrationAudioRef.current ?? new Audio();
      narrationAudioRef.current = audio;
      audio.preload = "auto";

      if (audio.src !== new URL(src, window.location.href).href) {
        audio.src = src;
      }

      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Ignore blocked autoplay attempts.
      });
    };

    const updateActiveNarration = () => {
      let nextSectionId: string | null = null;
      let bestRatio = 0;

      for (const sectionId of sectionIds) {
        const ratio = visibilityById.get(sectionId) ?? 0;
        if (ratio >= 0.98 && ratio > bestRatio) {
          bestRatio = ratio;
          nextSectionId = sectionId;
        }
      }

      if (nextSectionId === activeNarrationSectionRef.current) return;

      stopNarration();
      activeNarrationSectionRef.current = nextSectionId;

      if (nextSectionId) {
        playNarrationForSection(nextSectionId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.id;
          visibilityById.set(sectionId, entry.intersectionRatio);
        }

        updateActiveNarration();
      },
      { threshold: [0, 0.98, 1] }
    );

    for (const section of sections) {
      visibilityById.set(section.id, 0);
      observer.observe(section);
    }

    const handleFirstInteraction = () => {
      const currentSectionId = activeNarrationSectionRef.current;
      if (currentSectionId) {
        playNarrationForSection(currentSectionId);
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      stopNarration();
      activeNarrationSectionRef.current = null;
    };
  }, []);

  return (
    <main className={styles.story}>
      <Section00Intro />
      <Section01Welcome />
      <Section02Mice />
      <Section03Piper />
      <Section04Promise />
      <Section05Parade />
      <Section06Estafa />
      <Section07CaminataConNinos />
      <Section08PradoCompleto />
      <Section09AdultosPueblo />
      <Section10AdultosSorry />
      <Section11Reunion />
    </main>
  );
}
