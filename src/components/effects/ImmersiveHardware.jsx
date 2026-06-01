import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImmersiveHardware.css';

gsap.registerPlugin(ScrollTrigger);

const ImmersiveHardware = ({ data }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        // Emmersing effect (Immersive 3D Parallax Scroll)
        gsap.fromTo(card,
          { 
            opacity: 0, 
            z: -400, // Deep in the background
            rotationX: 15, // Tilted back
            y: 80 
          },
          {
            opacity: 1,
            z: 0, // Pops to the front
            rotationX: 0, // Flattens out
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 45%",
              scrub: 1, // Connects exactly to scroll position
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="immersive-hardware-container" ref={containerRef}>
      <h2 className="immersive-title">
        Granular Hardware <span className="highlight-yellow" style={{ color: '#facc15' }}>Blueprint</span>
      </h2>
      <div className="immersive-cards">
        {data.map((item, index) => (
          <div 
            key={item.id} 
            className="immersive-card"
            ref={el => cardsRef.current[index] = el}
          >
            <div className="immersive-card-header">
              <span className="immersive-card-id">{item.id}</span>
              <h3 className="immersive-card-title">{item.title}</h3>
            </div>
            <div className="immersive-card-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImmersiveHardware;
