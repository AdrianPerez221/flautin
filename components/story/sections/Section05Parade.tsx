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
      // Piper faces left (normal image orientation, no flip)
      gsap.set(piper, { x: offRight, opacity: 0 });
      
      // Position notes in a line above and behind the piper
      gsap.set(notes, { 
        x: (i) => offRight - 200 - (i * 120), // Stagger notes in a line
        opacity: 0, 
        scale: 0.8 
      });
      
      // Position mice in a tight line behind the piper (flipped to face left)
      gsap.set(miceLine, { 
        x: (i) => offRight - 400 - (i * 180), // Stagger them behind piper
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
          end: "+=170%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Fade in text
      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);
      
      // Parade enters from right and crosses to left together
      // Piper leads the parade
      tl.to(piper, { 
        x: offLeft, 
        opacity: 1, 
        duration: 1.2, 
        ease: "none" 
      }, 0.15);

      // Notes follow above the piper in formation
      tl.to(notes, {
        x: (i) => offLeft - 200 - (i * 120), // Keep the same spacing as they move
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "none",
      }, 0.15);

      // Mice follow behind in tight formation
      tl.to(miceLine, {
        x: (i) => offLeft - 400 - (i * 180), // Keep the same spacing as they move
        opacity: 1,
        duration: 1.2,
        ease: "none",
      }, 0.15);

      // Floating animation for notes (happens continuously)
      notes.forEach((el, i) => {
        // Each note floats up and down gently
        gsap.to(el, { 
          y: "-=20", 
          duration: 1.0 + i * 0.1, 
          yoyo: true, 
          repeat: -1, 
          ease: "sine.inOut",
          delay: i * 0.08 
        });
        
        // Also add a gentle horizontal wave
        gsap.to(el, { 
          x: "+=10", 
          duration: 1.3 + i * 0.15, 
          yoyo: true, 
          repeat: -1, 
          ease: "sine.inOut",
          delay: i * 0.12 
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

      {/* Piper leading the parade */}
      <div
        data-el="piper"
        className={styles.photoWrap}
        style={{ bottom: "8%", left: "50%", width: 280, height: 380, zIndex: 3 }}
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

      {/* Mice parade following the piper in a line */}
      <div
        data-el="miceLine"
        className={styles.photoWrap}
        style={{ bottom: "7%", left: "50%", width: 180, height: 120, zIndex: 2 }}
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
        style={{ bottom: "7%", left: "50%", width: 180, height: 120, zIndex: 2 }}
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
        style={{ bottom: "7%", left: "50%", width: 180, height: 120, zIndex: 2 }}
      >
        <img
          className={styles.photoAsset}
          src="/parade/Grupo%20de%20ratones%20corriendo%20juntos.png"
          alt="Grupo de ratones corriendo"
          loading="lazy"
        />
      </div>

      {/* Musical notes floating above the piper in a line */}
      <div data-el="note">
        <PlaceholderAsset 
          label="♪" 
          kind="circle" 
          w={60} 
          h={60} 
          style={{ top: "12%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♫" 
          kind="circle" 
          w={50} 
          h={50} 
          style={{ top: "10%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♪" 
          kind="circle" 
          w={55} 
          h={55} 
          style={{ top: "14%", left: "50%", zIndex: 4 }} 
        />
      </div>
      <div data-el="note">
        <PlaceholderAsset 
          label="♫" 
          kind="circle" 
          w={65} 
          h={65} 
          style={{ top: "11%", left: "50%", zIndex: 4 }} 
        />
      </div>
    </SectionFrame>
  );
}