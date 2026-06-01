import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HardwareMatrix.css';

gsap.registerPlugin(ScrollTrigger);

const hardwareData = [
  {
    id: "fw",
    category: "Next-Generation Firewalls (NGFW)",
    desc: "The boundary between each university's LAN and the public internet is rigorously guarded by high-performance NGFWs serving as VPN termination endpoints.",
    specs: [
      "Cisco Firepower 2100 Series",
      "Huawei USG6000E Series"
    ]
  },
  {
    id: "rt",
    category: "WAN Routing Infrastructure",
    desc: "Central enterprise edge routing nodes managing external connections and WAN path quality.",
    specs: [
      "Cisco C921-4PLTEGB Enterprise Router",
      "Cisco 887VA DSL Router"
    ]
  },
  {
    id: "sw",
    category: "LAN Distribution & Switching",
    desc: "Switching arrays delivering gigabit links to computational workstations and classroom systems.",
    specs: [
      "Cisco Catalyst 2960X",
      "Aruba 2930F & 2530",
      "TP-Link TL-SG1024D"
    ]
  },
  {
    id: "vo",
    category: "Enterprise VoIP Telephony",
    desc: "Integrating nationwide voice dial-plans directly over virtual private trunks.",
    specs: [
      "Panasonic KX-NS500 IP PBX",
      "KX-NS520 Expansion Modules"
    ]
  }
];

// Simple fade-in animation for cards
const cardAnimations = [
  // Card 1: Simple fade in
  { from: { opacity: 0 }, ease: 'power2.out' },
  // Card 2: Simple fade in
  { from: { opacity: 0 }, ease: 'power2.out' },
  // Card 3: Simple fade in
  { from: { opacity: 0 }, ease: 'power2.out' },
  // Card 4: Simple fade in
  { from: { opacity: 0 }, ease: 'power2.out' }
];

const HardwareMatrix = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const fanRef = useRef(null);
  const fanWrapperRef = useRef(null);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== CARD ENTRY ANIMATIONS - Each card unique =====
      cardsRef.current.forEach((card, i) => {
        const anim = cardAnimations[i] || cardAnimations[0];
        gsap.fromTo(card, anim.from, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: anim.ease,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // ===== STICKY SPIN & MORPH FAN ANIMATION =====
      const fanWrapper = fanWrapperRef.current;
      const blades = fanWrapper?.querySelectorAll('.fan-blade');

      if (fanWrapper && blades) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        });

        // 1. Move the entire fan down the track by animating top
        tl.to(fanRef.current, {
          top: "calc(100% - 260px)",
          ease: 'none',
          duration: 1
        }, 0);

        // 2. Continuous rotation based on scroll depth
        tl.to(fanWrapper, {
          rotation: 1440,
          ease: 'none',
          duration: 1
        }, 0);

        // 3. Morph blades from simple gray sticks to golden-yellow premium petal shapes
        tl.to(blades, {
          height: 100,
          borderRadius: '0 100% 0 100%',
          background: 'linear-gradient(135deg, #facc15, #eab308)',
          boxShadow: '0 0 35px rgba(250, 204, 21, 0.65)',
          transformOrigin: '0% 0%',
          ease: 'power2.inOut',
          duration: 0.8
        }, 0.1);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hw-section" ref={sectionRef}>

      <div className="hw-header">
        <div className="hw-badge">HARDWARE ARCHITECTURE</div>
        <h2 className="hw-title">Hardware Blueprint</h2>
        <p className="hw-subtitle">Cybernetic Backbone Connecting Universities Nationwide</p>
      </div>

      <div className="hw-matrix-container">
        {/* Cards in 2x2 Grid */}
        <div className="hw-cards-list">
          {hardwareData.map((item, idx) => (
            <div className="hw-glass-card" key={item.id} ref={addToCards}>
              <div className="hw-laser"></div>
              <div className="glow-orb"></div>

              <div className="card-content">
                <div className="hw-badge">{item.id.toUpperCase()}</div>
                <h3 className="accent-text">{item.category}</h3>
                <p className="hw-desc">{item.desc}</p>

                <div className="hw-specs-list">
                  {item.specs.map((spec, j) => (
                    <div className="hw-spec-item" key={j}>
                      <span className="spec-dot"></span>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Fan Track */}
        <div className="hw-fan-track">
          <div className="hw-fan-element" ref={fanRef}>
            <div className="hw-fan-wrapper" ref={fanWrapperRef}>
              <div className="fan-core"></div>
              <div className="fan-blade blade-1"></div>
              <div className="fan-blade blade-2"></div>
              <div className="fan-blade blade-3"></div>
              <div className="fan-blade blade-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareMatrix;
