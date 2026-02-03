"use client";

import React from "react";
import styles from "./story.module.css";

type Props = {
  label: string;
  kind?: "rect" | "circle";
  w?: number;
  h?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function PlaceholderAsset({
  label,
  kind = "rect",
  w = 160,
  h = 120,
  style,
  className,
}: Props) {
  const shapeClass = kind === "circle" ? styles.round : styles.soft;

  return (
    <div
      className={`${styles.asset} ${shapeClass} ${styles.glow} ${className ?? ""}`}
      style={{ width: w, height: h, ...style }}
      aria-label={label}
    >
      <div className={styles.assetLabel}>{label}</div>
    </div>
  );
}
