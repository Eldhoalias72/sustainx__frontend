"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Leaf, Users, Calendar, Globe } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Innovation",
      description: "Leading the way in green building practices and environmental consciousness",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Network",
      description: "Connect with industry leaders and sustainability experts",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Annual Event",
      description: "IGBC CUSAT's flagship event bringing together visionaries",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Impact",
      description: "Contributing to worldwide sustainable development goals",
    },
  ]

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About SustainX</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            SustainX is IGBC CUSAT&apos; premier event dedicated to advancing sustainable development and green building
            practices through innovation and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div style={{ y }} className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg" alt="SustainX Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-colors"
              >
                <div className="text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-green-300/80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

