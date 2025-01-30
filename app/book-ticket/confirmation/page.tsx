"use client"

import { motion } from "framer-motion"
import Navigation from "../../../components/navigation"
import ParticleBackground from "../../../components/particle-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TicketConfirmation() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navigation />

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto bg-green-900/30 backdrop-blur-sm rounded-xl p-8 border border-green-500/10 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Ticket Booking Confirmation</h1>
            <p className="text-green-300 text-xl mb-8">
              Your response has been submitted. You will receive the ticket within 1-2 days in your email.
            </p>
            <Link href="/">
              <Button className="bg-green-500 text-green-900 hover:bg-green-400 transition-colors">
                Return to Home
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74, 222, 128, 0.1) 0%, transparent 50%)",
          }}
        ></div>
      </div>
    </div>
  )
}
