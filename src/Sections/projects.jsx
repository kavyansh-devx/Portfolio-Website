import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
  AnimatePresence,
} from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";

void motion;

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return isMobile;
};

// Split title into chars for stagger animation
function SplitTitle({ text }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: char === " " ? "inline" : "inline-block", fontWeight: 800 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const shouldReduceMotion = useReducedMotion();

  const projects = useMemo(
    () => [
      {
        title: "Ember Table",
        link: "https://ember-table.vercel.app",
        bgGradient:
          "radial-gradient(circle at 22% 12%, rgba(255,190,86,0.42) 0%, transparent 45%), radial-gradient(circle at 82% 88%, rgba(110,52,14,0.35) 0%, transparent 50%), linear-gradient(180deg,#d99235 0%,#c67e24 48%,#a9611a 100%)",
        image: isMobile ? photo1 : img1,
        index: "01",
      },
      {
        title: "EstateX",
        link: "https://estatex-rho.vercel.app",
        bgGradient:
          "radial-gradient(circle at 15% 10%, rgba(186,218,255,0.34) 0%, transparent 42%), radial-gradient(circle at 85% 84%, rgba(18,56,102,0.42) 0%, transparent 50%), linear-gradient(180deg,#4c84bf 0%,#3e73ad 45%,#315f95 100%)",
        image: isMobile ? photo2 : img2,
        index: "02",
      },
      {
        title: "Elevate Fitness",
        link: "https://elevate-fitness-nu.vercel.app",
        bgGradient:
          "radial-gradient(circle at 18% 8%, rgba(243,137,64,0.28) 0%, transparent 40%), radial-gradient(circle at 84% 88%, rgba(19,22,32,0.75) 0%, transparent 52%), linear-gradient(180deg,#23293a 0%,#1a1f2d 50%,#111522 100%)",
        image: isMobile ? photo3 : img3,
        index: "03",
      },
    ],
    [isMobile],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    if (activeIndexRef.current !== next) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  });

  const activeProject = projects[activeIndex];

  // Parallax + UI opacity driven by MotionValue (avoids per-frame React re-renders)
  const parallaxY = useTransform(scrollYProgress, (v) => {
    const slotProgress = (v * projects.length) % 1;
    return (slotProgress - 0.5) * 24;
  });

  const scrollHintOpacity = useTransform(scrollYProgress, (v) => (v > 0.05 ? 0 : 0.5));

  const handleDotClick = useCallback((idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (idx / projects.length) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative text-white"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Layered BGs — cross-fade via opacity */}
      {projects.map((p, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          style={{ backgroundImage: p.bgGradient }}
        />
      ))}

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }}
      />

      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-8 z-20 relative">
        {/* Label */}
        <motion.h2
          className="mb-10 relative z-20 text-[24px] font-bold tracking-[0.18em] text-white/85 sm:mb-20"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My work
        </motion.h2>

        <div className="relative w-full max-w-[960px]">
          {/* Title — char split */}
          <div className="absolute -top-14 left-0 z-0 h-[1.1em] overflow-hidden text-white/70 sm:-top-18"
            style={{
              fontFamily: "'roboto', sans-serif",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: "clamp(2.5rem,7vw,5.5rem)",
              lineHeight: 1,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={activeProject.title}>
                {shouldReduceMotion ? activeProject.title : <SplitTitle text={activeProject.title} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
              transition={shouldReduceMotion ? { duration: 0.15 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 overflow-hidden rounded-2xl border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]"
              style={{ background: "rgba(0,0,0,0.15)", position: "relative" }}
            >
              {/* Shimmer */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)" }}
              />
              <motion.img
                src={activeProject.image}
                alt={activeProject.title}
                loading="lazy"
                className="w-full object-cover"
                style={{
                  height: "clamp(340px,68vh,620px)",
                  y: shouldReduceMotion || isMobile ? 0 : parallaxY,
                  scale: 1.06,
                  display: "block",
                }}
                transition={shouldReduceMotion || isMobile ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 20 }}
              />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* CTA row */}
        <div className="mt-5 flex w-full max-w-[960px] items-center gap-6">
          <motion.a
            href={activeProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white px-5 py-2.5 text-xs font-medium tracking-widest text-black shadow-md uppercase"
            style={{ fontFamily: "inherit" }}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04, boxShadow: "0 12px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 20 }}
          >
            View Project →
          </motion.a>

          {/* Progress dots */}
          <div className="ml-auto flex gap-2">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => handleDotClick(i)}
                className="rounded-full"
                animate={{
                  scale: i === activeIndex ? 1.4 : 1,
                  background: i === activeIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: 8, height: 8, border: "none", cursor: "pointer" }}
                aria-label={`Go to ${projects[i].title}`}
              />
            ))}
          </div>
        </div>

        {/* Ghost index number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeProject.index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 right-4 select-none pointer-events-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(5rem,14vw,10rem)",
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
            }}
          >
            {activeProject.index}
          </motion.span>
        </AnimatePresence>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ opacity: shouldReduceMotion ? 0.5 : scrollHintOpacity }}
        >
          <span className="text-[9px] tracking-[0.2em] uppercase">scroll</span>
          {shouldReduceMotion || isMobile ? (
            <div className="w-px bg-gradient-to-b from-transparent to-white" style={{ height: 20 }} />
          ) : (
            <motion.div
              className="w-px bg-gradient-to-b from-transparent to-white"
              animate={{ height: [20, 30, 20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}