"use client";

import React from "react";
import styles from "./story.module.css";

import Section00Intro from "./sections/Section00Intro";
import Section01Welcome from "./sections/Section01Welcome";
import Section02Mice from "./sections/Section02Mice";
import Section03Piper from "./sections/Section03Piper";
import Section04Promise from "./sections/Section04Promise";
import Section05Parade from "./sections/Section05Parade";
import Section06Estafa from "./sections/Section06Estafa";
import Section07CaminataConNinos from "./sections/Section07CaminataConNinos";
import Section08PradoCompleto from "./sections/Section08PradoCompleto";
import Section09AdultosPueblo from "./sections/Section09AdultosPueblo";
import Section10AdultosSorry from "./sections/Section10AdultosSorry";
import Section11Reunion from "./sections/Section11Reunion";

export default function Story() {
  return (
    <main className={styles.story}>
      <Section00Intro />
      <Section01Welcome />
      <Section02Mice />
      <Section03Piper />
      <Section04Promise />
      <Section05Parade />
      <Section06Estafa />
      <Section07CaminataConNinos />
      <Section08PradoCompleto />
      <Section09AdultosPueblo />
      <Section10AdultosSorry />
      <Section11Reunion />
    </main>
  );
}
