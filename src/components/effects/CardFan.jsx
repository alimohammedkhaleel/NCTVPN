import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AutotronicsImg from '../../assets/Autotronics.jpg';
import MechatronicImg from '../../assets/Mechatronic.jpg';
import PetroleumImg from '../../assets/Petroleum engineering.jpg';
import './CardFan.css';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    id: 1,
    title: 'New Cairo Tech',
    role: 'Central Hub / NOC',
    src: AutotronicsImg
  },
  {
    id: 2,
    title: '6th of October Tech',
    role: 'Edge Spoke Node',
    src: MechatronicImg
  },
  {
    id: 3,
    title: 'Misr International',
    role: 'Cryptographic Spoke',
    src: PetroleumImg
  }
];

export default function CardFan() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll triggered centered fanning spread
      gsap.fromTo(cardsRef.current,
        {
          x: 0,
          rotation: 0,
          transformOrigin: '50% 100%',
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5,
          },
          x: (i) => (i - 1) * 220, // Perfect symmetrical spread left and right
          rotation: (i) => (i - 1) * 12, // Beautiful fan angles
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="card-fan-container" ref={containerRef}>
      <h3 className="card-fan-subtitle">Interactive Campus Matrix</h3>
      <h2 className="card-fan-title">Connected Technological Universities</h2>
      <p className="card-fan-desc">
        Hover over the card deck or scroll the page to fan out the institutional nodes, revealing their designated roles in the nationwide enterprise network backbone.
      </p>
      
      <div className="card-fan-deck">
        {cardData.map((card, idx) => (
          <div
            key={card.id}
            className="fan-card"
            ref={(el) => (cardsRef.current[idx] = el)}
            style={{ zIndex: idx }}
          >
            <div className="fan-card-inner">
              <img src={card.src} alt={card.title} className="fan-card-img" />
              <div className="fan-card-overlay"></div>
              <div className="fan-card-content">
                <div className="fan-card-badge">0{card.id}</div>
                <h3>{card.title}</h3>
                <p>{card.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
