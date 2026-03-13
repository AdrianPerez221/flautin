"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import { PARADE_AUDIO_START_EVENT, PARADE_AUDIO_STOP_EVENT } from "../audioEvents";

gsap.registerPlugin(ScrollTrigger);

export default function Section07CaminataConNinos() {
  const rootRef = useRef<HTMLElement | null>(null);
  const paradeAudioRef = useRef<HTMLAudioElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!paradeAudioRef.current) {
      const audio = new Audio("/sounds/musica-del-parade.mp3");
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0.15;
      paradeAudioRef.current = audio;
    }

    const playParadeAudio = () => {
      const audio = paradeAudioRef.current;
      if (!audio) return;
      window.dispatchEvent(new Event(PARADE_AUDIO_START_EVENT));
      void audio.play().catch(() => {
        // Ignore blocked autoplay attempts.
      });
    };

    const stopParadeAudio = () => {
      const audio = paradeAudioRef.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      window.dispatchEvent(new Event(PARADE_AUDIO_STOP_EVENT));
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: playParadeAudio,
      onEnterBack: playParadeAudio,
      onLeave: stopParadeAudio,
      onLeaveBack: stopParadeAudio,
    });

    return () => {
      stopParadeAudio();
      trigger.kill();
    };
  }, []);

  return (
    <SectionFrame
      ref={rootRef as any}
      id="section-7"
      bg="/caminata-con-ni%C3%B1os/flautista-con-los-ni%C3%B1os.png"
    >
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          right: "clamp(12px, 4vw, 36px)",
          left: "auto",
          width: "clamp(280px, 34vw, 520px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <img
          src="/nube-texto.png"
          alt=""
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto" }}
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
          El flautista volvi&oacute; a tocar.
          <br />
          La m&uacute;sica era tan bonita
          <br />
          que los ni&ntilde;os lo siguieron jugando.
        </p>
      </div>
    </SectionFrame>
  );
}

