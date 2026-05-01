import React, { useMemo } from 'react'
import BackgroundParticles from '../components/BackgroundParticles'
import { motion } from "framer-motion"
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import Avatar from "../assets/avator.png"

const Home = () => {
  const roles = useMemo(() => ["Web Developer", "Frontend Developer", "React Developer", "Software Developer"], [])
  const fullName = "Kavyansh Tiwari"

  const [index, setIndex] = React.useState(0)
  const [subIndex, setSubIndex] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)
  const pauseTimeoutRef = React.useRef(null)

  React.useEffect(() => {
    const current = roles[index]
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex(subIndex + 1)
      } else if (!deleting && subIndex === current.length) {
        pauseTimeoutRef.current = setTimeout(() => setDeleting(true), 1200)
      } else if (deleting && subIndex > 0) {
        setSubIndex(subIndex - 1)
      } else if (subIndex === 0 && deleting) {
        setDeleting(false)
        setIndex((index + 1) % roles.length)
      }
    }, deleting ? 40 : 60)
    return () => {
      clearTimeout(timeout)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [subIndex, index, deleting, roles])

  const Socials = [
    {Icon : FaXTwitter , lable : "X" , link : "https://x.com/TiwariKavy57507"},
    {Icon : FaInstagram , lable : "Instagram" , link : "https://www.instagram.com/kavyansh_tiwari01/"},
    {Icon : FaGithub , lable : "Github" , link : "https://github.com/kavyansh-devx/"}
  ]

  const GlowVarients = {
    initial : {scale: 1 , y: 0 , filter: "drop-shadow(rgba(0,0,0,0) 0px 0px 0px)"},
    hover : {
      scale : 1.2 , y : -3,
      filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition : {type : "spring" , stiffness : 300 , damping : 15}
    },
    tap : {scale : 0.95 , y: 0 , transition : {duration : 0.08}}
  }
  return (
    <section
      className='w-full h-screen relative bg-black overflow-visible'
      id='home'>
      <BackgroundParticles />
      <div className='absolute inset-0 overflow-visible'>
        <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-150 max-h-150 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[130px] md:blur-[150px] animate-pulse'>
        </div>
        <div className='absolute -bottom-32 -right-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-150 max-h-150 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[130px] md:blur-[150px] animate-pulse delay-100'>
        </div>
      </div>

      <div className='relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2'>
        <div className='flex flex-col justify-center h-full text-center lg:text-left relative'>
          <div className='w-full lg:pr-24 mx-auto max-w-3xl'>
            <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6}}
            className='mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]'>
              <span>
                {roles[index].substring(0, subIndex)}
              </span>
              <span
              style={{height:"1em", width: "2px"}} 
              className='inline-block ml-1 bg-white animate-pulse align-middle' >
              </span>
            </motion.div>

            <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg'>
              Hello, I'm
              <br />
              <span className='block text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight break-words lg:whitespace-nowrap'>{fullName}</span>
            </motion.h1>

            <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0'
            >
              I craft high-performance, modern websites that don’t just look good — they convert.
Focused on clean design, smooth user experience, and real-world results, I turn ideas into digital products that stand out in 2026.
            </motion.p >

            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'>
              <a 
              className='px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all'
              href="#projects">View My Work</a>
              <a 
              className='px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105'
              href="/Resume.pdf">My Resume</a>
            </motion.div>

            <div className='mt-10 ml-2 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              {Socials.map(({Icon, lable, link}) => (
                <motion.a 
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                  whileTap="tap"
                  whileHover="hover"
                  initial="initial"
                  variants={GlowVarients}
                  rel='noopener noreferrer'
                  aria-label={lable}
                  target='_blank'
                  key={lable}
                  href={link}>
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className='hidden lg:flex items-center justify-center h-full'>
        <div 
        style={{right : "10px", width : "min(22vw , 310px)" , height:"min(40vw , 660px)" , borderRadius:"50%", filter:"blur(38px)", opacity:0.32, background:"conic-gradient(from 0deg , #1cd8d2 , #00bf8f , #302b63 , #1cd8d2)"}}
        className='absolute top-1/2 -translate-y-1/2 pointer-events-none'/>
          <motion.img 
            src={Avatar} 
            alt={fullName}
            fetchpriority="high"
            className='w-full max-w-md h-auto rounded-lg shadow-2xl'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  )
}

export default Home
