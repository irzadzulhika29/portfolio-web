"use client"

import React, { useEffect, useRef, useState } from "react"

interface CursorProps {
  size?: number
  containerId?: string
}

export const Cursor: React.FC<CursorProps> = ({ size = 60, containerId }) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const previousPos = useRef({ x: -size, y: -size })

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: -size, y: -size })

  const animate = () => {
    if (!cursorRef.current) return

    const currentX = previousPos.current.x
    const currentY = previousPos.current.y
    const targetX = position.x - size / 2
    const targetY = position.y - size / 2

    const deltaX = (targetX - currentX) * 0.2
    const deltaY = (targetY - currentY) * 0.2

    const newX = currentX + deltaX
    const newY = currentY + deltaY

    previousPos.current = { x: newX, y: newY }
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : document.body
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is inside the container
      const rect = container.getBoundingClientRect()
      const isInside = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      setVisible(isInside)
      
      if (isInside) {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (containerId) {
        const rect = container.getBoundingClientRect()
        const isOutside = 
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        
        if (isOutside) {
          setVisible(false)
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [position, size, containerId])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference transition-opacity duration-300"
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  )
}

export default Cursor
