import React, { useEffect, useRef } from 'react';
import FullscreenScrollVelocity from '../../components/effects/FullscreenScrollVelocity';
import ScrollTube from '../../components/effects/ScrollTube';
import ImagesArcAnimation from '../../components/effects/ImagesArcAnimation';
import InfiniteMenu from '../../components/effects/InfiniteMenu';
import FundamentalPillars from '../../components/effects/FundamentalPillars';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
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

      // 1. Navbar slides down creatively
      const nav = document.querySelector('.navbar') || document.querySelector('nav');
      if (nav) {
        gsap.fromTo(nav, 
          { y: -50, opacity: 0, scale: 0.95, filter: 'blur(10px)' }, 
          { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'elastic.out(1, 0.7)', delay: 0.5 }
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
    { label: 'Encrypted Tunneling', image: '/assets/router_device.png' },
    { label: 'ERP Replication', image: '/assets/server_device.png' },
    { label: 'VoIP Trunking', image: '/assets/firewall_device.png' },
    { label: 'VLAN Segmentation', image: '/assets/switch_device.png' },
    { label: 'HPC Clusters', image: '/assets/antenna_device.png' }
  ];

  const servicesData = [
    {
      id: '01',
      title: 'High-Performance Site-to-Site Encrypted Tunneling',
      desc: 'Utilizing the advanced acceleration hardware of the Cisco Firepower 2100 and Huawei USG6000E firewalls, we run concurrent IPsec VPN tunnels utilizing IKEv2. This service supports multi-protocol data distribution with automatic path failover routing.'
    },
    {
      id: '02',
      title: 'Centralized ERP & Database Replication',
      desc: 'Allows centralized software applications—such as student registration systems, human resource databases, and grading portals—to be updated globally from any campus. Databases at edge branches securely stream incremental updates to the primary backup arrays at NCTC.'
    },
    {
      id: '03',
      title: 'Inter-Institutional VoIP Trunking',
      desc: 'By configuring SIP trunks over our private VPN tunnels between the Panasonic KX-NS500 IP PBX systems, we cross-link the dial-plans of all technological universities. Staff members enjoy direct 4-digit calling across the country with high-definition audio.'
    },
    {
      id: '04',
      title: 'Advanced Network Segmentation & QoS',
      desc: 'Leveraging Cisco and Aruba platforms, we segregate the campus into distinct logical zones. High-definition remote video lectures and live virtual reality simulations are placed into a high-priority queue, ensuring uninterrupted educational experiences.'
    },
    {
      id: '05',
      title: 'Centralized High-Performance Computing',
      desc: 'Rather than purchasing expensive server infrastructure for every single campus, this service allows regional universities to remotely leverage centralized computing clusters hosted at main data centers like NCTC through high-throughput remote desktop protocols.'
    }
  ];

  return (
    <div className="home-page">

      {/* ======== HERO ======== */}
      <section className="hero-section" ref={heroRef}>
        
        {/* The Glowing Spot */}
        <div className="hero-glow-spot"></div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-animate hero-badge">Operations Catalog</div>
          <h1 className="hero-animate hero-title">
            Managed Network Services & <br />
            <span className="highlight-yellow">Infrastructure Capabilities</span>
          </h1>
        
        {/* Asymmetrical Two-Column Hero Grid */}
        <div className="hero-animate hero-columns">
          <div className="hero-col col-left">
            <h3 className="hero-col-title">Service Delivery Framework</h3>
            <p className="hero-col-text">
              The centralized Network Operations Center (NOC) at <strong>New Cairo Technological University</strong>, running in synchronization with engineers at all participating spokes, delivers an extensive catalog of enterprise-tier network services.
            </p>
          </div>
          <div className="hero-col col-right">
            <h3 className="hero-col-title">Uncompromising Quality</h3>
            <p className="hero-col-text">
              These services are custom-designed to fulfill the complex operational, educational, and security requirements of a modern, multi-site technological university framework. Every service is governed by strict Service Level Agreements (SLAs).
            </p>
          </div>
        </div>

        {/* Premium Corporate/Government Metrics Bar */}
        <div className="hero-animate hero-metrics">
          <div className="metric-box">
            <span className="metric-num">100Gbps</span>
            <span className="metric-label">Backbone Capacity</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">IKEv2</span>
            <span className="metric-label">IPsec Tunnels</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">Zero-Trust</span>
            <span className="metric-label">Security Architecture</span>
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
          <h2 className="section-title">Deep-Dive <span className="highlight">Service Catalog</span></h2>
          <p className="section-text" style={{ maxWidth: '100%' }}>
            Our certified engineering teams continuously monitor, manage, and maintain the operational lines across the national WAN matrix.
          </p>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <ScrollTube />
        </div>
      </div>

      {/* ======== SCROLL VELOCITY ======== */}
      <FullscreenScrollVelocity 
        badgeText="NOC Operations"
        titleLine1="National VPN"
        titleLine2="Services Grid"
        subTitle="Secure, Fast, Reliable"
        description="Empowering Egypt's technological universities with a state-of-the-art secure tunneling and data replication framework."
        techPills={["IPsec", "ZTNA", "High Availability", "SD-WAN"]}
        epicSentence={(
          <>
            Whether you are managing <span className="creative-span" data-type="drop">Secure Databases</span> 
            {" "}or streaming <span className="creative-span" data-type="scale">HD VoIP</span>, 
            {" "}<span className="creative-span" data-type="slide-in-rtl">Our Centralized Architecture</span> 
            {" "}ensures that <span className="creative-span" data-type="drop">Critical Data</span> 
            {" "}is delivered through <span className="creative-span" data-type="slide-in-ltr">Encrypted Tunnels</span> 
            {" "}to guarantee absolute <span className="creative-span" data-type="scale">Zero-Trust Security</span>.
          </>
        )}
      />

      {/* ======== CORE PHILOSOPHY ======== */}
      <section className="content-section core-philosophy-section">
        <h2 className="section-title">Service Architecture: <span className="highlight">Centralized Operations, Distributed Access</span></h2>
        <p className="section-text">
          Our managed services framework is engineered to eliminate local data silos and massive communication overheads. By deploying cutting-edge <strong>Next-Generation Firewalls (NGFW)</strong>, <strong>Enterprise Edge Routers</strong>, and <strong>Layer 2/3 Managed Switches</strong>, we virtualize the entire service catalog for remote branches.
        </p>
        <div className="topology-diagram">
          <div className="topo-hub">
            <span>Centralized NOC & Core Services</span>
            <small>(NCTC HUB)</small>
          </div>
          <div className="topo-spokes">
            <div className="topo-spoke">
              <span>Site-to-Site VPN Tunnels</span>
              <small>(Edge Transport)</small>
            </div>
            <div className="topo-spoke">
              <span>ERP & Database Replication</span>
              <small>(Data Sync)</small>
            </div>
          </div>
        </div>
        <p className="section-text">
          Whether a researcher or student is physically located in Cairo, the Nile Delta, or Upper Egypt, they interact with these unified services. This ensures that centralized computing clusters, advanced laboratory simulation software, and critical VoIP trunks are securely accessible with sub-millisecond local switching latencies.
        </p>
      </section>

      {/* ======== SECTION 4: SCROLLING IMAGES WITH STICKY NUMBER ======== */}
      <div ref={addToRefs}>
        <ImagesArcAnimation />
      </div>

      {/* ======== SECTION 5: FUNDAMENTAL PILLARS (SERVICES CATALOG) ======== */}
      <div ref={addToRefs}>
        <FundamentalPillars 
          title="Comprehensive Operational"
          highlightText="Lines"
          cardsData={servicesData}
        />
      </div>

    </div>
  );
};

export default Services;

