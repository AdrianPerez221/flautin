"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      lerp: prefersReduced ? 1 : 0.08,
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
    });

    // drive Lenis with GSAP ticker so ScrollTrigger + Lenis stay in sync
    const tick = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker is in seconds
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    // make sure triggers calculate correctly once DOM is ready
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Expose for debugging if you want
    (window as any).lenis = lenis;

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
