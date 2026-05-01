import React, { useEffect, useRef, useState } from 'react'
import Overlay from './Overlay'
import Logo from '../assets/logo.png'
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Visable, setVisable] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const [hideOnProjects, setHideOnProjects] = useState(false);
  const [hideOnExperience, setHideOnExperience] = useState(false);

  const LastScrollY = useRef(0);
  const TimerID = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (hideOnProjects || hideOnExperience) {
        setVisable(false);
        return;
      }
      if (forceVisible) {
        setVisable(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > LastScrollY.current && currentScrollY > 100) {
        setVisable(false);
      } else {
        setVisable(true);
        if (TimerID.current) {
          clearTimeout(TimerID.current);
        }
        TimerID.current = setTimeout(() => {
          setVisable(false);
        }, 2000);
      }
      LastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (TimerID.current) {
        clearTimeout(TimerID.current);
      }
    };
  }, [forceVisible, hideOnProjects, hideOnExperience]);

  useEffect(() => {
    const HomeSection = document.getElementById("home");
    if (HomeSection) {
      const Observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setForceVisible(true);
            setVisable(true);
          } else{
            setForceVisible(false);
            setVisable(false);
          }
        }, { threshold: 0.1 }
      );
      Observer.observe(HomeSection);

      return () => Observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnProjects(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisable(false);
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(projectsSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const experienceSection = document.getElementById("experience");
    if (!experienceSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnExperience(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisable(false);
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(experienceSection);
    return () => observer.disconnect();
  }, []);

return (
  <div>

    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] ${Visable ? 'translate-y-0' : '-translate-y-full'}`}>

      <div className='flex items-center space-x-2'>
        <img src={Logo} alt="" className='w-10 h-10' />
        <div className='text-xl sm:text-2xl font-bold text-white sm:block'>Kavyansh Tiwari</div>
      </div>

      <div className='block lg:absolute lg:left-1/2 lg:transform lg:translate-x-1/2'>
        <button onClick={() => {
          setMenuOpen(true)
        }
        } className='text-3xl text-white focus:outline-none'
          aria-label="Open Menu"
        >
          <CiMenuBurger />
        </button>
      </div>

      <div className='hidden lg:block'>
        <a href="#contact" className='bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>Reach Out</a>

      </div>
    </nav>

    <Overlay isOpen={menuOpen} onClose={() => { setMenuOpen(false) }} />
  </div>
)
}

export default Navbar
