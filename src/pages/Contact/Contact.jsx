import React, { useEffect, useRef, useState } from 'react';
import ScrollTube from '../../components/effects/ScrollTube';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const initialNocSites = [
  { id: 'NCTC', name: 'New Cairo Tech Univ. (Core)', status: 'ONLINE', ping: '12ms', ip: '10.100.1.1' },
  { id: 'OCTO', name: '6th of October Tech Univ.', status: 'SECURE', ping: '18ms', ip: '10.100.2.1' },
  { id: 'MITU', name: 'Misr International Tech Univ.', status: 'SECURE', ping: '14ms', ip: '10.100.3.1' },
  { id: 'DELT', name: 'Delta Technological Univ.', status: 'SECURE', ping: '24ms', ip: '10.100.4.1' },
  { id: 'BENI', name: 'Beni Suef Technological Univ.', status: 'SECURE', ping: '28ms', ip: '10.100.5.1' },
  { id: 'BORG', name: 'Borg El Arab Tech Univ.', status: 'SECURE', ping: '22ms', ip: '10.100.6.1' }
];

const Contact = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [nocSites, setNocSites] = useState(initialNocSites);
  const [terminalLog, setTerminalLog] = useState([
    'Initializing TU-IN VPN Core Terminal...',
    'Establishing secure handshake over port 443...',
    'Zero-Trust inspection complete. Welcome, NOC Administrator.'
  ]);
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Live ping updates for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setNocSites(prev => prev.map(site => {
        const offset = Math.floor(Math.random() * 5) - 2;
        const currentPingNum = parseInt(site.ping);
        const newPing = Math.max(8, currentPingNum + offset);
        return {
          ...site,
          ping: `${newPing}ms`
        };
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const runDiagnostics = () => {
    if (diagnosticsRunning) return;
    setDiagnosticsRunning(true);
    setProgress(0);
    setTerminalLog(prev => [
      ...prev,
      `> nct-vpn-status --run-diagnostics`,
      `[INFO] Starting full tunnel checks across WAN framework...`
    ]);

    // Animate diagnostic progress bar
    const diagTl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(diagTl.progress() * 100));
      },
      onComplete: () => {
        setDiagnosticsRunning(false);
        setTerminalLog(prev => [
          ...prev,
          `[SUCCESS] 99.99% Core SLA verified. 6 out of 6 spokegate tunnels securely fully operational.`,
          `[SUCCESS] Encryption handshake checked: AES-256 standard active.`
        ]);
      }
    });

    diagTl.to({}, { duration: 2.5 });
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Glowing Spot entrance animation
    const spot = document.querySelector('.contact-page .hero-glow-spot');
    if (spot) {
      tl.fromTo(spot,
        { scale: 0, opacity: 0 },
        { scale: 1.1, opacity: 1, duration: 2.2, ease: 'elastic.out(1, 0.45)' }
      );
    }

    // 2. Cinematic 3D Title Reveal
    const title = headerRef.current.querySelector('.page-title');
    if (title) {
      tl.fromTo(title,
        { y: 80, opacity: 0, rotateX: -50, transformOrigin: 'top center', filter: 'blur(5px)' },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'power4.out', filter: 'blur(0px)' },
        '-=1.5'
      );
    }

    // 3. Contact Philosophy Reveal
    const philosophy = headerRef.current.querySelector('.contact-philosophy');
    if (philosophy) {
      tl.fromTo(philosophy,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=1.0'
      );
    }

    // 4. Channel Cards Staggered Elastic Entrance
    if (cardsRef.current.length) {
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.9, rotateX: 8 },
        {
          scrollTrigger: {
            trigger: '.channels-grid',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        }
      );
    }

    // 5. SOP / Ticket Template Reveal
    const sopSection = document.querySelector('.sop-section');
    if (sopSection) {
      const subtitle = sopSection.querySelector('.section-subtitle');
      const intro = sopSection.querySelector('.sop-intro');
      const template = sopSection.querySelector('.ticket-template');

      const tlSop = gsap.timeline({
        scrollTrigger: {
          trigger: sopSection,
          start: 'top 80%',
        }
      });

      if (subtitle) {
        tlSop.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      }
      if (intro) {
        tlSop.fromTo(intro, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
      }
      if (template) {
        tlSop.fromTo(template,
          { y: 50, opacity: 0, rotateX: -15, transformOrigin: 'top center' },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.3'
        );
      }
    }

    // 6. SLA Table Rows Staggered Slide-in
    const slaSection = document.querySelector('.sla-section');
    if (slaSection) {
      const subtitle = slaSection.querySelector('.section-subtitle');
      const tableWrapper = slaSection.querySelector('.sla-table-wrapper');
      const tableRows = slaSection.querySelectorAll('.sla-table tbody tr');

      const tlSla = gsap.timeline({
        scrollTrigger: {
          trigger: slaSection,
          start: 'top 80%',
        }
      });

      if (subtitle) {
        tlSla.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      }
      if (tableWrapper) {
        tlSla.fromTo(tableWrapper, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
      }
      if (tableRows.length) {
        gsap.fromTo(tableRows,
          { x: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.sla-table',
              start: 'top 80%',
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }
    }

    // 7. CTA Section Bounce Entrance
    const cta = document.querySelector('.cta-section');
    if (cta) {
      gsap.fromTo(cta.children,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
          },
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'back.out(1.4)'
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="contact-page">
      <div className="hero-glow-spot"></div>

      <div className="contact-container">

        {/* ======== CONTACT HEADER ======== */}
        <header className="contact-header" ref={headerRef}>
          <div className="accent-badge-container">
            <span className="accent-badge">Central Operations Hub</span>
          </div>
          <h1 className="page-title">
            Network Operations Center (NOC) & <br />
            <span className="highlight-yellow">Global Support Framework</span>
          </h1>
          <p className="contact-philosophy">
            The nationwide technical infrastructure connecting Egypt's Technological Universities is managed, monitored, and maintained 24 hours a day, 7 days a week, by the <strong>Central Network Operations Center (NOC)</strong> located at <strong>New Cairo Technological University</strong>. The NOC is staffed by an elite tier of certified senior network engineers, cyber security analysts, and systems administrators. Our mission is to proactively identify network anomalies, maintain firewall threat databases, optimize WAN routing paths, and provide instant technical support to institutional IT teams across the country.
          </p>
        </header>

        {/* ======== DYNAMIC NOC DIAGNOSTIC PANEL ======== */}
        <section className="noc-diagnostic-portal">
          <span className="section-mini-tag">Live Interface</span>
          <h2 className="section-subtitle">Real-Time Core Connection Matrix</h2>
          
          <div className="diagnostic-grid">
            
            {/* Terminal Screen Console */}
            <div className="diagnostic-terminal">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <div className="terminal-title">noc-core-console@nctu.edu.eg</div>
              </div>
              <div className="terminal-body">
                {terminalLog.map((log, index) => (
                  <div key={index} className="terminal-line">{log}</div>
                ))}
                {diagnosticsRunning && (
                  <div className="diagnostic-progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    <span className="progress-number">{progress}% Diagnostic Checks</span>
                  </div>
                )}
              </div>
              <div className="terminal-footer">
                <button 
                  className={`terminal-btn ${diagnosticsRunning ? 'disabled' : ''}`}
                  onClick={runDiagnostics}
                  disabled={diagnosticsRunning}
                >
                  {diagnosticsRunning ? '⌛ Running checks...' : '⚙️ Run Full Diagnostics'}
                </button>
              </div>
            </div>

            {/* Live Connection Table */}
            <div className="live-sites-panel">
              <h3>Direct Spokegate Handshakes</h3>
              <div className="sites-list">
                {nocSites.map(site => (
                  <div key={site.id} className="site-row">
                    <div className="site-meta">
                      <span className="site-indicator status-online"></span>
                      <div>
                        <h4>{site.name}</h4>
                        <code>IP: {site.ip}</code>
                      </div>
                    </div>
                    <div className="site-stats">
                      <span className="stat-label">Latency</span>
                      <span className="stat-value">{site.ping}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ======== FORMAL COMMUNICATION CHANNELS ======== */}
        <section className="contact-channels">
          <h2 className="section-subtitle">Formal Communication Channels</h2>
          <div className="notice-box">
            <strong>⚠️ Important Notice:</strong> The contact channels listed below are strictly reserved for authorized IT administrators, network engineers, telecom supervisors, and campus technicians representing connected universities. Students and faculty members experiencing local connectivity issues should contact their campus-specific IT helpdesk.
          </div>

          <div className="channels-grid">
            <div className="channel-card" ref={addToCards}>
              <div className="channel-icon">🏢</div>
              <h3>Physical Address</h3>
              <p>Building C, Advanced Infrastructure Zone, Sector 5, New Cairo Technological University, New Cairo, Egypt.</p>
            </div>
            <div className="channel-card" ref={addToCards}>
              <div className="channel-icon">📞</div>
              <h3>NOC Direct Operations Hotline</h3>
              <p>Internal VPN Routing Only</p>
            </div>
            <div className="channel-card" ref={addToCards}>
              <div className="channel-icon">📟</div>
              <h3>Central Enterprise IP PBX Extension</h3>
              <p><code>1000</code> — Directly dialable from any connected Panasonic desk phone across Egypt</p>
            </div>
            <div className="channel-card" ref={addToCards}>
              <div className="channel-icon">📧</div>
              <h3>Primary Infrastructure Support Email</h3>
              <p>noc-infrastructure@nct.edu.eg</p>
            </div>
            <div className="channel-card" ref={addToCards}>
              <div className="channel-icon">🛡️</div>
              <h3>Security & Firewall Incident Escalation</h3>
              <p>security-response@nct.edu.eg</p>
            </div>
          </div>
        </section>

        {/* ======== SOP SECTION ======== */}
        <section className="sop-section">
          <h2 className="section-subtitle">Standard Operating Procedures (SOP) for Support Tickets</h2>
          <p className="sop-intro">When submitting a technical request, infrastructure modification, or incident report to the Central NOC, university IT teams must adhere to the following ticketing template:</p>
          <div className="ticket-template">
            <div className="template-header">SUBJECT: [VPN-INCIDENT] - [University Name] - [Equipment Model] - [Severity Level]</div>
            <div className="template-body">
              <p><strong>1.</strong> Impacted Institution: <span>(e.g., Misr International Technological University)</span></p>
              <p><strong>2.</strong> Device Model & Hostname: <span>(e.g., Huawei USG6000E - Spoke Firewall 02)</span></p>
              <p><strong>3.</strong> Description of Issue: <span>(Provide detailed logs, traceroutes, or error codes)</span></p>
              <p><strong>4.</strong> Steps Taken to Troubleshoot: <span>(Detail any local reboots, port testing, or line checks)</span></p>
              <p><strong>5.</strong> Local IT Engineer Contact Info: <span>(Name, Extension, Mobile Number)</span></p>
            </div>
          </div>
        </section>

        {/* ======== SLA TABLE ======== */}
        <section className="sla-section">
          <h2 className="section-subtitle">Service Level Agreement (SLA) & Escalation Matrix</h2>
          <div className="sla-table-wrapper">
            <table className="sla-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Impact</th>
                  <th>Response</th>
                  <th>Resolution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="severity sev-1">Severity 1</span></td>
                  <td>Core VPN tunnel disconnect, primary firewall crash, or complete campus network loss.</td>
                  <td>&lt; 15 Min</td>
                  <td>&lt; 1 Hour</td>
                </tr>
                <tr>
                  <td><span className="severity sev-2">Severity 2</span></td>
                  <td>Primary fiber cut causing 4G/LTE fallback, partial IP-PBX failure, or DB replication sync issues.</td>
                  <td>30 Min</td>
                  <td>&lt; 4 Hours</td>
                </tr>
                <tr>
                  <td><span className="severity sev-3">Severity 3</span></td>
                  <td>Localized switch port downtime, VLAN misconfiguration, or non-emergency port forwarding.</td>
                  <td>2 Hours</td>
                  <td>&lt; 12 Hours</td>
                </tr>
                <tr>
                  <td><span className="severity sev-4">Severity 4</span></td>
                  <td>New IP expansion pools, firmware update scheduling, or unmanaged hardware expansions.</td>
                  <td>24 Hours</td>
                  <td>48 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Animation Components */}
        <ScrollTube />

        {/* ======== CTA ACTION SECTION ======== */}
        <section className="cta-section">
          <h2>Ready to connect your institution?</h2>
          <a href="mailto:noc-infrastructure@nct.edu.eg" className="cta-btn">Contact the NOC</a>
        </section>

      </div>
    </div>
  );
};

export default Contact;

