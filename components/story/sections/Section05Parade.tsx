"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section05Parade() {
  const rootRef = useRef<HTMLElement | null>(null);
  const coupleRef = useRef<HTMLDivElement | null>(null);
  const paradeAudioRef = useRef<HTMLAudioElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;

    if (!paradeAudioRef.current) {
      const audio = new Audio("/sounds/musica-del-parade.mp3");
      audio.preload = "auto";
      audio.loop = true;
      paradeAudioRef.current = audio;
    }

    const playParadeAudio = () => {
      const audio = paradeAudioRef.current;
      if (!audio) return;
      void audio.play().catch(() => {
        // Ignore blocked autoplay attempts.
      });
    };

    const stopParadeAudio = () => {
      const audio = paradeAudioRef.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    };

    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement | null;
      const piper = root.querySelector('[data-el="piper"]') as HTMLElement;
      const couple = coupleRef.current;
      const miceLine = gsap.utils.toArray<HTMLElement>('[data-el="miceLine"]', root);
      const offRight = window.innerWidth + 200;
      const offLeft = -400;

      if (t) {
        gsap.set(t, { y: 18, opacity: 0 });
      }

      // PIPER LEADS - he's to the LEFT (smaller x) so he enters first and leads
      gsap.set(piper, { x: offRight - 300, opacity: 0 });
      
      // MICE FOLLOW BEHIND - closer to the piper now
      gsap.set(miceLine, { 
        x: (i) => offRight + 100 + (i * 240), // Closer to piper (changed from offRight + i*240)
        opacity: 0, 
        scaleX: -1 
      });

      if (couple) {
        gsap.set(couple, { y: 0, rotate: 0, rotateY: 0, transformOrigin: "50% 80%", transformPerspective: 900 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%", // Increased from 170% to give more scroll distance
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onEnter: playParadeAudio,
          onEnterBack: playParadeAudio,
          onLeave: stopParadeAudio,
          onLeaveBack: stopParadeAudio,
        },
      });

      if (t) {
        tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);
      }

      // Parade enters from right and crosses to left together - MUCH SLOWER NOW
      // Piper leads (enters first, stays on the left)
      tl.to(piper, { 
        x: offLeft - 300, 
        opacity: 1, 
        duration: 2.5, // Increased from 1.2 to 2.5 for slower movement
        ease: "none" 
      }, 0.15);

      // Mice follow behind - closer to piper
      tl.to(miceLine, {
        x: (i) => offLeft + 100 + (i * 240), // Keep same spacing
        opacity: 1,
        duration: 2.5, // Increased from 1.2 to 2.5
        ease: "none",
      }, 0.15);

      // Gentle dancing sway for the couple
      if (couple) {
        gsap.to(couple, { y: "+=6", rotate: 2, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    }, root);

    return () => {
      stopParadeAudio();
      ctx.revert();
    };
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-5" bg="/parade/fondo-parade.jpeg">
      <div
        style={{
          position: "absolute",
          top: "clamp(-90px, -11vh, -36px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(290px, 38vw, 520px)",
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
            fontSize: "clamp(12px, 1.2vw, 20px)",
            lineHeight: 1.3,
            fontWeight: 600,
            color: "#1f2c3e",
          }}
        >
          El flautista toc&oacute; su flauta.
          <br />
          La m&uacute;sica era alegre y m&aacute;gica.
          <br />
          Los ratones lo siguieron bailando.
        </p>
      </div>

      {/* Piper leading the parade - MUCH BIGGER */}
      <div
        data-el="piper"
        className={styles.photoWrap}
        style={{ bottom: "4%", left: "50%", width: 525, height: 700, zIndex: 3 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Minstrel%20tocando%20la%20flauta%20medieval.webp"
          alt="Flautista tocando la flauta"
          loading="lazy"
        />
      </div>

      {/* Dancing couple (unchanged) */}
      <div
        ref={coupleRef}
        className={`${styles.photoWrap} ${styles.clickable}`}
        style={{ bottom: "16%", right: "4%", width: 520, height: 440, zIndex: 2 }}
        onClick={() => {
          if (!coupleRef.current) return;
          gsap.to(coupleRef.current, { rotateY: "+=360", duration: 0.9, ease: "power2.out" });
        }}
        role="button"
        aria-label="Pareja bailando"
      >
        <img
          className={styles.photoAsset}
          src="/parade/Pareja%20de%20campesinos%20bailando%20juntos.png"
          alt="Pareja de campesinos bailando"
          loading="lazy"
        />
      </div>

      {/* Mice parade following the piper in a line - EVEN BIGGER */}
      <div
        data-el="miceLine"
        className={styles.photoWrap}
        style={{ bottom: "5%", left: "50%", width: 450, height: 300, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Grupo%20de%20ratones%20corriendo%20juntos.png"
          alt="Grupo de ratones corriendo"
          loading="lazy"
        />
      </div>
      <div
        data-el="miceLine"
        className={styles.photoWrap}
        style={{ bottom: "5%", left: "50%", width: 450, height: 300, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Grupo%20de%20ratones%20corriendo%20juntos.png"
          alt="Grupo de ratones corriendo"
          loading="lazy"
        />
      </div>
      <div
        data-el="miceLine"
        className={styles.photoWrap}
        style={{ bottom: "5%", left: "50%", width: 450, height: 300, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Grupo%20de%20ratones%20corriendo%20juntos.png"
          alt="Grupo de ratones corriendo"
          loading="lazy"
        />
      </div>

    </SectionFrame>
  );
}


