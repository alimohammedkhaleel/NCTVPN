import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollCountdownGallery.css';

gsap.registerPlugin(ScrollTrigger);

const imagesData = [
  { src: '/src/assets/Autotronics.jpg', label: 'Autotronics Network' },
  { src: '/src/assets/Mechatronic.jpg', label: 'Mechatronics Grid' },
  { src: '/src/assets/Petroleum engineering.jpg', label: 'Petroleum HPC' },
  { src: '/src/assets/Renewable energy.jpg', label: 'Renewable Datacenter' },
  { src: '/src/assets/content.jpeg', label: 'Central Core Node' }
];

const ScrollCountdownGallery = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const textRef = useRef(null);
  const [countdown, setCountdown] = useState(100);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Progress goes from 0 to 1.
          // Countdown goes from 100 down to 0, then reverses.
          // Let's make it go 100 -> 0 -> 100
          const p = self.progress;
          let newCount;
          if (p <= 0.5) {
            newCount = Math.round(100 * (1 - (p * 2)));
          } else {
            newCount = Math.round(100 * ((p - 0.5) * 2));
          }
          setCountdown(newCount);
        }
      });

      // Animate images sliding in and out based on scroll
      imagesRef.current.forEach((img, i) => {
        gsap.fromTo(img, 
          { opacity: 0, scale: 0.8, y: 100 },
          {
            opacity: 1, scale: 1, y: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top+=${i * 50}% top`,
              end: () => `top+=${(i + 1) * 50}% top`,
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-countdown-container" ref={containerRef}>
      <div className="countdown-display">
        {countdown}
      </div>
      <div className="gallery-content">
        <div className="images-stack">
          {imagesData.map((img, index) => (
            <div 
              key={index} 
              className="gallery-image-wrapper" 
              ref={el => imagesRef.current[index] = el}
              style={{ zIndex: imagesData.length - index }}
            >
              <img src={img.src} alt={img.label} className="gallery-img" />
              <div className="image-number">0{index + 1}</div>
              <div className="image-label">{img.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollCountdownGallery;
