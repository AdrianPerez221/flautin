"use client";

import React, { forwardRef } from "react";
import styles from "./story.module.css";

type Props = {
  id: string;
  bg: string; // /public path
  children?: React.ReactNode;
};

const SectionFrame = forwardRef<HTMLElement, Props>(function SectionFrame({ id, bg, children }, ref) {
  return (
    <section ref={ref} id={id} className={styles.section}>
      <div className={styles.bg} style={{ backgroundImage: `url(${bg})` }} />
      {children}
    </section>
  );
});

export default SectionFrame;

