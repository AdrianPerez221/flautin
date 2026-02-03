"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import PlaceholderAsset from "../PlaceholderAsset";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Section04Promise() {
  const rootRef = useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const handshake = root.querySelector('[data-el="handshake"]') as HTMLElement;
      const mayor = root.querySelector('[data-el="mayor"]') as HTMLElement;
      const coinbag = root.querySelector('[data-el="coinbag"]') as HTMLElement;

      gsap.set(t, { y: 18, opacity: 0 });
      gsap.set(mayor, { x: 180, opacity: 0 });
      gsap.set(handshake, { scale: 0.9, opacity: 0, y: 24 });
      gsap.set(coinbag, { y: 24, opacity: 0, rotate: -10 });

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
      tl.to(mayor, { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.12);

      tl.to(handshake, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, 0.2);
      tl.to(coinbag, { opacity: 1, y: 0, rotate: 0, duration: 0.35, ease: "back.out(1.4)" }, 0.28);

      // tiny wiggle to make it cute
      gsap.to(coinbag, { rotate: 3, duration: 1.1, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-4" bg="/flautin-negociando.jpeg">
      <div className={styles.content} data-el="text">
        <div className={styles.kicker}>Section 4</div>
        <h2 className={styles.h2}>A promise is made</h2>
        <p className={styles.p}>
          The mayor and the people agreed: “If you help us, we will keep our promise and reward you.”
        </p>
      </div>

      <div data-el="mayor">
        <PlaceholderAsset label="PLACEHOLDER: Mayor (PNG)" w={240} h={380} style={{ bottom: "10%", left: "70%" }} />
      </div>

      <div data-el="handshake">
        <PlaceholderAsset label="PLACEHOLDER: handshake moment" w={320} h={200} style={{ bottom: "22%", left: "34%" }} />
      </div>

      <div data-el="coinbag">
        <PlaceholderAsset label="PLACEHOLDER: coin pouch" w={160} h={140} style={{ bottom: "12%", left: "44%" }} />
      </div>
    </SectionFrame>
  );
}
