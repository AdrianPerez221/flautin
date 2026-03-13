"use client";

import React from "react";
import SectionFrame from "../SectionFrame";

export default function Section09AdultosPueblo() {
  return (
    <SectionFrame id="section-9" bg="/adultos-pueblo/adultos-preocupados.png">
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 4vh, 36px)",
          left: "clamp(12px, 4vw, 36px)",
          width: "clamp(280px, 34vw, 520px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <img
          src="/nube-texto.png"
          alt=""
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto", transform: "scaleX(-1)" }}
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
          Al no ver a los ni&ntilde;os,
          <br />
          el pueblo se preocup&oacute;.
          <br />
          Entendieron su error.
        </p>
      </div>
    </SectionFrame>
  );
}

