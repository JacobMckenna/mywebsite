import React, { useEffect, useRef, useState } from "react";

export default function DotBackground({
  children,
  className = "",
  glow = true,
  glowStrength = 0.22,
}) {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReducedMotion(!!mq.matches);
    onChange();

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Default glow position (roughly top-center)
    el.style.setProperty("--mx", "50vw");
    el.style.setProperty("--my", "25vh");

    if (!glow || reducedMotion) return;

    let raf = 0;

    const setFromClient = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();

      // Mouse position relative to the element, in px
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x.toFixed(1)}px`);
        el.style.setProperty("--my", `${y.toFixed(1)}px`);
      });
    };

    const onMouseMove = (e) => setFromClient(e.clientX, e.clientY);

    const onTouchMove = (e) => {
      if (!e.touches?.length) return;
      const t = e.touches[0];
      setFromClient(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [glow, reducedMotion]);

  return (
    <div
      ref={ref}
      className={[
        "relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0b0c10] to-[#0f1117] text-slate-200",
        className,
      ].join(" ")}
      // the following line is needed to show the mouse glow
      // eslint-disable-next-line
      style={{ ["--glowA"]: glowStrength }}
    >
      {/* Static dots */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-95",
          "[background-image:radial-gradient(rgba(255,255,255,0.10)_1.2px,transparent_1px)]",
          "[background-size:30px_30px]",
          "[mask-image:radial-gradient(circle_at_50%_25%,black_0%,transparent_78%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_25%,black_0%,transparent_78%)]",
        ].join(" ")}
      />

      {/* Cursor spotlight glow (now uses px coords relative to wrapper) */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "[background:radial-gradient(600px_circle_at_var(--mx)_var(--my),rgba(59,130,246,var(--glowA)),transparent_60%)]",
          reducedMotion || !glow ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300",
        ].join(" ")}
      />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   [background:radial-gradient(circle_at_50%_30%,transparent_35%,rgba(0,0,0,0.55)_100%)]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
