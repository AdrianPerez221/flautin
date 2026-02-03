"use client";

import React from "react";
import styles from "./story.module.css";

import Section00Intro from "./sections/Section00Intro";
import Section01Welcome from "./sections/Section01Welcome";
import Section02Mice from "./sections/Section02Mice";
import Section03Piper from "./sections/Section03Piper";
import Section04Promise from "./sections/Section04Promise";
import Section05Parade from "./sections/Section05Parade";

export default function Story() {
  return (
    <main className={styles.story}>
      <Section00Intro />
      <Section01Welcome />
      <Section02Mice />
      <Section03Piper />
      <Section04Promise />
      <Section05Parade />
    </main>
  );
}
