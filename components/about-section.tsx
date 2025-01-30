"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Users, Calendar, Globe } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Workshop",
      description: "Build, code, and innovate for a greener future.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Talk Session",
      description: "Deep dive into tech-driven sustainability.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Date",
      description: "15 march 2025",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Exhibition",
      description: "Explore cutting-edge green tech in action.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="about" className="py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="h-8"></div>

        {/* About SustainX Heading and Description */}
        <div className="text-center space-y-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About SustainX
          </motion.h2>
          <motion.p
            className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
SustainX: Building Tomorrow is the annual flagship event of IGBC CUSAT, part of CII. A hub for innovation and sustainability, it brings together cutting-edge tech, impactful ideas, and hands-on experiences to shape a greener future.
            <br/><br/><br/>
          </motion.p>
        </div>

        {/* Grid Layout for Map and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Google Map Section with Heading */}
          <div className="relative">
            {/* Event Venue Heading */}
            <motion.h3
              className="text-3xl md:text-4xl font-semibold text-white absolute top-[-50px] left-1/3 transform -translate-x-1/4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Event Venue
            </motion.h3>

            {/* Google Map Container */}
            <motion.div style={{ y }} className="relative h-[400px] rounded-xl overflow-hidden">
              {/* Transparent Overlay for Click Handling */}
              <a
                href="https://www.google.com/maps/place/Seminar+Complex,+CUSAT/@10.0438128,76.3233438,17.75z"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                  <p className="text-white text-lg font-semibold">Click to open in Google Maps</p>
                </div>
              </a>

              {/* Google Map Iframe */}
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.741178315091!2d76.3233438!3d10.0438128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d223eeb1de1%3A0xce06a9f0d256857a!2sSeminar%20Complex%2C%20CUSAT!5e0!3m2!1sen!2sin!4v1706556789012!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{ border: 0, pointerEvents: "none" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="object-cover"
></iframe>


              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Features Section */}
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
  );
}
