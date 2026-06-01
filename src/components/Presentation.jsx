import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import './Presentation.css';

const Presentation = ({ onFinish }) => {
  const pathRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the length of the SVG path
    const length = path.getTotalLength();
    
    // Set initial dash array and offset to hide the path
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline();

    // 1. Paint the background
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => setShowText(true)
    })
    // 2. Wait while text is visible
    .to({}, {
      duration: 1.2,
      onComplete: () => setShowText(false)
    })
    // 3. Unpaint the background after text fades out
    .to(path, {
      strokeDashoffset: length,
      duration: 1.5,
      delay: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onFinish) onFinish();
      }
    });
  }, [onFinish]);

  return (
    <div className="presentation-container">
      {/* 
        The SVG mask: 
        We use an inline SVG that stretches over the viewport.
        The path is drawn thick enough so that it paints the whole screen.
        The yellow layer is masked by this path, meaning where the path is drawn, the yellow layer becomes visible.
      */}
      {/* The SVG element covering the screen */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 1500" 
        preserveAspectRatio="xMidYMid slice" 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <defs>
          <mask id="brushMask">
            <path
              ref={pathRef}
              d="M -200 -100 L 1200 100 L -200 300 L 1200 500 L -200 700 L 1200 900 L -200 1100 L 1200 1300 L -200 1500 L 1200 1700"
              fill="none"
              stroke="white"
              strokeWidth="450"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <rect x="-20%" y="-20%" width="140%" height="190%" fill="#facc15" mask="url(#brushMask)" />
      </svg>

      <AnimatePresence>
        {showText && (
          <motion.div
            className="text-container"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <h1>VPN for Technological Universities</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Presentation;
