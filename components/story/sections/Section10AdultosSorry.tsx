"use client";

import React from "react";
import SectionFrame from "../SectionFrame";

export default function Section10AdultosSorry() {
  return (
    <SectionFrame id="section-10" bg="/adultos-sorry/adultos-perdon.png">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px, 34vw, 520px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <img
          src="/nube-texto.png"
          alt=""
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto" }}
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
          El pueblo pidi&oacute; perd&oacute;n al flautista.
          <br />
          Dijeron: &ldquo;Nos equivocamos&rdquo;.
          <br />
          Cumplieron su promesa.
        </p>
      </div>
    </SectionFrame>
  );
}
