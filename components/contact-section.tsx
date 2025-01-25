"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get in Touch</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            Have questions? Reach out to us for more information about SustainX
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Mail className="w-6 h-6 text-green-300" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <p className="text-green-300">info@sustainx.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Phone className="w-6 h-6 text-green-300" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <p className="text-green-300">+91 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <MapPin className="w-6 h-6 text-green-300" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-white">Location</h3>
                <p className="text-green-300">CUSAT, Kochi, Kerala, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-green-900/30 backdrop-blur-sm rounded-xl p-8 border border-green-500/10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white">Name</label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      className="bg-green-900/30 border-green-500/30 text-white placeholder:text-green-300/50"
                      placeholder="Your name"
                    />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <label className="text-white">Email</label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      className="bg-green-900/30 border-green-500/30 text-white placeholder:text-green-300/50"
                      placeholder="Your email"
                      type="email"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white">Message</label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Textarea
                    className="bg-green-900/30 border-green-500/30 text-white placeholder:text-green-300/50"
                    placeholder="Your message"
                    rows={4}
                  />
                </motion.div>
              </div>
              <Button className="w-full bg-green-500/20 backdrop-blur-sm border border-green-500/50 hover:bg-green-500/30 text-green-300 hover:text-white transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

