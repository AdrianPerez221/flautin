"use client";

import React from "react";
import SectionFrame from "../SectionFrame";

export default function Section11Reunion() {
  return (
    <SectionFrame id="section-11" bg="/reunion/reunion-feliz.png">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          right: "clamp(12px, 4vw, 36px)",
          left: "auto",
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
          El flautista devolvi&oacute; a los ni&ntilde;os.
          <br />
          Todos estaban felices otra vez.
          <br />
          Y nunca olvidaron cumplir sus promesas.
        </p>
      </div>
    </SectionFrame>
  );
}
