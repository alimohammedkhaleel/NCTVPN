import React, { useEffect, useRef } from 'react';
import FullscreenToCardGallery from '../../components/effects/FullscreenToCardGallery';
import HardwareMatrix from '../../components/effects/HardwareMatrix';
import CooperationPuzzle from '../../components/effects/CooperationPuzzle';
import FundamentalPillars from '../../components/effects/FundamentalPillars';

// Images for the Gallery
import imgMechatronic from '../../assets/Mechatronic.jpg';
import imgAutotronics from '../../assets/Autotronics.jpg';
import imgRenewable from '../../assets/Renewable energy.jpg';
import imgPetroleum from '../../assets/Petroleum engineering.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef(null);
  const heroSpotRef = useRef(null);
  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Glowing Spot entrance (Background/Top) - Matches Home spot expansion
      if (heroSpotRef.current) {
        tl.fromTo(heroSpotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1.1, opacity: 1, duration: 2.2, ease: 'elastic.out(1, 0.45)' }
        );
      }

      // 2. Cinematic Title Reveal
      const title = headerRef.current?.querySelector('.hero-title');
      if (title) {
        tl.fromTo(title,
          { x: -100, opacity: 0, rotateY: -45, transformOrigin: 'left center', filter: 'blur(10px)' },
          { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: 'power4.out', filter: 'blur(0px)' },
          '-=1.5'
        );
      }

      // 3. Accent Badge bouncy entrance (matching Home's metric/badge style)
      const badge = headerRef.current.querySelector('.hero-badge');
      if (badge) {
        tl.fromTo(badge,
          { scale: 0.5, opacity: 0, y: -30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)' },
          "-=1.0"
        );
      }

      // 4. Columns slide up
      const cols = headerRef.current.querySelectorAll('.hero-col');
      if (cols.length) {
        tl.fromTo(cols,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out' },
          "-=1"
        );
      }

      // 5. Sections scroll reveal
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
      
    });

    return () => ctx.revert();
  }, []);

  const institutionalData = [
    {
      id: '01',
      title: 'New Cairo Technological University',
      desc: 'Serving as the core operational data center, primary cryptographic hub, and central network management headquarters.'
    },
    {
      id: '02',
      title: '6th of October Technological University',
      desc: 'Deployed as a high-density edge node, fully integrated into the localized routing and switching matrix.'
    },
    {
      id: '03',
      title: 'Misr International Technological University',
      desc: 'Configured as a high-availability spoke node utilizing secure multi-vendor firewall integrations for secure local resource sharing.'
    },
    {
      id: '04',
      title: 'Delta Technological University',
      desc: 'Connected via optimized high-speed WAN links for heavy engineering and laboratory simulation workloads.'
    },
    {
      id: '05',
      title: 'Beni Suef Technological University',
      desc: 'Integrated for real-time synchronization of vocational training records and multi-campus digital resources.'
    },
    {
      id: '06',
      title: 'Borg El Arab Technological University',
      desc: 'Leveraging the secure grid for maritime and advanced industrial automation educational payloads.'
    }
  ];

  const hardwareData = [
    {
      id: 'HW',
      title: 'Next-Generation Firewalls (NGFW)',
      desc: (
        <>
          <p>The boundary between each university’s LAN and the public internet is rigorously guarded by high-performance NGFWs serving as VPN termination endpoints:</p>
          <ul style={{ marginTop: '1rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
            <li><strong>Cisco Firepower 2100 Series</strong></li>
            <li><strong>Huawei USG6000E Series</strong></li>
          </ul>
        </>
      )
    },
    {
      id: 'RT',
      title: 'WAN Routing Infrastructure',
      desc: (
        <>
          <p>Central enterprise edge routing nodes managing external connections and WAN path quality:</p>
          <ul style={{ marginTop: '1rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
            <li><strong>Cisco C921-4PLTEGB Enterprise Router</strong></li>
            <li><strong>Cisco 887VA DSL Router</strong></li>
          </ul>
        </>
      )
    },
    {
      id: 'SW',
      title: 'LAN Distribution & Switching',
      desc: (
        <>
          <p>Switching arrays delivering gigabit links to computational workstations and classroom systems:</p>
          <ul style={{ marginTop: '1rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
            <li><strong>Cisco Catalyst 2960X</strong></li>
            <li><strong>Aruba 2930F & 2530</strong></li>
            <li><strong>TP-Link TL-SG1024D</strong></li>
          </ul>
        </>
      )
    },
    {
      id: 'VO',
      title: 'Enterprise VoIP Telephony',
      desc: (
        <>
          <p>Integrating nationwide voice dial-plans directly over virtual private trunks:</p>
          <ul style={{ marginTop: '1rem', color: '#a1a1aa', fontSize: '0.95rem' }}>
            <li><strong>Panasonic KX-NS500 IP PBX</strong></li>
            <li><strong>KX-NS520 Expansion Modules</strong></li>
          </ul>
        </>
      )
    }
  ];

  const galleryData = [
    {
      image: imgMechatronic,
      title: "Mechatronics Program",
      description: "Integrates mechanical engineering with electronics, computer control, and systems design. Students learn to design and maintain automated systems and industrial robots."
    },
    {
      image: imgAutotronics,
      title: "Autotronics Program",
      description: "Focuses on modern vehicle systems, including electric and hybrid technologies, advanced diagnostics, and computer-controlled automotive components."
    },
    {
      image: imgRenewable,
      title: "Renewable Energy",
      description: "Equips students with the expertise to design, implement, and manage sustainable energy systems, including solar, wind, and biofuel technologies."
    },
    {
      image: imgPetroleum,
      title: "Petroleum Engineering",
      description: "Covers the exploration, extraction, and processing of oil and gas resources using advanced technologies and environmentally conscious methodologies."
    }
  ];

  return (
    <div className="about-page home-page"> {/* Inherit Home formatting */}
      <div className="hero-glow-spot" ref={heroSpotRef}></div>

      {/* ======== HERO / ARCHITECTURAL HEADER ======== */}
      <section className="hero-section" ref={headerRef}>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-animate hero-badge">Infrastructure Hub</div>
          <h1 className="hero-animate hero-title">
            Architectural Framework & <br />
            <span className="highlight-yellow">Technical Specifications</span>
          </h1>
          
          <div className="hero-animate hero-columns">
            <div className="hero-col col-left">
              <h3 className="hero-col-title">Project Mission & Scope</h3>
              <p className="hero-col-text">
                The <strong>Technological Universities VPN Integration Initiative</strong> is a highly engineered, nationwide infrastructure deployment designed to establish an interconnected network environment for Egypt's newly established and rapidly evolving technological universities.
              </p>
            </div>
            <div className="hero-col col-right">
              <h3 className="hero-col-title">Vision 2030 Alignment</h3>
              <p className="hero-col-text">
                Under direct guidance of the Ministry of Higher Education and in alignment with Egypt Vision 2030, this site-to-site cryptographic WAN segmentation virtualizes academic resources, databases, and VOIP lines under a zero-trust architecture. The architecture is engineered to scale seamlessly as new institutions are founded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== NEW FULLSCREEN EXPANDING IMAGE GALLERY ======== */}
      <FullscreenToCardGallery data={galleryData} />

      <div className="about-container">
        {/* About container is now only used for the Puzzle or standard text if needed later */}
      </div>

      {/* ======== INSTITUTIONAL MATRIX ======== */}
      <section className="about-matrix-section" ref={addToRefs}>
        <FundamentalPillars 
          title="Connected Institutional"
          highlightText="Matrix"
          cardsData={institutionalData}
        />
      </section>

      {/* ======== HARDWARE BLUEPRINT ======== */}
      <HardwareMatrix />

      {/* ======== NEW INTERACTIVE COOPERATION PROTOCOL PUZZLE SECTION ======== */}
      <div ref={addToRefs}>
        <CooperationPuzzle />
      </div>

    </div>
  );
};

export default About;

