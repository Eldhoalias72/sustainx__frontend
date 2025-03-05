"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { IoClose } from "react-icons/io5"
import Link from "next/link"

export default function Popup() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 right-6 bg-green-900 text-white p-5 rounded-2xl shadow-lg max-w-xs z-50 border-2 border-green-400"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Book Your Ticket Now</h2>
        <button onClick={() => setIsVisible(false)} className="text-white hover:text-gray-200">
          <IoClose size={20} />
        </button>
      </div>
      <p className="mt-2 text-sm">
        Secure your spot at our upcoming event before tickets run out!
      </p>
      <Link href="/book-ticket">
        <button className="mt-3 bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
          Get Tickets
        </button>
      </Link>
    </motion.div>
  )
}
