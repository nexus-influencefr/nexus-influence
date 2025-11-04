import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './AnimatedBackground.css'

const AnimatedBackground = () => {
  const containerRef = useRef(null)
  const activeLines = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createRandomPath = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      const edges = ['top', 'bottom', 'left', 'right']
      const startEdge = edges[Math.floor(Math.random() * edges.length)]
      let endEdge = edges[Math.floor(Math.random() * edges.length)]
      
      while (endEdge === startEdge) {
        endEdge = edges[Math.floor(Math.random() * edges.length)]
      }
      
      let startX, startY
      switch (startEdge) {
        case 'top': startX = Math.random() * width; startY = -50; break
        case 'bottom': startX = Math.random() * width; startY = height + 50; break
        case 'left': startX = -50; startY = Math.random() * height; break
        case 'right': startX = width + 50; startY = Math.random() * height; break
      }
      
      let endX, endY
      switch (endEdge) {
        case 'top': endX = Math.random() * width; endY = -50; break
        case 'bottom': endX = Math.random() * width; endY = height + 50; break
        case 'left': endX = -50; endY = Math.random() * height; break
        case 'right': endX = width + 50; endY = Math.random() * height; break
      }
      
      const segments = 6 + Math.floor(Math.random() * 4)
      let path = `M ${startX} ${startY}`
      
      const deltaX = (endX - startX) / segments
      const deltaY = (endY - startY) / segments
      
      for (let i = 1; i <= segments; i++) {
        const x = startX + deltaX * i
        const y = startY + deltaY * i
        
        const amplitude = 60 + Math.random() * 80
        const offsetX = (Math.random() - 0.5) * amplitude
        const offsetY = (Math.random() - 0.5) * amplitude
        
        const cp1X = startX + deltaX * (i - 0.5) + offsetX
        const cp1Y = startY + deltaY * (i - 0.5) + offsetY
        const cp2X = x - deltaX * 0.2 + (Math.random() - 0.5) * amplitude * 0.5
        const cp2Y = y - deltaY * 0.2 + (Math.random() - 0.5) * amplitude * 0.5
        
        path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y}`
      }
      
      return path
    }

    const createLinePack = () => {
      if (activeLines.current >= 4) return
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.classList.add('wavy-line-svg')
      svg.style.position = 'absolute'
      svg.style.top = '0'
      svg.style.left = '0'
      svg.style.width = '100%'
      svg.style.height = '100%'
      svg.style.pointerEvents = 'none'
      svg.style.overflow = 'visible'

      const basePath = createRandomPath()
      const lineSpacing = 18 + Math.random() * 12
      const opacities = [0.95, 0.75, 0.55, 0.35]
      const paths = []
      
      opacities.forEach((opacity, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        
        const offsetPath = basePath.replace(/(\d+\.?\d*)\s+(\d+\.?\d*)/g, (match, x, y) => {
          const angle = Math.random() * Math.PI * 2
          const offsetX = Math.cos(angle) * lineSpacing * index
          const offsetY = Math.sin(angle) * lineSpacing * index
          return `${parseFloat(x) + offsetX} ${parseFloat(y) + offsetY}`
        })
        
        path.setAttribute('d', offsetPath)
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', `rgba(255, 255, 255, ${opacity})`)
        path.setAttribute('stroke-width', '2.5')
        path.setAttribute('stroke-linecap', 'round')
        path.setAttribute('stroke-linejoin', 'round')
        path.style.filter = `drop-shadow(0 0 10px rgba(255, 255, 255, ${opacity * 0.7})) drop-shadow(0 0 20px rgba(255, 255, 255, ${opacity * 0.4}))`
        
        const length = path.getTotalLength()
        path.style.strokeDasharray = length
        path.style.strokeDashoffset = length
        
        svg.appendChild(path)
        paths.push({ path, length, delay: index * 0.1 })
      })

      container.appendChild(svg)
      activeLines.current += 1

      const tl = gsap.timeline({
        onComplete: () => {
          activeLines.current -= 1
          svg.remove()
        }
      })
      
      paths.forEach(({ path, length, delay }) => {
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 4 + Math.random() * 2,
          ease: 'power1.inOut',
          delay: delay
        }, 0)
      })

      tl.to(paths.map(p => p.path), {
        opacity: 0,
        duration: 2,
        ease: 'power2.in',
        stagger: 0.1
      }, '-=1.5')
    }

    const interval = setInterval(() => {
      createLinePack()
    }, 2500)

    createLinePack()
    setTimeout(() => createLinePack(), 800)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="animated-background" />
}

export default AnimatedBackground

