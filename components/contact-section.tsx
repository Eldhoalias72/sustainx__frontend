"use client";

import React from "react";
import { Phone, Mail, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-green-900 to-green-950 text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-green-500" />
              <span>Riya Ummer (Convenor): 8075528667</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-green-500" />
                <span>Adithya Das (Joint Convenor): 8137868579</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-green-500" />
                <span>Riya Lekshmi K J (Organizer): 9495156564</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-green-500" />
                <span>Midhun PM (Organizer): 8078216794</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-green-500" />
                <span>Eldho Alias (Organizer): 9496369131</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">Email</h3>
            <a
              href="mailto:igbc@cusat.ac.in"
              className="flex items-center space-x-2 hover:text-green-400 transition-colors"
            >
              <Mail size={16} className="text-green-500" />
              <span>igbc@cusat.ac.in</span>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/igbc_cusat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <Instagram size={24} className="text-green-500" />
              </a>
              <a
                href="https://www.linkedin.com/company/igbc-cusat-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <Linkedin size={24} className="text-green-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='rgba(74, 222, 128, 0.2)' stroke-width='2'/%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='rgba(74, 222, 128, 0.2)' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
    </footer>
  );
};

export default ContactSection;