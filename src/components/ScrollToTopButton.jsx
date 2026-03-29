import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: '#003D99',
            boxShadow: '0 20px 25px -5px rgba(0, 102, 255, 0.5), 0 8px 10px -6px rgba(0, 102, 255, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed z-[998] bottom-[100px] right-[20px] flex items-center justify-center rounded-full bg-[#0066FF] text-white w-[45px] h-[45px] md:w-[50px] md:h-[50px] shadow-[0_10px_15px_-3px_rgba(0,102,255,0.4),0_4px_6px_-4px_rgba(0,102,255,0.4)] cursor-pointer outline-none border-none"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} color="#FFFFFF" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}