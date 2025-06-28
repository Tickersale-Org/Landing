import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../UserMenu";
import styles from "./Navbar.module.css";

const Navbar = ({ onNavigateToLogin, onNavigateToLanding, onNavigateToEntradas }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Don't render anything while loading authentication state
  if (isLoading) {
    return (
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          {/* Logo */}
          <a
            href="#"
            className={styles.logo}
            onClick={(e) => e.preventDefault()}
          >
            <svg
              className={styles.logoIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM12 4.1L20 8.13V10C20 15.45 16.4 19.25 12 20C7.6 19.25 4 15.45 4 10V8.13L12 4.1Z" />
              <path d="M12 6L8 8V12C8 14.21 9.79 16 12 16S16 14.21 16 12V8L12 6Z" />
            </svg>
            Tickersale
          </a>

          {/* Loading placeholder for auth section */}
          <div className={styles.authSection}>
            <div className={styles.authLoading}></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#" className={styles.logo} onClick={(e) => e.preventDefault()}>
          <svg
            className={styles.logoIcon}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM12 4.1L20 8.13V10C20 15.45 16.4 19.25 12 20C7.6 19.25 4 15.45 4 10V8.13L12 4.1Z" />
            <path d="M12 6L8 8V12C8 14.21 9.79 16 12 16S16 14.21 16 12V8L12 6Z" />
          </svg>
          Tickersale
        </a>

        {/* Desktop Menu */}
        <ul className={styles.desktopMenu}>
          <li>
            <a
              href="#inicio"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToLanding) onNavigateToLanding();
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#entradas"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToEntradas) onNavigateToEntradas();
              }}
            >
              Entradas
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className={styles.navLink}
              onClick={(e) => e.preventDefault()}
            >
              Contacto
            </a>
          </li>

          {/* Authentication Section */}
          <li className={styles.authSection}>
            {isAuthenticated ? (
              <UserMenu onNavigateToLanding={onNavigateToLanding} />
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => {
                  if (onNavigateToLogin) {
                    onNavigateToLogin();
                  } else {
                    console.log("Navigation function not provided");
                  }
                }}
              >
                Iniciar sesión
              </button>
            )}
          </li>
        </ul>

        {/* Hamburger Menu */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <ul className={styles.mobileMenuList}>
          <li>
            <a
              href="#inicio"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToLanding) onNavigateToLanding();
                handleLinkClick();
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#entradas"
              className={styles.mobileNavLink}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToEntradas) onNavigateToEntradas();
                handleLinkClick();
              }}
            >
              Entradas
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className={styles.mobileNavLink}
              onClick={handleLinkClick}
            >
              Contacto
            </a>
          </li>

          {/* Mobile Authentication Section */}
          <li className={styles.mobileAuthSection}>
            {isAuthenticated ? (
              <div className={styles.mobileUserSection}>
                <UserMenu onNavigateToLanding={onNavigateToLanding} />
              </div>
            ) : (
              <button
                className={styles.mobileLoginButton}
                onClick={() => {
                  if (onNavigateToLogin) {
                    onNavigateToLogin();
                  } else {
                    console.log("Navigation function not provided");
                  }
                  handleLinkClick();
                }}
              >
                Iniciar sesión
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
