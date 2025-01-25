"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function EventSection() {
  return (
    <section id="event" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Event Details</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            Join us for an inspiring day of sustainable innovation and networking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
          >
            <Calendar className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Date</h3>
            <p className="text-green-300">September 15, 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
          >
            <Clock className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Time</h3>
            <p className="text-green-300">9:00 AM - 5:00 PM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
          >
            <MapPin className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Venue</h3>
            <p className="text-green-300">CUSAT Campus, Kochi</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

