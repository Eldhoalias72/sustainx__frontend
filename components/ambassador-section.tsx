"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Users, Award } from "lucide-react"

export default function AmbassadorSection() {
  const benefits = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Leadership Opportunities",
      description: "Lead sustainability initiatives on your campus",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Exclusive Access",
      description: "Get priority access to events and workshops",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Network Building",
      description: "Connect with industry professionals and peers",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Recognition",
      description: "Earn certificates and awards for your contribution",
    },
  ]

  return (
    <section id="campus-ambassadors" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Campus Ambassadors</h2>
          <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto">
            Join our elite team of campus ambassadors and lead the sustainability movement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="text-green-400 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-green-300/80 mb-4">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-8 text-center space-y-6 backdrop-blur-sm border border-green-500/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white">Become a Campus Ambassador</h3>
          <p className="text-green-300">
            Take the lead in promoting sustainability on your campus and gain valuable experience while making a real
            impact on the environment.
          </p>
          <Button
            size="lg"
            className="bg-green-500/20 backdrop-blur-sm border border-green-500/50 hover:bg-green-500/30 text-green-300 hover:text-white transition-all duration-300"
          >
            Apply Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

