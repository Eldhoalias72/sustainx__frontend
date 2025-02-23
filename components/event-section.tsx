"use client"

import { motion, useAnimation } from "framer-motion"
import { Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Event {
  title?: string
  description?: string
  speaker?: string
  location?: string
  isParallel?: boolean
  title1?: string
  description1?: string
  speaker1?: string
  location1?: string
  title2?: string
  description2?: string
  speaker2?: string
  location2?: string
}

interface EventBlockProps {
  time: string
  events: Event[]
}

const EventBlock = ({ time, events }: EventBlockProps) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    })
  }, [controls])

  return (
    
    <motion.div
      className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 min-w-[300px] h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(74, 222, 128, 0.3)" }}
      transition={{ duration: 0.5 }}
      animate={controls}
    >
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-green-400" />
        {time}
      </h3>
      <div className="space-y-4 flex-grow">
        {events.map((event, index) => (
          <div
            key={index}
            className={`border-t border-green-500/20 pt-4 first:border-t-0 first:pt-0 ${event.isParallel ? "flex gap-4" : ""}`}
          >
            {event.isParallel ? (
              <>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">{event.title1}</h4>
                  <p className="text-green-300 text-sm">{event.description1}</p>
                  <p className="text-green-400 text-sm mt-2">Speaker: {event.speaker1}</p>
                  <p className="text-green-400 text-sm mt-1">Location: {event.location1}</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">{event.title2}</h4>
                  <p className="text-green-300 text-sm">{event.description2}</p>
                  <p className="text-green-400 text-sm mt-2">Speaker: {event.speaker2}</p>
                  <p className="text-green-400 text-sm mt-1">Location: {event.location2}</p>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                {event.description && event.description.split("\n").map((line, index) => (
                  <p key={index} className="text-green-300 text-sm">{line}</p>
                ))}
                {event.speaker && <p className="text-green-400 text-sm mt-2">Speaker: {event.speaker}</p>}
                {event.location && <p className="text-green-400 text-sm mt-1">Location: {event.location}</p>}
              </>

            
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function EventSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const schedule = [
    {
      time: "9:00 - 10:00",
      events: [
        {
          title: "Inauguration",
          description: "Opening ceremony and keynote speech",
         //speaker: "will update soon",
         // location: "Auditorium",
        },
      ],
    },
    {
      time: "10:30 - 11:30",
      events: [
        { title: "Talk session", speaker: "Licypriya Kanjugam", /*location: "Room A" */},
      ],
    },
    {
      time: "11:30 - 12:00",
      events: [
        { title: "Coffee Break", description: "Refresh and network", /*location: "Main Hall"*/ },
      ],
    },
    {
      time: "12:00 - 1:30",
      events: [
        { title: "Panel discussion", description: "Topic :Innovation in coastal area construction materials", /*location: "Auditorium"*/ },
      ],
    },
    {
      time: "1:30 - 3:00",
      events: [
        { title: "Lunch Break",/* description: "Organic and locally-sourced meal", location: "Dining Hall"*/ },
      ],
    },
    {
      time: "3:15 - 4:15",
      events: [
        { title: "Talk session", speaker: "V suresh", /*location: "Dining Hall"*/ },
      ],
    },
    {
      time: "4:15 - 5:15",
      events: [
        { title: "Talk session", speaker: "Shuva raha",/* location: "Dining Hall"*/ },
      ],
    },
    {
      time: "3:00 - 5:00",
      events: [
        { title: "Workshop", description: "1. Green Pencil Foundation \n2. Rakesh Khatri - Nest Man of India  \n3. Workshop 3 ", /* location: "Dining Hall"*/ },
      ],
    },
    /*{
      time: "3:00 - 5:00",
      events: [
        {
          isParallel: true,
          title1: "Talk session",
          speaker1: "will update1 soon",
         location1: "will update soon",
          title2: "Workshop",
         // description2: "will update soon",
         speaker2: "will update soon",
         location2: "will update soon",
         title3: "Workshop",
        },
      ],
    },*/
    {
      time: "5:15 - 6:00",
      events: [
        { title: "Parallel session", description: "Speaker 1: prerna prasad \n Speaker 2: Renjini Thampi", /*location: "Auditorium" */},
      ],
    },
  ]

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="event" className="py-20 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "url('/leaf-pattern.svg')",
          backgroundSize: "50px 50px",
          opacity: 0.05,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ><br/>
            Event Schedule
          </motion.h2>
          <motion.p
            className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our exciting lineup of talks, workshops, and networking opportunities
          </motion.p>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-8 cursor-grab active:cursor-grabbing custom-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex space-x-6 px-4">
            {schedule.map((slot, index) => (
              <EventBlock key={index} time={slot.time} events={slot.events} />
            ))}
          </div>
        </div>

        
  <motion.div
  className="text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <p className="text-green-300 text-lg mb-6">
  Secure your spot today.<br></br> Register now for ₹499, or enjoy a ₹50 discount by entering a referral code, making your registration only ₹449.
  </p>
  <div className="flex justify-center">
    <motion.a
      href="/book-ticket"
      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Book Ticket
    </motion.a>
  
  </div>
  <div className="h-8"></div>


  <div className="overflow-hidden mt-8 relative">
    <div className="flex">
      <motion.div
        className="flex space-x-4"
        animate={{ x: [0, "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
        }}
      >
        {/* First set of items */}
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>

        {/* Duplicate set to create seamless loop */}
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>
        <div className="bg-green-500 text-black font-bold text-lg px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
          Earn 50 KTU Points 🎉
        </div>

      </motion.div>
    </div>
  </div>



      </motion.div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #22c55e;
          border-radius: 9999px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </section>
  )
}