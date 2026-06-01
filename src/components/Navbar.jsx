import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const hamburgerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!navbarRef.current || !logoRef.current) return;
        
        // Only run entrance animation once on initial mount
        if (hasAnimated.current) {
            // Ensure navbar is visible if animation already ran
            gsap.set(navbarRef.current, { opacity: 1, y: 0, filter: 'blur(0px)' });
            gsap.set(logoRef.current, { opacity: 1, x: 0, scale: 1 });
            return;
        }
        
        hasAnimated.current = true;

        const tl = gsap.timeline();
        gsap.set(navbarRef.current, { opacity: 0, y: -100, filter: 'blur(10px)' });
        gsap.set(logoRef.current, { opacity: 0, x: -50, scale: 0.5 });
        tl.to(navbarRef.current, {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'elastic.out(1, 0.5)',
        }).to(logoRef.current, {
            opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)',
        }, '-=0.4');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.pageYOffset;
            setIsScrolled(scrollY > 50);
            setIsCollapsed(scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (path) => { navigate(path); setIsMenuOpen(false); };

    return (
        <nav
            className={`navbar ${isCollapsed ? 'collapsed' : ''} ${isScrolled ? 'scrolled' : ''}`}
            ref={navbarRef}
        >
            <div className="navbar-container">
                <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }} ref={logoRef}>
                    <span className="logo-text">NCTU</span>
                </a>

                <div className={`nav-user-menu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="nav-menu-items">
                        <button className="nav-menu-item" onClick={() => handleNavigation('/')}>
                            Home
                        </button>
                        <button className="nav-menu-item" onClick={() => handleNavigation('/about')}>
                            About
                        </button>
                        <button className="nav-menu-item" onClick={() => handleNavigation('/contact')}>
                            Contact
                        </button>
                        <button className="nav-menu-item" onClick={() => handleNavigation('/services')}>
                            Services
                        </button>
                    </div>
                </div>

                <button
                    className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    ref={hamburgerRef}
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="hamburger-icon" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
