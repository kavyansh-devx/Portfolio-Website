import React from 'react'
import P from "../assets/p.png"
import { motion } from 'framer-motion'

const About = () => {
  const stats = [
    { label: "Experience", value: "1+ Year" },
    { label: "Focus", value: "Performance & UI/UX" },
    { label: "Clients", value: "25+ Fully Satisfied" },
  ]


  const fullName = "Kavyansh Tiwari"
  const imageHover = {
    initial: {
      scale: 1,
      y: 0,
      filter: "drop-shadow(rgba(0,0,0,0) 0px 0px 0px)"
    },
    hover: {
      scale: 1.06,
      y: -6,
      filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  }
  const Glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-20 blur-[120px]",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]
  return (
    <section
      className='min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden'
      id="about">
      <div className='absolute pointer-events-none inset-0'>
        {Glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12"
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={imageHover}
            className="relative w-40 h-40 md:w-50 md:h-50 md:mt-4 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#1cd8d2] to-[#302b63]/20"
          >
            <img src={P} alt={fullName} loading="lazy" className='absolute inset-0 h-full w-full object-cover' />
          </motion.div>

          <div className='flex flex-col justify-center text-center md:text-left'>

            <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]'>{fullName}
            </h1>

            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>Frontend Developer</p>

            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>I help businesses stand out online by creating fast, modern websites designed to attract attention and convert visitors into customers. Every detail is focused on performance, user experience, and real results — so your online presence doesn’t just exist, it works.</p>

            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-xl'>
              {stats.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className='rounded-xl border border-[#1cd8d2]/40 bg-white/10 py-6 px-5 text-center shadow-lg shadow-[#00bf8f]/10 backdrop-blur'
                  key={item.label}>
                  <div className='text-sm text-gray-400'>{item.label}</div>
                  <div className='text-lg font-semibold'>{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition' href="#projects">View Projects</a>
              <a className='inline-flex items-center justify-center rounded-lg border border-white/20 text-white px-5 py-3 hover:bg-white/20 transition' href="#contact">Get In Touch</a>
            </div>

          </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6}}
        viewport={{ once: true, amount: 0.4 }}
         className='text-center md:text-left'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>About Me</h3>
          <p className='text-gray-300 leading-relaxed text-base sm:text-lg'>I'm a web developer who builds fast, modern, and result-driven websites.
            I focus on clean design, smooth user experience, and real-world impact.</p>
          <p className='mt-4 text-gray-400 text-base sm:text-lg'>My goal is simple — create digital products that stand out and perform.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default About
