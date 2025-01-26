"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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

  // Animated Circles Background Component
  const AnimatedCircles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => {
          // Randomize animation duration and delay for each circle
          const duration = Math.random() * 6 + 4; // Duration between 4 and 10 seconds
          const delay = Math.random() * 4; // Delay between 0 and 4 seconds

          return (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-green-500/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0.8 }} // Start with slight scale and no opacity
              animate={{
                scale: [0.8, 1.2, 0.8], // Gentle scaling animation
                opacity: [0, 0.5, 0], // Fade in and out
              }}
              transition={{
                duration: duration, // Random duration for each circle
                delay: delay, // Random delay for each circle
                repeat: Infinity, // Loop the animation
                ease: "easeInOut", // Smooth easing
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden">
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
          backgroundSize: "50px 50px", // Size of each square
        }}
      ></div>

      {/* Animated Circles */}
      <AnimatedCircles />

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center section">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="relative"
              style={{ marginTop: '-180px' }}
            >
              <Image
                src="/images/sustainx_image_new.png"
                alt="SustainX Logo"
                width={500}
                height={500}
                className="mx-auto mb-8 w-64 md:w-96 lg:w-[500px]"
              />
              <div className="mt-1 space-y-4" style={{ marginTop: '-140px' }}>
                <p className="text-green-300 text-xl md:text-2xl">
                  BUILDING TOMORROW
                </p>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <AboutSection className="section" />

          {/* Event Section */}
          <EventSection className="section" />

          {/* Speakers Section */}
          <SpeakersSection className="section" />

          {/* Contact Section */}
          <ContactSection className="section" />
        </main>
      </div>
    </div>
  )
}