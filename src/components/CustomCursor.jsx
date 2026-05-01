import React, { useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div 
    style={{transform: `translate(${position.x - 40}px , ${position.y - 40}px)`}}
    className='pointer-events-none fixed top-0 left-0 z-50'>
      <div className='w-20 h-20 rounded-full bg-linear-to-r from-pink-500 to-blue-500 blur-3xl opacity-80 '/>
    </div>
  )
}

export default CustomCursor
