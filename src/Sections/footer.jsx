import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import Logo from '../assets/logo.png';

const socials = [
  { Icon: FaXTwitter, label: 'X / Twitter', href: 'https://x.com/TiwariKavy57507' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/kavyansh_tiwari01/' },
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/kavyansh-devx/' },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-10 overflow-hidden border-t border-white/10">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-gradient-to-r from-[#1cd8d2]/10 via-[#00bf8f]/10 to-[#302b63]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">

        {/* Logo & Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <img src={Logo} alt="Kavyansh Tiwari Logo" className="w-16 h-16 object-contain" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Kavyansh Tiwari
          </h2>
        </motion.div>

        {/* Motivational Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 max-w-lg"
        >
          <p className="text-gray-400 text-lg font-medium tracking-wide">
            "Dream big. <span className="text-[#1cd8d2]">Code beautifully.</span> Inspire always."
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-5 mb-16"
        >
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#1cd8d2]/50 hover:bg-[#1cd8d2]/10 hover:shadow-[0_0_20px_rgba(28,216,210,0.3)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Copyright & Trademarks */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full text-xs text-gray-500 font-light tracking-wider gap-4">
          <p>
            &copy; {new Date().getFullYear()} Kavyansh Tiwari. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-[#1cd8d2] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#1cd8d2] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#1cd8d2] transition-colors cursor-pointer">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
