import React, { useEffect, useRef } from 'react';
import FullscreenScrollVelocity from '../../components/effects/FullscreenScrollVelocity';
import ScrollTube from '../../components/effects/ScrollTube';
import ImagesArcAnimation from '../../components/effects/ImagesArcAnimation';
import InfiniteMenu from '../../components/effects/InfiniteMenu';
import FundamentalPillars from '../../components/effects/FundamentalPillars';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Navbar slides in from top — opacity + y only, no scale/filter to avoid transform conflict
      const nav = document.querySelector('.navbar') || document.querySelector('nav');
      if (nav) {
        // disable CSS transitions during GSAP animation to prevent conflict
        nav.style.transition = 'none';
        gsap.fromTo(nav,
          { y: -80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3,
            clearProps: 'y,transform',
            onComplete: () => {
              // re-enable CSS transitions after GSAP finishes
              nav.style.transition = '';
            }
          }
        );
      }

      // 2. Glowing Spot (البقعة) expands behind the text
      const spot = heroRef.current.querySelector('.hero-glow-spot');
      if (spot) {
        tl.fromTo(spot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.5, ease: 'elastic.out(1, 0.4)' },
          0.5
        );
      }

      // 3. Badge bouncy entrance
      const badge = heroRef.current.querySelector('.hero-badge');
      if (badge) {
        tl.fromTo(badge,
          { y: 50, opacity: 0, scale: 0.5 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' },
          "-=2"
        );
      }

      // 4. Cinematic 3D Title Reveal
      const title = heroRef.current.querySelector('.hero-title');
      if (title) {
        tl.fromTo(title,
          { y: 80, opacity: 0, rotateX: -60, transformOrigin: 'top center' },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: 'power3.out' },
          "-=1.5"
        );
      }

      // 5. Columns slide up
      const cols = heroRef.current.querySelectorAll('.hero-col');
      if (cols.length) {
        tl.fromTo(cols,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out' },
          "-=1"
        );
      }

      // 6. Metrics pop in
      const metrics = heroRef.current.querySelectorAll('.metric-box');
      if (metrics.length) {
        tl.fromTo(metrics,
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' },
          "-=0.6"
        );
      }

      // Sections scroll reveal
      sectionsRef.current.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
          }
        );
      });

      // ScrollTube specific text animation
      const tubeText = document.querySelector('.tube-text-animate');
      if (tubeText) {
        gsap.fromTo(tubeText.children,
          { x: -50, opacity: 0, scale: 0.9 },
          { 
            scrollTrigger: {
              trigger: tubeText,
              start: 'top 80%',
            },
            x: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.3, ease: 'back.out(1.5)' 
          }
        );
      }

      // Core Philosophy specific animation
      const coreSection = document.querySelector('.core-philosophy-section');
      if (coreSection) {
        const texts = coreSection.querySelectorAll('.section-title, .section-text');
        const hub = coreSection.querySelector('.topo-hub');
        const spokes = coreSection.querySelectorAll('.topo-spoke');
        
        const tlCore = gsap.timeline({
          scrollTrigger: {
            trigger: coreSection,
            start: 'top 75%',
          }
        });

        tlCore.fromTo(texts, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        )
        .fromTo(hub,
          { scale: 0, opacity: 0, rotation: -10, boxShadow: '0 0 0px rgba(250, 204, 21, 0)' },
          { scale: 1, opacity: 1, rotation: 0, boxShadow: '0 0 30px rgba(250, 204, 21, 0.4)', duration: 0.8, ease: 'back.out(1.7)' },
          "-=0.4"
        )
        .fromTo(spokes,
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.5)' },
          "-=0.5"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const infiniteMenuItems = [
    { label: 'Core Routing', image: '/assets/router_device.png' },
    { label: 'Datacenter', image: '/assets/server_device.png' },
    { label: 'Security', image: '/assets/firewall_device.png' },
    { label: 'Switching', image: '/assets/switch_device.png' },
    { label: 'Wireless', image: '/assets/antenna_device.png' }
  ];

  return (
    <div className="home-page">

      {/* ======== HERO ======== */}
      <section className="hero-section" ref={heroRef}>
        
        {/* The Glowing Spot */}
        <div className="hero-glow-spot"></div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-animate hero-badge">TU-IN Network Portal</div>
          <h1 className="hero-animate hero-title">
            The National Unified <span className="highlight-yellow">VPN Framework</span><br />
            for Egyptian Technological Universities
          </h1>
        
        {/* Asymmetrical Two-Column Hero Grid */}
        <div className="hero-animate hero-columns">
          <div className="hero-col col-left">
            <h3 className="hero-col-title">Strategic Initiative</h3>
            <p className="hero-col-text">
              Under the strategic guidance of the Ministry of Higher Education and Scientific Research, in direct alignment with <strong>Egypt Vision 2030</strong>, the Interconnected Network (ETU-IN) establishes a centralized, ultra-secure, and high-throughput virtual private fabric. This enterprise grid redefines technological education by virtualizing country-wide academic resources, examination portals, and research databases.
            </p>
          </div>
          <div className="hero-col col-right">
            <h3 className="hero-col-title">Central Nexus</h3>
            <p className="hero-col-text">
              The primary administrative, cryptographic, and routing hub is securely anchored at <strong>New Cairo Technological University (NCTC)</strong>. From this operational core, a high-availability hub-and-spoke topology extends to bind every Technological University across Egypt into a unified digital ecosystem, delivering sub-millisecond local switching speeds and automated failover resiliency.
            </p>
          </div>
        </div>

        {/* Premium Corporate/Government Metrics Bar */}
        <div className="hero-animate hero-metrics">
          <div className="metric-box">
            <span className="metric-num">99.99%</span>
            <span className="metric-label">Uptime SLA</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">AES-256</span>
            <span className="metric-label">Encryption</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">24/7/365</span>
            <span className="metric-label">NOC Monitoring</span>
          </div>
        </div>
        </div>
      </section>

      {/* ======== SECTION 1: INFINITE MENU ======== */}
      <div ref={addToRefs}>
        <InfiniteMenu items={infiniteMenuItems} />
      </div>

      {/* ======== SECTION 2: SCROLL TUBE PATH EFFECT ======== */}
      <div className="home-tube-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>
        <div className="tube-text-animate" style={{ flex: '1 1 400px' }}>
          <h2 className="section-title">Cryptographic <span className="highlight">Traffic Tunneling</span></h2>
          <p className="section-text" style={{ maxWidth: '100%' }}>
            Secure IPsec tunnels across the WAN ensure data integrity and real-time packet switching through the primary routing backbone.
          </p>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <ScrollTube />
        </div>
      </div>

      {/* ======== SCROLL VELOCITY ======== */}
      <FullscreenScrollVelocity />

      {/* ======== CORE PHILOSOPHY ======== */}
      <section className="content-section core-philosophy-section">
        <h2 className="section-title">The Core Philosophy: <span className="highlight">Decentralized Campuses, One Unified Infrastructure</span></h2>
        <p className="section-text">
          Historically, educational institutions operated on isolated localized networks (LANs), causing data silos, fragmented student management systems, and massive communication overheads. The ETU-IN project redefines this paradigm by deploying cutting-edge <strong>Next-Generation Firewalls (NGFW)</strong>, <strong>Enterprise Edge Routers</strong>, and <strong>Layer 2/3 Managed Switches</strong> to virtualize the country's technological education sector.
        </p>
        <div className="topology-diagram">
          <div className="topo-hub">
            <span>New Cairo Technological University</span>
            <small>(CENTRAL VPN HUB)</small>
          </div>
          <div className="topo-spokes">
            <div className="topo-spoke">
              <span>6th of October Technological University</span>
              <small>(Edge Spoke)</small>
            </div>
            <div className="topo-spoke">
              <span>Misr International Technological Univ.</span>
              <small>(Edge Spoke)</small>
            </div>
          </div>
        </div>
        <p className="section-text">
          Whether an engineer, researcher, or student is physically located in Cairo, the Nile Delta, or Upper Egypt, they interact with a unified network fabric. This ensures that centralized enterprise resource planning (ERP) systems, advanced laboratory simulation software, digital libraries, and critical examination databases are securely accessible with sub-millisecond local switching latencies and optimized wide-area network (WAN) paths.
        </p>
      </section>

      {/* ======== SECTION 4: SCROLLING IMAGES WITH STICKY NUMBER ======== */}
      <div ref={addToRefs}>
        <ImagesArcAnimation />
      </div>

      {/* ======== SECTION 5: FUNDAMENTAL PILLARS ======== */}
      <div ref={addToRefs}>
        <FundamentalPillars />
      </div>

    </div>
  );
};

export default Home;
