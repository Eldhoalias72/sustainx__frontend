"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, Twitter, LinkedinIcon as LinkedIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SpeakersSection() {
  const speakers = [
    {
      name: "Dr. Arun Kumar",
      role: "Sustainable Architecture Expert",
      image: "/placeholder.svg",
      email: "arun@example.com",
      phone: "+91 98765 43210",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Priya Sharma",
      role: "Green Energy Innovator",
      image: "/placeholder.svg",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      twitter: "#",
      linkedin: "#",
    },
    {
      name: "Rajesh Menon",
      role: "Urban Planning Specialist",
      image: "/placeholder.svg",
      email: "rajesh@example.com",
      phone: "+91 76543 21098",
      twitter: "#",
      linkedin: "#",
    },
  ]

  return (
    <section id="speakers" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Speakers</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            Meet the industry experts and thought leaders who will shape the future of sustainable development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                <motion.div
                  className="relative h-64 overflow-hidden"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">{speaker.name}</h3>
                  <p className="text-green-400 mb-4">{speaker.role}</p>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${speaker.email}`}
                      className="flex items-center text-green-300 hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      {speaker.email}
                    </a>
                    <a
                      href={`tel:${speaker.phone}`}
                      className="flex items-center text-green-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {speaker.phone}
                    </a>
                    <div className="flex space-x-4 pt-2">
                      <Button variant="ghost" size="icon" className="text-green-300 hover:text-white">
                        <Twitter className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-green-300 hover:text-white">
                        <LinkedIn className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

