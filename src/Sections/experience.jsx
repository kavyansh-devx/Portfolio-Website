import {
  motion as Motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
  {
    title: "Web Developer",
    company: "Self-Driven Projects",
    duration: "2025 – Present",
    description:
      "Built responsive, high-performance websites with modern UI. Focused on speed, clean design, and smooth user experience.",
  },
  {
    title: "Frontend Web Developer",
    company: "Independent Learning",
    duration: "2024 – 2025",
    description:
      "Developed strong skills in HTML, CSS, JavaScript, and React by building real-world projects. Improved problem-solving ability and learned how to convert ideas into functional websites.",
  },
  {
    title: "UI/UX Focused Developer",
    company: "Ongoing",
    duration: "Present",
    description:
      "Designed clean, visually appealing interfaces for better engagement. Optimized websites for performance, responsiveness, and usability.",
  },
];

const N = EXPERIENCES.length;

// ─── Defined OUTSIDE Experience ───────────────────────────────────────────────
// Keeping it outside prevents React from treating it as a new component type
// on every parent render, which would cause remount + broken initial values.
function ExperienceCard({ exp, idx, scrollYProgress, layout }) {
  const segStart = idx / N;
  const fadeEnd  = segStart + 0.15 * (1 / N);

  // Always initialized to 0 — cards are ALWAYS hidden on first paint
  // regardless of what scrollYProgress happens to be at mount time.
  const opacity = useMotionValue(0);
  const scale   = useMotionValue(0.82);
  const y       = useMotionValue(idx % 2 === 0 ? 40 : -40);
  const x       = useMotionValue(-28);

  // Drive values directly from scroll events instead of useTransform,
  // so initialization can never "skip ahead" to a wrong visible state.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= segStart) {
      // Scroll is before this card's window → fully hidden
      opacity.set(0);
      scale.set(0.82);
      y.set(idx % 2 === 0 ? 40 : -40);
      x.set(-28);
    } else {
      // Interpolate 0→1 over the fade window, then clamp at 1
      const t = Math.min(1, (latest - segStart) / (fadeEnd - segStart));
      opacity.set(t);
      scale.set(0.82 + t * 0.18);
      y.set((idx % 2 === 0 ? 40 : -40) * (1 - t));
      x.set(-28 * (1 - t));
    }
  });

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        {/* Dot */}
        <Motion.div
          style={{ scale, opacity }}
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        />
        {/* Connector */}
        <Motion.div
          style={{ height: 40, opacity }}
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "top-8"} w-[3px] bg-white/40`}
        />
        {/* Card */}
        <Motion.article
          style={{ opacity, y, scale, maxWidth: "90vh" }}
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
        >
          <h3 className="text-lg font-semibold">{exp.title}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p>{exp.description}</p>
        </Motion.article>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className="relative flex items-start">
      <Motion.div
        style={{ scale, opacity }}
        className="absolute -left-[14px] top-3 z-10 w-5 h-5 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
      />
      <Motion.article
        style={{ opacity, x }}
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold break-words">{exp.title}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </Motion.article>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

const Experience = () => {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sceneHeight = isMobile ? 200 * N : 150 * N;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section className="relative bg-black text-white py-20" id="experience">
      <div
        className="relative"
        style={{ height: `${sceneHeight}vh`, minHeight: "120vh" }}
        ref={sceneRef}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {/* ── Desktop ── */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <Motion.div
                    style={{ width: lineSize }}
                    className="bg-white rounded origin-left absolute left-0 top-0 h-[6px]"
                  />
                </div>
                <div className="relative flex justify-between mt-10">
                  {EXPERIENCES.map((exp, idx) => (
                    <ExperienceCard
                      key={idx}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      idx={idx}
                      exp={exp}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Mobile ── */}
            {isMobile && (
              <div className="relative w-full max-w-xl">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white/15 rounded">
                  <Motion.div
                    style={{ height: lineSize }}
                    className="absolute left-0 top-0 w-[2px] bg-white rounded origin-top"
                  />
                </div>
                <div className="relative flex flex-col gap-8 pl-2">
                  {EXPERIENCES.map((exp, idx) => (
                    <ExperienceCard
                      key={idx}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                      idx={idx}
                      exp={exp}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
