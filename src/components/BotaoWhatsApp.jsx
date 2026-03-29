import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BotaoWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white p-2 rounded-lg shadow-xl border border-gray-100 mb-2"
          >
            <img 
              src="https://horizons-cdn.hostinger.com/deacac47-9976-4867-ac0e-f85fb29051f1/47435716bf7438ecc58a33b9f265e9d8.png" 
              alt="Gil Web Designer Logo" 
              className="w-24 h-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/5511971157373?text=Ol%C3%A1,%20vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.div>
      </motion.a>
    </div>
  );
}