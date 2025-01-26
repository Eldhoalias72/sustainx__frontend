"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import Navigation from "../components/navigation"
import AboutSection from "../components/about-section"
import EventSection from "../components/event-section"
import SpeakersSection from "../components/speakers-section"
import ContactSection from "../components/contact-section"
import Image from "next/image"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const walleRef = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  // Particle animation logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#22c55e" // Green color for particles
      ctx.globalAlpha = 0.5

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    createParticles()
    drawParticles()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Walle animation logic
  useEffect(() => {
    if (walleRef.current) {
      gsap.to(walleRef.current, {
        x: "random(-30, 30)",
        y: "random(-30, 30)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }
  }, [])

  // Handle mouse hover to create ripples
  const handleInteraction = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    const x = "clientX" in e ? e.clientX : e.touches[0].clientX
    const y = "clientY" in e ? e.clientY : e.touches[0].clientY
    const id = Date.now()

    setRipples((prevRipples) => [...prevRipples, { x, y, id }])

    // Remove the ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id))
    }, 600)
  }

  // Animated Circles Background Component
  const AnimatedCircles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => {
          const duration = Math.random() * 6 + 4
          const delay = Math.random() * 4

          return (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-green-500/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden"
    >
      {/* Particle Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ opacity: 0.2 }} />

      {/* Small Squares Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Animated Circles */}
      <AnimatedCircles />

      {/* Ripple Effect */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute w-16 h-16 bg-green-500 rounded-full pointer-events-none"
          style={{ top: ripple.y, left: ripple.x, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0.2, scale: 0.1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center section">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="relative"
              style={{ marginTop: "-180px" }}
            >
              <div ref={walleRef} className="absolute w-96 h-96" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Image src="/images/walle.png" alt="Walle" layout="fill" objectFit="contain" />
              </div>
            </motion.div>
          </section>

          <AboutSection/>
          <EventSection  />
          <SpeakersSection />
          
        </main>
        <ContactSection/>
      </div>
    </div>
  )
}
