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

    useEffect(() => {
        if (!navbarRef.current || !logoRef.current) return;
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
