import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFullscreenGallery.css';

gsap.registerPlugin(ScrollTrigger);

import imgMechatronic from '../../assets/Mechatronic.jpg';
import imgAutotronics from '../../assets/Autotronics.jpg';
import imgEnergy from '../../assets/Renewable energy.jpg';
import imgPetroleum from '../../assets/Petroleum engineering.jpg';

const programList = [
  { id: '01', title: 'Mechatronics', desc: 'Integrating mechanical engineering with electronics, computer control, and systems design. Students learn how to design and maintain automated systems.', tag: 'Robotics', src: imgMechatronic },
  { id: '02', title: 'Autotronics', desc: 'Focuses on advanced electronic systems found in modern vehicles. It combines automotive mechanics with electronic sensors and computer-controlled systems.', tag: 'Automotive', src: imgAutotronics },
  { id: '03', title: 'Renewable Energy', desc: 'Trains students in the design, installation, and maintenance of renewable energy systems, such as solar panels and wind turbines.', tag: 'Power', src: imgEnergy },
  { id: '04', title: 'Petroleum Tech', desc: 'Focuses on the technical aspects of the oil and gas industry, drilling techniques, production operations, and processing automation.', tag: 'Resources', src: imgPetroleum }
];

const ScrollFullscreenGallery = () => {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      const bar = progressBarRef.current;

      // Reset initial states for cards
      gsap.set(cards[0], { zIndex: 1 });
      gsap.set(cards[1], { zIndex: 2, clipPath: 'inset(0 0 0 100%)' });
      gsap.set(cards[2], { zIndex: 3, clipPath: 'inset(100% 0 0 0)' });
      gsap.set(cards[3], { zIndex: 4, clipPath: 'circle(0% at 50% 50%)' });

      // Reset initial states for inner content
      cards.forEach((card, index) => {
        if (index > 0) {
          const bg = card.querySelector('.blueprint-card-bg');
          const content = card.querySelector('.blueprint-card-content');
          gsap.set(bg, { scale: 1.2 });
          
          if (index === 1) gsap.set(content.children, { y: 40, opacity: 0 }); // Right wipe
          if (index === 2) gsap.set(content.children, { x: 30, opacity: 0 }); // Bottom wipe
          if (index === 3) gsap.set(content.children, { filter: 'blur(10px)', opacity: 0 }); // Iris
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=4000',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Progress bar tracks the entire timeline
      tl.to(bar, { scaleX: 1, ease: 'none', duration: 3 }, 0);

      // Phase 1: Mechatronics -> Autotronics (Right-to-Left Wipe)
      tl.to(cards[0], { scale: 0.95, xPercent: -5, opacity: 0.5, duration: 1, ease: 'power2.inOut' }, 0);
      tl.to(cards[1], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, 0);
      tl.to(cards[1].querySelector('.blueprint-card-bg'), { scale: 1, duration: 1, ease: 'power2.out' }, 0);
      tl.to(cards[1].querySelector('.blueprint-card-content').children, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 0.5);

      // Phase 2: Autotronics -> Renewable Energy (Bottom-to-Top Wipe)
      tl.to(cards[1], { scale: 0.95, yPercent: -5, opacity: 0.5, duration: 1, ease: 'power2.inOut' }, 1);
      tl.to(cards[2], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, 1);
      tl.to(cards[2].querySelector('.blueprint-card-bg'), { scale: 1, duration: 1, ease: 'power2.out' }, 1);
      tl.to(cards[2].querySelector('.blueprint-card-content').children, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 1.5);

      // Phase 3: Renewable Energy -> Petroleum Tech (Iris Expansion)
      tl.to(cards[2], { scale: 1.1, opacity: 0, duration: 1, ease: 'power2.inOut' }, 2);
      tl.to(cards[3], { clipPath: 'circle(150% at 50% 50%)', duration: 1, ease: 'power2.inOut' }, 2);
      tl.to(cards[3].querySelector('.blueprint-card-bg'), { scale: 1, duration: 1, ease: 'power2.out' }, 2);
      tl.to(cards[3].querySelector('.blueprint-card-content').children, { filter: 'blur(0px)', opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 2.5);

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="blueprint-section" ref={sectionRef}>
      
      {/* HUD: Fixed Title Area */}
      <div className="blueprint-hud">
        <h2 className="blueprint-hud-title">
          Academic Specializations
        </h2>
        <div className="blueprint-progress-track">
          <div className="blueprint-progress-bar" ref={progressBarRef}></div>
        </div>
      </div>

      {/* Interactive Card Stack */}
      <div className="blueprint-cards-wrapper">
        <div className="blueprint-card-stack">
          {programList.map((program, index) => (
            <div 
              key={program.id} 
              className="blueprint-card" 
              id={`card-${index + 1}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div 
                className="blueprint-card-bg" 
                style={{ backgroundImage: `url(${program.src})` }}
              ></div>
              <div className="blueprint-card-content">
                <span className="blueprint-card-id">{program.id}</span>
                <h3 className="blueprint-card-title">{program.title}</h3>
                <p className="blueprint-card-desc">{program.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default ScrollFullscreenGallery;
