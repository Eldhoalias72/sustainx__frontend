"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ParticleBackground from "../components/particle-background"
import Navigation from "../components/navigation"
import AboutSection from "../components/about-section"
import EventSection from "../components/event-section"
import SpeakersSection from "../components/speakers-section"
import ContactSection from "../components/contact-section"
import Image from "next/image"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      containerRef.current.style.setProperty("--mouse-x", `${x}px`)
      containerRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden"
    >
      <ParticleBackground />

      <motion.div
        className="absolute inset-0 bg-[url('/forest-bg.jpg')] bg-cover bg-center"
        style={{ y: backgroundY }}
      />

      <div className="relative z-10">
        <Navigation />

        <main className="container mx-auto px-4">
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="relative"
              style={{ marginTop: '-180px' }}
            >
              <Image src="/images/sustainx_image_new.png" alt="SustainX Logo" width={500} height={500} className="mx-auto mb-8" />
              <div className="mt-1 space-y-4" style={{ marginTop: '-140px' }}>
                <p className="text-green-300 text-xl md:text-2xl">
                  BUILDING TOMORROW
                </p>
              </div>
            </motion.div>
          </section>

          <AboutSection />
          <EventSection />
          <SpeakersSection />
          <ContactSection />
        </main>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74, 222, 128, 0.1) 0%, transparent 50%)",
          }}
        ></div>
      </div>
    </div>
  )
}

