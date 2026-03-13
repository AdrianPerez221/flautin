"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionFrame from "../SectionFrame";
import styles from "../story.module.css";

gsap.registerPlugin(ScrollTrigger);

type DraggableId = "bread" | "basket";
type Point = { x: number; y: number };

const ASSET_SIZE = {
  bread: { width: 150, height: 95 },
  basket: { width: 190, height: 140 },
} as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function Section02Mice() {
  const rootRef = useRef<HTMLElement | null>(null);
  const dragStateRef = useRef<{
    id: DraggableId | null;
    pointerId: number | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    id: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [positions, setPositions] = React.useState<Record<DraggableId, Point>>({
    bread: { x: 0, y: 0 },
    basket: { x: 0, y: 0 },
  });
  const [positionsReady, setPositionsReady] = React.useState(false);

  const clampToSection = React.useCallback((id: DraggableId, point: Point, root: HTMLElement): Point => {
    const maxX = Math.max(0, root.clientWidth - ASSET_SIZE[id].width);
    const maxY = Math.max(0, root.clientHeight - ASSET_SIZE[id].height);
    return {
      x: clamp(point.x, 0, maxX),
      y: clamp(point.y, 0, maxY),
    };
  }, []);

  const getInitialPositions = React.useCallback(
    (root: HTMLElement): Record<DraggableId, Point> => {
      const basketStart = clampToSection(
        "basket",
        {
          x: root.clientWidth * 0.06,
          y: root.clientHeight * (1 - 0.14) - ASSET_SIZE.basket.height,
        },
        root
      );
      const breadStart = clampToSection(
        "bread",
        {
          x: basketStart.x + 38,
          y: basketStart.y + 26,
        },
        root
      );

      return {
        bread: breadStart,
        basket: basketStart,
      };
    },
    [clampToSection]
  );

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    setPositions(getInitialPositions(root));
    setPositionsReady(true);

    const handleResize = () => {
      const nextRoot = rootRef.current;
      if (!nextRoot) return;

      setPositions((prev) => ({
        bread: clampToSection("bread", prev.bread, nextRoot),
        basket: clampToSection("basket", prev.basket, nextRoot),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampToSection, getInitialPositions]);

  const handlePointerDown =
    (id: DraggableId) =>
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragStateRef.current = {
        id,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: positions[id].x,
        originY: positions[id].y,
      };
    };

  const handlePointerMove =
    (id: DraggableId) =>
    (event: React.PointerEvent<HTMLDivElement>) => {
      const root = rootRef.current;
      const drag = dragStateRef.current;
      if (!root || drag.id !== id || drag.pointerId !== event.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      const nextPoint = clampToSection(
        id,
        {
          x: drag.originX + dx,
          y: drag.originY + dy,
        },
        root
      );

      setPositions((prev) => ({
        ...prev,
        [id]: nextPoint,
      }));
    };

  const handlePointerUp =
    (id: DraggableId) =>
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (drag.id !== id || drag.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragStateRef.current = {
        id: null,
        pointerId: null,
        startX: 0,
        startY: 0,
        originX: 0,
        originY: 0,
      };
    };

  React.useLayoutEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      const t = root.querySelector('[data-el="text"]') as HTMLElement;
      const mouseHit = root.querySelector('[data-role="mouse-hit"]') as HTMLElement | null;
      const mouseOne = root.querySelector('[data-role="mouse-one"]') as HTMLElement | null;
      const mice = gsap.utils
        .toArray<HTMLElement>('[data-el="mouse"]', root)
        .filter((el) => el !== mouseHit && el !== mouseOne);
      const offLeft = -Math.max(window.innerWidth * 0.6, 380);
      const offRight = Math.max(window.innerWidth * 0.6, 380);
      gsap.set(t, { y: 18, opacity: 0 });
      gsap.set(mice, { x: offLeft, opacity: 0.95 });
      if (mouseHit) {
        gsap.set(mouseHit, { x: offLeft - 120, y: 30, opacity: 0.6, rotate: -8, scale: 0.95 });
      }
      if (mouseOne) {
        gsap.set(mouseOne, { x: offRight + 120, y: -10, opacity: 0.9, rotate: 6, scale: 0.95 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=160%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(t, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, 0.05);

      // mice parade (chaos but cute)
      tl.to(
        mice,
        {
          x: 360,
          stagger: 0.08,
          ease: "none",
          duration: 1,
        },
        0.1
      );

      // mouse #3 brushes the basket
      if (mouseHit) {
        tl.to(mouseHit, { x: 40, y: 6, opacity: 0.95, duration: 0.3, ease: "power2.out" }, 0.2);
        tl.to(mouseHit, { x: 160, y: 12, rotate: 8, duration: 0.45, ease: "power2.in" }, 0.4);
      }

      // mouse #1 crosses from right to center-bottom
      if (mouseOne) {
        tl.to(mouseOne, { x: -120, y: 30, rotate: -6, duration: 0.9, ease: "none" }, 0.1);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame ref={rootRef as any} id="section-2" bg="/pueblo-ratas.jpeg">
      <div
        data-el="text"
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          right: "clamp(10px, 4vw, 52px)",
          width: "clamp(340px, 40vw, 560px)",
          transform: "translateX(-10%)",
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
            fontSize: "clamp(14px, 1.7vw, 20px)",
            lineHeight: 1.3,
            fontWeight: 600,
            color: "#1f2c3e",
          }}
        >
          Un d&iacute;a, llegaron muchos ratones.
          <br />
          Corr&iacute;an por las calles y hac&iacute;an travesuras.
          <br />
          El pueblo no sab&iacute;a qu&eacute; hacer.
        </p>
      </div>

      {/* mice (you’ll replace with real sprites later) */}
      <div
        data-el="bread"
        className={`${styles.photoWrap} ${styles.clickable}`}
        onPointerDown={handlePointerDown("bread")}
        onPointerMove={handlePointerMove("bread")}
        onPointerUp={handlePointerUp("bread")}
        onPointerCancel={handlePointerUp("bread")}
        style={{
          top: positions.bread.y,
          left: positions.bread.x,
          width: ASSET_SIZE.bread.width,
          height: ASSET_SIZE.bread.height,
          zIndex: 2,
          visibility: positionsReady ? "visible" : "hidden",
          touchAction: "none",
        }}
      >
        <img
          className={styles.photoAsset}
          src="/pan.png"
          alt="Pan rodando"
          loading="lazy"
          draggable={false}
          style={{ transform: "rotate(-8deg) scale(0.9)" }}
        />
      </div>

      <div
        data-el="basket"
        className={`${styles.photoWrap} ${styles.clickable}`}
        onPointerDown={handlePointerDown("basket")}
        onPointerMove={handlePointerMove("basket")}
        onPointerUp={handlePointerUp("basket")}
        onPointerCancel={handlePointerUp("basket")}
        style={{
          top: positions.basket.y,
          left: positions.basket.x,
          width: ASSET_SIZE.basket.width,
          height: ASSET_SIZE.basket.height,
          zIndex: 3,
          visibility: positionsReady ? "visible" : "hidden",
          touchAction: "none",
        }}
      >
        <img
          className={styles.photoAsset}
          src="/basket-del-pan.png"
          alt="Canasta de pan"
          loading="lazy"
          draggable={false}
          style={{ transform: "rotate(-4deg)", opacity: 0.95 }}
        />
      </div>

    </SectionFrame>
  );
}

