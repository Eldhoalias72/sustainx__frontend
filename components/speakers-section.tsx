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
    name: "Licypriya Kangujam",
    reputation: "Climate Activist",
    image: "/images/licy_igbc.jpg",
    details:
      "Licypriya is a Thirteen-Years-Old Indian Climate Activists. She has been championing her cause since six years old to protect, preserve and nurture our environment by fighting the climate change. She is one of the youngest climate activists globally and addressed the world leaders in the United Nations Climate Conference 2019 (COP25) in Madrid, Spain calling the world leaders to take immediate climate actions to save our planet and their future. She attended the 77th Session of the United Nations General Assembly 2022.",
  },
  {
    name: "",
    reputation: "",
    image: "/images/coming.png",
    details: "Will be updated soon",
  },
  {
    name: "",
    reputation: "",
    image: "/images/coming.png",
    details: "Will be updated soon",
  },
  {
    name: "",
    reputation: "",
    image: "/images/coming.png",
    details: "Will be updated soon",
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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Our Speakers</h2>
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