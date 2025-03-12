"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface Speaker {
  name: string
  reputation: string
  image: string
  details: string
}

const speakers: Speaker[] = [
  {
    name: "Shiad Majeed",
    reputation: "Co-Earth Foundation",
    image: "/images/shiad.jpg",
    details:
      "Co-Earth Foundation promotes sustainable construction techniques using natural and locally available materials. Their workshops focus on eco-friendly building methods, integrating traditional wisdom with modern sustainability practices. Shiad Majeed, an expert in earthen construction, leads participants through hands-on experiences to explore environmentally responsible building alternatives.",
  },
  {
    name: "Sandeep Sharma",
    reputation: "Green Pencil Foundation",
    image: "/images/sandeep.jpg",
    details: "Green Pencil Foundation is a youth-led nonprofit organization dedicated to environmental conservation, sustainability, and social awareness. Through innovative campaigns, workshops, and community-driven initiatives, the foundation empowers young minds to take action against climate change, pollution, and deforestation. It promotes eco-friendly practices, sustainable living, and environmental education across schools and communities.",
  },
  {
    name: "Ar. Vinay Manchala",
    reputation: "Founder and Director at VISVA Sustainable Foundation",
    image: "/images/vinay.jpg",
    details:"Carbon Footprint and The Lifestyle Analysis – A Sustain X Forward for the Conscious Future is a transformative 3-hour workshop designed to deepen awareness of personal and collective environmental impact. Led by Ar. Vinay Manchala, this interactive session explores carbon footprints, lifestyle optimization, and sustainable alternatives. Participants will engage in mindful activities like earthing, deep breathing, and hands-on sustainability practices to foster a conscious, eco-friendly future." 
 },
]

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 4000) // Auto-flip every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
  
    <motion.div
      className="w-80 h-96 cursor-pointer perspective mx-4 flex-shrink-0"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src={speaker.image || "/placeholder.svg"}
            alt={speaker.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent p-4 rounded-b-lg">
            <h3 className="text-xl font-semibold text-white">{speaker.name}</h3>
            <p className="text-green-300 text-sm">{speaker.reputation}</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotateY-180 bg-green-800 rounded-lg p-4 flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-white mb-2">{speaker.name}</h3>
          <p className="text-green-300 text-center text-sm">{speaker.details}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SpeakersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="speakers" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"><br/>Workshop</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto custom-scrollbar snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#22c55e transparent" }}
          >
            {speakers.map((speaker, index) => (
              <div key={index} className="snap-center">
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500/50 hover:bg-green-500/75 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500/50 hover:bg-green-500/75 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}