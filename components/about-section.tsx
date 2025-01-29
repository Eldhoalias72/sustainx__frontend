"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Users, Calendar, Globe } from "lucide-react";

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
        {/* About SustainX Heading and Description */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About SustainX</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            SustainX: Building Tomorrow is the flagship annual conference organized by the IGBC Student Chapter of CUSAT, a vibrant part of the Confederation of Indian Industry (CII). Through interactive sessions, workshops, and engaging activities, SustainX aims to empower participants to integrate eco-friendly practices into their personal and professional lives, contributing to a sustainable future for all.
            <br></br><br></br><br></br><br></br><br></br>
          </p>
        </div>

        {/* Grid Layout for Map and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Google Map Section */}
          <motion.div style={{ y }} className="relative h-[400px] rounded-xl overflow-hidden">
            {/* Transparent Overlay for Click Handling */}
            <a
              href="https://www.google.com/maps/place/Seminar+Complex,+CUSAT/@10.0438128,76.3233438,17.75z/data=!4m7!3m6!1s0x3b080d223eeb1de1:0xce06a9f0d256857a!8m2!3d10.0439073!4d76.3249082!15sChVzZW1pbmFyIGNvbXBsZXggY3VzYXSSARV1bml2ZXJzaXR5X2RlcGFydG1lbnTgAQA!16s%2Fg%2F11cltd2jr7?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Security best practice for external links
              className="absolute inset-0 z-10 cursor-pointer"
            >
              {/* Clickable Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                <p className="text-white text-lg font-semibold">Click to open in Google Maps</p>
              </div>
            </a>

            {/* Google Map Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.741178315091!2d76.3233438!3d10.0438128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d223eeb1de1%3A0xce06a9f0d256857a!2sSeminar%20Complex%2C%20CUSAT!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: "none" }} // Disable pointer events
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="object-cover"
            ></iframe>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent" />
          </motion.div>

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