import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './FullscreenToCardGallery.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const FullscreenToCardGallery = ({ data }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // 3D Tilt on hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      const navbarHeight = 80; // px to account for navbar

      // Grid positions for 2x2 layout
      const gridPositions = [
        { xP: 0, yP: 0 },
        { xP: 50, yP: 0 },
        { xP: 0, yP: 50 },
        { xP: 50, yP: 50 }
      ];

      // Set initial state: all cards stacked fullscreen
      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: cards.length - i,
          borderRadius: 0
        });
        const overlay = card.querySelector('.f2c-card-overlay');
        if (overlay) gsap.set(overlay, { opacity: 0, y: 30 });
        const chars = card.querySelectorAll('.f2c-char');
        if (chars.length) gsap.set(chars, { opacity: 0, y: 40, rotateZ: gsap.utils.random(-15, 15) });
      });

      // Main pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Animate to 2x2 grid with gap
      cards.forEach((card, i) => {
        const pos = gridPositions[i] || gridPositions[0];
        const gap = 4; // px gap between cards
        tl.to(card, {
          width: `calc(50% - ${gap}px)`,
          height: `calc(50% - ${gap}px)`,
          top: pos.yP === 0 ? '0%' : `calc(50% + ${gap}px)`,
          left: pos.xP === 0 ? '0%' : `calc(50% + ${gap}px)`,
          borderRadius: '16px',
          ease: 'power3.inOut',
          duration: 1
        }, 0);
        const img = card.querySelector('.f2c-img');
        if (img) tl.to(img, { scale: 1.05, ease: 'power2.inOut', duration: 1 }, 0);
      });

      // After grid forms, show overlay and throw text
      cards.forEach((card, i) => {
        const overlay = card.querySelector('.f2c-card-overlay');
        if (overlay) {
          tl.to(overlay, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.75);
        }
        const chars = card.querySelectorAll('.f2c-char');
        if (chars.length) {
          tl.to(chars, {
            opacity: 1, y: 0, rotateZ: 0,
            duration: 0.12, stagger: 0.015,
            ease: 'back.out(1.7)'
          }, 0.8 + i * 0.03);
        }
      });

      // Airplane removed
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span className="f2c-char" key={i}>{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <div className="f2c-section" ref={sectionRef}>
      <div className="f2c-header-hud">
        <span className="f2c-hud-label">Academic Specializations</span>
        <div className="f2c-hud-line"></div>
      </div>

      <div className="f2c-viewport">
        {data.map((item, index) => (
          <div className="f2c-card" key={index} ref={addToCards}
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img src={item.image} alt={item.title} className="f2c-img" />
            <div className="f2c-card-overlay">
              <h3 className="f2c-card-title">{splitText(item.title)}</h3>
              <p className="f2c-card-desc">{splitText(item.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenToCardGallery;
