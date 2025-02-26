"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const targetDate = new Date("March 15, 2025 00:00:00").getTime()
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance < 0) {
        // If the target date has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        clearInterval(interval)
      } else {
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [targetDate])
  
  // Simple fade-in animation variants for the section
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }
  
  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <div className="bg-green-900/60 backdrop-blur-sm w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center mb-2 border border-green-500/30">
        <span className="text-3xl sm:text-4xl font-bold text-green-400">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs sm:text-sm text-green-300 font-medium">{label}</span>
    </div>
  )
  
  return (
    <section className="w-full mb-8">
      {/* Full-width container that extends beyond the main content container */}
      <motion.div 
        className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-green-800/30 backdrop-blur-sm border-t border-b border-green-500/30 py-6"
        style={{ marginLeft: "-50vw", width: "100vw" }}
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-green-400 mb-4">
            Countdown to SustainX 2025
          </h3>
          
          <div className="flex justify-center items-center space-x-1 sm:space-x-4">
            <CountdownUnit value={timeLeft.days} label="DAYS" />
            <div className="text-green-400 text-xl font-bold mt-(-2)">:</div>
            <CountdownUnit value={timeLeft.hours} label="HOURS" />
            <div className="text-green-400 text-xl font-bold mt-(-2)">:</div>
            <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
            <div className="text-green-400 text-xl font-bold mt-(-2)">:</div>
            <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
          </div>
          
          <p className="text-center text-green-300 mt-4 text-sm">
            Join us for the future of sustainability on <strong>March 15, 2025</strong>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default CountdownSection