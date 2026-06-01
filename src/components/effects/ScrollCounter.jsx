import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollCounter = () => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { title: "Connect", desc: "Reach out to our support team" },
    { title: "Configure", desc: "We'll set up your secure tunnel" },
    { title: "Deploy", desc: "Roll out the VPN to your campus" },
    { title: "Monitor", desc: "24/7 proactive network monitoring" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(
            Math.max(Math.floor(progress * steps.length) + 1, 1),
            steps.length
          );
          if (step !== currentStep) {
            setCurrentStep(step);
            
            // Animate the number change
            gsap.fromTo(numberRef.current, 
              { y: -50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "back.out" }
            );
          }
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [currentStep, steps.length]);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Dynamic Background */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: currentStep % 2 === 0 ? '#1a1a1a' : '#111',
          transition: 'background-color 1s ease',
          zIndex: -1
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          {/* Huge Number */}
          <div 
            ref={numberRef}
            style={{ 
              fontSize: '20vw', 
              fontWeight: '900', 
              color: 'transparent',
              WebkitTextStroke: '4px rgba(250, 204, 21, 0.2)',
              lineHeight: 1
            }}
          >
            {currentStep}
          </div>

          {/* Text Content */}
          <div style={{ maxWidth: '400px' }}>
            <h2 style={{ fontSize: '3rem', color: '#facc15', marginBottom: '1rem' }}>
              {steps[currentStep - 1].title}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
              {steps[currentStep - 1].desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollCounter;
