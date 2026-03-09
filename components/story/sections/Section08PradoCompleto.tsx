"use client";

import React from "react";
import SectionFrame from "../SectionFrame";

export default function Section08PradoCompleto() {
  return (
    <SectionFrame id="section-8" bg="/prado-completo/flautista-prado.png">
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
          El flautista llev&oacute; a los ni&ntilde;os
          <br />
          a un prado lleno de flores.
          <br />
          All&iacute; jugaron y se rieron.
        </p>
      </div>
    </SectionFrame>
  );
}
