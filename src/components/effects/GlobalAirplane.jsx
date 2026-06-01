import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './GlobalAirplane.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function GlobalAirplane() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on desktop/tablet to avoid mobile lag and weird paths
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const airplane = document.querySelector('.global-airplane');
      const trail = document.querySelector('.global-airplane-trail-path');
      
      if (trail && airplane) {
        const length = trail.getTotalLength();

        // Hide trail completely at first
        gsap.set(trail, {
          strokeDasharray: length,
          strokeDashoffset: length
        });

        // Create a global timeline hooked to the entire body scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // slightly smooth scrubbing
          }
        });

        // 1. Move airplane along the path
        tl.to(airplane, {
          motionPath: {
            path: trail,
            align: trail,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          },
          ease: "power1.inOut",
          duration: 1
        }, 0);

        // 2. Draw the trail. 
        // We only animate it to 80 instead of 0 to leave an 80px gap between the plane and the fire trail.
        tl.to(trail, {
          strokeDashoffset: 80,
          ease: "power1.inOut",
          duration: 1
        }, 0);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="global-airplane-container" ref={containerRef}>
      <svg className="global-airplane-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="global-trail-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0" />
            <stop offset="30%" stopColor="#facc15" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#eab308" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="1" />
          </linearGradient>

          <filter id="global-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Paper Airplane Gradients */}
          <linearGradient id="global-plane-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="global-plane-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="global-plane-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
        </defs>

        {/* Diagonal path with a loop in the middle */}
        {/* Starts top-left (50,50), loops around (400,400 -> 700,700 -> 200,800), ends bottom-right (900,950) */}
        <path 
          className="global-airplane-trail-path"
          d="M 50,50 Q 300,300 500,500 C 700,700 200,800 400,400 C 600,0 800,800 900,950" 
          fill="none" 
          stroke="url(#global-trail-gradient)" 
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#global-trail-glow)"
        />

        {/* Airplane SVG */}
        <g className="global-airplane">
          <g transform="scale(0.8) translate(-40, -40)">
            <path d="M40 0 L0 80 L35 70 L40 100 L45 70 L80 80 Z" fill="url(#global-plane-shadow)" />
            <path d="M40 0 L0 80 L40 65 Z" fill="url(#global-plane-left)" />
            <path d="M40 0 L80 80 L40 65 Z" fill="url(#global-plane-right)" />
            <path d="M40 65 L40 100 L30 80 Z" fill="#eab308" />
          </g>
        </g>
      </svg>
    </div>
  );
}
