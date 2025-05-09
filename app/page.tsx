"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import Navigation from "../components/navigation"
import AboutSection from "../components/about-section"
import EventSection from "../components/event-section"
import SpeakersSection from "../components/speakers-section"
import ContactSection from "../components/contact-section"
import CountdownSection from "../components/countdown-section"
import WorkshopSection from "../components/workshop-section"
import Image from "next/image"
import { FaArrowDown } from "react-icons/fa" // Import the arrow icon
import Popup from "../components/Popup"


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
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const [isArrowVisible, setIsArrowVisible] = useState(true) // State to control arrow visibility
  const [hasScrolledPastAbout, setHasScrolledPastAbout] = useState(false) // New state variable

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

  // Scroll to About Section
  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Intersection Observer to detect when About section is in view
  useEffect(() => {
    const aboutSection = aboutSectionRef.current;
  
    if (!aboutSection) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setTimeout(() => {
            if (entry.isIntersecting) {
              setIsArrowVisible(false); // Hide arrow when About section is in view
              setHasScrolledPastAbout(true);
            } else if (!hasScrolledPastAbout) {
              setIsArrowVisible(true); // Show arrow only if the About section has not been scrolled past
            }
          }, 100); // Small delay to account for mobile behavior
        });
      },
      { threshold: 0.3 } // Slightly lower threshold for better detection
    );
  
    observer.observe(aboutSection);
  
    const handleScroll = () => {
      if (aboutSection.getBoundingClientRect().top < window.innerHeight * 0.5) {
        setIsArrowVisible(false);
        setHasScrolledPastAbout(true);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      observer.unobserve(aboutSection);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolledPastAbout]);
  // Add `hasScrolledPastAbout` as a dependency
   // Add hasScrolledPastAbout as a dependency

  // Animated Circles Background Component
  const AnimatedCircles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const duration = Math.random() * 6 + 4
          const delay = Math.random() * 3

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

      {/* Scroll Down Arrow */}
      {isArrowVisible && !hasScrolledPastAbout && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToAboutSection}
        >
          <FaArrowDown className="text-green-500 text-4xl animate-bounce" />
        </motion.div>
      )}

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
              {/* Wall-E Image Container */}
              <div
                ref={walleRef}
                className="absolute w-[500px] h-[500px]" // Increased size
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              >
                <Image
                  src="/images/walle.png"
                  alt="Walle"
                  layout="fill"
                  objectFit="contain"
                  className="object-contain" // Ensure the image scales properly
                />
              </div>
            </motion.div>
          </section>

          <CountdownSection />
          {/* About Section */}
          <div ref={aboutSectionRef}>
            <AboutSection />
          </div>
          <br/>
          <EventSection />
          <SpeakersSection />
          <WorkshopSection />

          {/* Campus Ambassador Section */}

          <section id="campus-ambassador" className="py-20 text-center">
  <div className="space-y-4"> {/* Added a wrapping div for spacing */}
    <motion.h2
      className="text-4xl font-bold text-green-500 mb-8"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }} // Added transition properties
    >
      Campus Ambassador
    </motion.h2>
    <motion.p
      className="text-lg text-green-200 mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }} // Added transition properties
    >
      Be the Change You Want to See—Join SustainX as a Campus Ambassador!
      <br />
      Spread the word, inspire change, and gain exclusive access to events and opportunities.
      <br />
      Make your campus a hub for innovation—apply now!
    </motion.p>

    <motion.a
      href="https://casustainx.igbccusat.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}  // Added transition properties with a longer delay
    >
      Apply Now
    </motion.a>
  </div>
</section>
        </main>
        <ContactSection />
      </div>
      <Popup />

    </div>
  )
}