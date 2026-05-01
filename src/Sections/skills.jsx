import React from 'react'
import { FaReact } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiNextjsFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { icon: <FaReact />, name: 'React' },
    { icon: <FaGitAlt />, name: 'Git' },
    { icon: <IoLogoJavascript />, name: 'JavaScript' },
    { icon: <FaHtml5 />, name: 'HTML' },
    { icon: <RiTailwindCssFill />, name: 'Tailwind CSS' },
    { icon: <RiNextjsFill />, name: 'Next.js' },
  ]
  const marqueeItems = [...skills, ...skills, ...skills]
  
  return (
    <section 
    id='skills' className='min-h-[70vh] py-16 w-full flex flex-col items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse'/>
        <div className='absolute bottom-1/4 right-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500'/>
      </div>
      
      <motion.h2 
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 , delay: 0.1}}
      className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'>My Skills</motion.h2>
      <motion.p 
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 , delay: 0.1}}
      className='mt-2 mb-4 text-white/90 text-base sm:text-lg z-10'>Modern Applications | Modern Technologies
      </motion.p>

      <div 

      className='relative z-10 flex min-h-52 w-full items-center overflow-hidden py-10'>
        <motion.div
          animate={{ x: ['-50%', '0%'], opacity: 1, y: 0 }}
          transition={{
            x: { duration: 80, repeat: Infinity, ease: 'linear' }
          }}
          className='flex w-max items-center text-6xl text-[#1cd8d2]'
        >
          {[0, 1].map((group) => (
            <div key={group} className='flex shrink-0 items-center gap-8 px-4'>
              {marqueeItems.map((s, i) => (
                <motion.div
                  title={s.name}
                  aria-label={s.name}
                  whileHover={{ y: -10, scale: 1.16, rotate: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex min-h-36 min-w-28 flex-col items-center justify-center gap-3'
                  key={`${group}-${s.name}-${i}`}
                >
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: (i % skills.length) * 0.15,
                      ease: 'easeInOut'
                    }}
                    className='drop-shadow-[0_0_18px_rgba(28,216,210,0.35)]'
                  >
                    {s.icon}
                  </motion.span>
                  <span className='text-sm font-medium text-[#1cd8d2]'>
                    {s.name}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      
    </section>
  )
}

export default Skills
