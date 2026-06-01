import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImagesArcAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const imagesData = [
  {
    id: 1,
    title: 'Enterprise Router Gateway',
    desc: 'High-throughput core routing, capable of managing gigabits of encrypted traffic across the WAN with sub-millisecond switching latency.',
    src: '/assets/router_device.png'
  },
  {
    id: 2,
    title: 'Secure Server Infrastructure',
    desc: 'Dedicated enterprise server racks for hosting examination databases and virtualized learning environments with high availability.',
    src: '/assets/server_device.png'
  },
  {
    id: 3,
    title: 'Next-Gen Firewall',
    desc: 'Advanced threat protection and Zero-Trust Network Architecture (ZTNA) inspection for all incoming and outgoing connections.',
    src: '/assets/firewall_device.png'
  },
  {
    id: 4,
    title: 'Core Switching Matrix',
    desc: 'High-density fiber optic switching matrix for seamless local area network connectivity within campuses.',
    src: '/assets/switch_device.png'
  },
  {
    id: 5,
    title: 'High-Speed Telecommunications',
    desc: 'Robust wireless and 5G cellular failover systems guaranteeing 99.99% uptime in the event of primary fiber disruptions.',
    src: '/assets/antenna_device.png'
  }
];

export default function ImagesArcAnimation({ data = imagesData }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('.scroll-img-wrapper');

      images.forEach((img, i) => {
        ScrollTrigger.create({
          trigger: img,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo('.arc-left-number',
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
    gsap.fromTo('.arc-left-text-animate',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
    );
  }, [activeIndex]);

  return (
    <div className="images-scroll-section" ref={containerRef}>
      <div className="arc-grid">
        
        {/* Left Column - Sticky Number and Description */}
        <div className="arc-left-col">
          <div className="arc-left-number" key={`num-${activeIndex}`}>
            0{data[activeIndex].id}
          </div>
          <div className="arc-left-content" key={`text-${activeIndex}`}>
            <h3 className="arc-left-text-animate arc-label">Network Infrastructure</h3>
            <h2 className="arc-left-text-animate arc-title">
              {data[activeIndex].title}
            </h2>
            <p className="arc-left-text-animate arc-desc">
              {data[activeIndex].desc}
            </p>
          </div>
        </div>

        {/* Right Column - Scrolling Images */}
        <div className="arc-right-col">
          {data.map((img) => (
            <div key={img.id} className="scroll-img-wrapper-outer">
              <div className="scroll-img-wrapper">
                <img src={img.src} alt={img.title} className="scroll-img" />
              </div>
              <div className="mobile-img-info">
                <div className="mobile-img-num">0{img.id}</div>
                <h3 className="mobile-img-title">{img.title}</h3>
                <p className="mobile-img-desc">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}