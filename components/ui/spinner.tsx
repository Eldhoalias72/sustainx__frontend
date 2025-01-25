import { motion } from "framer-motion";

export const Spinner = () => (
  <motion.div
    className="w-5 h-5 border-4 border-t-transparent border-white-500 rounded-full animate-spin"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  />
);