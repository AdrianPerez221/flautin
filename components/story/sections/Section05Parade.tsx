"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import PlaceholderAsset from "../PlaceholderAsset";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section05Parade() {
  const rootRef = useRef<HTMLElement | null>(null);
  const coupleRef = useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const piper = root.querySelector('[data-el="piper"]') as HTMLElement;
      const couple = coupleRef.current;
      const miceLine = gsap.utils.toArray<HTMLElement>('[data-el="miceLine"]', root);
      const notes = gsap.utils.toArray<HTMLElement>('[data-el="note"]', root);
      const offRight = window.innerWidth + 200;
      const offLeft = -400;

      // Initial setup
      gsap.set(t, { y: 18, opacity: 0 });
      
      // PIPER LEADS - he's to the LEFT (smaller x) so he enters first and leads
      gsap.set(piper, { x: offRight - 300, opacity: 0 });
      
      // Position notes to start from the flute (right side of piper, at head level)
      gsap.set(notes, { 
        x: (i) => offRight - 100 - (i * 65), // Closer to flute, tighter spacing
        y: 0, // Set initial y position
        opacity: 0, 
        scale: 0.8 
      });
      
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
        },
      });

      // Fade in text
      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);
      
      // Parade enters from right and crosses to left together - MUCH SLOWER NOW
      // Piper leads (enters first, stays on the left)
      tl.to(piper, { 
        x: offLeft - 300, 
        opacity: 1, 
        duration: 2.5, // Increased from 1.2 to 2.5 for slower movement
        ease: "none" 
      }, 0.15);

      // Notes flow from the flute as the piper moves
      tl.to(notes, {
        x: (i) => offLeft - 100 - (i * 65), // Adjusted to be closer to flute
        opacity: 1,
        scale: 1,
        duration: 2.5, // Increased from 1.2 to 2.5
        ease: "none",
      }, 0.15);
      
      // Keep notes visible for the rest of the animation
      tl.to(notes, { opacity: 1 }, "+=0");

      // Mice follow behind - closer to piper
      tl.to(miceLine, {
        x: (i) => offLeft + 100 + (i * 240), // Keep same spacing
        opacity: 1,
        duration: 2.5, // Increased from 1.2 to 2.5
        ease: "none",
      }, 0.15);

      // Floating animation for notes (only y-axis to avoid conflict with scrubbed x animation)
      notes.forEach((el, i) => {
        // Each note floats up and down gently and smoothly
        gsap.to(el, { 
          y: "-=18", 
          duration: 1.3 + i * 0.12, 
          yoyo: true, 
          repeat: -1, 
          ease: "sine.inOut",
          delay: i * 0.1 
        });
      });

      // Gentle dancing sway for the couple
      if (couple) {
        gsap.to(couple, { y: "+=6", rotate: 2, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-5" bg="/parade/fondo-parade.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.kicker}>Section 5</div>
        <h2 className={styles.h2}>Magic music leads the way</h2>
        <p className={styles.p}>
          The Piper played a happy tune… and the mice followed him in a silly dancing parade toward the town gate.
        </p>
      </div>

      {/* Piper leading the parade - MUCH BIGGER */}
      <div
        data-el="piper"
        className={styles.photoWrap}
        style={{ bottom: "4%", left: "50%", width: 420, height: 560, zIndex: 3 }}
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
        style={{ bottom: "5%", left: "50%", width: 360, height: 240, zIndex: 2 }}
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
        style={{ bottom: "5%", left: "50%", width: 360, height: 240, zIndex: 2 }}
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
        style={{ bottom: "5%", left: "50%", width: 360, height: 240, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Grupo%20de%20ratones%20corriendo%20juntos.png"
          alt="Grupo de ratones corriendo"
          loading="lazy"
        />
      </div>

      {/* Musical notes flowing from the flute - positioned higher */}
      <div data-el="note">
        <PlaceholderAsset 
          label="♪" 
          kind="circle" 
          w={50} 
          h={50} 
          style={{ top: "10%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♫" 
          kind="circle" 
          w={45} 
          h={45} 
          style={{ top: "8%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♪" 
          kind="circle" 
          w={48} 
          h={48} 
          style={{ top: "12%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♫" 
          kind="circle" 
          w={52} 
          h={52} 
          style={{ top: "6%", left: "50%", zIndex: 4 }} 
        />
      </div>
    </SectionFrame>
  );
}