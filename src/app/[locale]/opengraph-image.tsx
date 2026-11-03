import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY = {
  en: "Generative AI Applications & Automation",
  pt: "Aplicações e Automações com IA Generativa",
} as const;

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const subtitle = locale === "pt" ? COPY.pt : COPY.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#FAFAF9",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#6B6B6B" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2F5BFF" }} />
          Luca Furtado
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 28 }}>
          AI Builder
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#6B6B6B", marginTop: 16 }}>{subtitle}</div>
      </div>
    ),
    { ...size }
  );
}
