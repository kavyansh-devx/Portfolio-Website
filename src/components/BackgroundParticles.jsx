import React, { useRef, useEffect } from 'react'

const BackgroundParticles = () => {
  const canvasref = useRef(null)

  useEffect(() => {
    const canvas = canvasref.current
    const ctx = canvas.getContext('2d')

    let particles = []
    const particlecount = 50
    const colours = ["rgba(255,255,255,0.9)"]

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.colour = colours[Math.floor(Math.random() * colours.length)]
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.shadowColor = this.colour
        ctx.shadowBlur = 10
        ctx.fillStyle = this.colour
        ctx.fill()
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }

        this.draw()
      }
    }

    function CreateParticles(){
      particles = []
      for (let i = 0; i < particlecount; i++) {
        particles.push(new Particle())
      }
    }

    function HandleResize(){
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      CreateParticles()
    }
    HandleResize();
    window.addEventListener('resize', HandleResize)

    let AnimateId;
    function Animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => particle.update())
      AnimateId = requestAnimationFrame(Animate)
    }
    Animate();

    return () => {
      window.removeEventListener('resize', HandleResize)
      cancelAnimationFrame(AnimateId)
    }
  }, [])

  return (
    <canvas
      ref={canvasref}
      className='absolute inset-0 pointer-events-none z-10'>
    </canvas>
  )
}

export default BackgroundParticles
