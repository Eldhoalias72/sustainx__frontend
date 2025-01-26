import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Event", "Speakers", "Contact"];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-colors duration:300 ${
        scrolled ? "bg-green-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="https://www.igbccusat.com/">
            <motion.div
              className="text-green-400 text-xl font-bold flex items-center"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* IGBC Logo */}
              <Image
                src="/images/igbc_soe_image.png" // Ensure the path is correct
                alt="IGBC Logo"
                width={100} // Increased size for better visibility
                height={100}
                className="mr-2 rounded-full" // Added rounded styling for aesthetics
              />
            </motion.div>
          </Link>

          {/* SustainX Logo in the Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/images/sustainx_image_new.png"
              alt="SustainX Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center ml-auto">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-green-300 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
            <Link href="/book-ticket">
              <Button className="bg-green-500 text-green-900 hover:bg-green-400">Book Ticket</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden text-green-300 ml-auto"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-900/90 backdrop-blur-lg">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-green-300 hover:text-white transition-colors px-4 py-2"
                      whileHover={{ x: 4 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                  <Link href="/book-ticket">
                    <Button className="w-full bg-green-500 text-green-900 hover:bg-green-400">
                      Book Ticket
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}