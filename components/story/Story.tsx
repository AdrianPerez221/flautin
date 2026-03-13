"use client";

import React from "react";
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

export default function Story() {
  const backgroundAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const paradeActiveRef = React.useRef(false);

  React.useEffect(() => {
    if (!backgroundAudioRef.current) {
      const audio = new Audio("/sounds/musica-fondo.mp3");
      audio.preload = "auto";
      audio.loop = true;
      backgroundAudioRef.current = audio;
    }

    const backgroundAudio = backgroundAudioRef.current;
    if (!backgroundAudio) return;

    const playBackgroundAudio = () => {
      if (paradeActiveRef.current) return;
      void backgroundAudio.play().catch(() => {
        // Ignore blocked autoplay attempts.
      });
    };

    const pauseBackgroundAudio = () => {
      backgroundAudio.pause();
    };

    const handleParadeStart = () => {
      paradeActiveRef.current = true;
      pauseBackgroundAudio();
    };

    const handleParadeStop = () => {
      paradeActiveRef.current = false;
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
