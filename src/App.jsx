import React from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Overlay from './components/Overlay'
import Experience from './Sections/experience'
import About from './Sections/about'
import Contact from './Sections/contact'
import Home from './Sections/home'
import Footer from './Sections/footer'
import Projects from './Sections/projects'
import Skills from './Sections/skills'
import IntroAnimation from './components/IntroAnimation'


const App = () => {
  const [introDone, setIntroDone] = React.useState(false)
  return (
    <div style={{ overflowX: 'clip', width: '100%', maxWidth: '100vw' }}>
      {!introDone && <IntroAnimation OnFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className='relative bg-linear-to-br from-black via-gray-900 to-black text-white min-h-screen'>
          <CustomCursor />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Overlay />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default App
