import { useState, useEffect } from "react";
import ContactModal from "../ContactModal"; 
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false); // nuevo

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setIsMenuOpen(false);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          {/* Logo */}
          <button onClick={() => scrollToSection("inicio")} className={styles.logo}>
            <svg className={styles.logoIcon} viewBox="0 0 24 24">
              <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM12 4.1L20 8.13V10C20 15.45 16.4 19.25 12 20C7.6 19.25 4 15.45 4 10V8.13L12 4.1Z" />
              <path d="M12 6L8 8V12C8 14.21 9.79 16 12 16S16 14.21 16 12V8L12 6Z" />
            </svg>
            Tickersale
          </button>

          {/* Menú escritorio */}
          <ul className={styles.desktopMenu}>
            <li><button onClick={() => scrollToSection("inicio")} className={styles.navLink}>Inicio</button></li>
            <li><button onClick={() => scrollToSection("caracteristicas")} className={styles.navLink}>Características</button></li>
            <li><button onClick={() => scrollToSection("como-funciona")} className={styles.navLink}>Cómo funciona</button></li>
            <li><button onClick={handleOpenModal} className={styles.navLink}>Contacto</button></li>
          </ul>

          {/* Menú hamburguesa */}
          <button className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Menú móvil */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.mobileMenuList}>
            <li><button onClick={() => scrollToSection("inicio")} className={styles.mobileNavLink}>Inicio</button></li>
            <li><button onClick={() => scrollToSection("caracteristicas")} className={styles.mobileNavLink}>Características</button></li>
            <li><button onClick={() => scrollToSection("como-funciona")} className={styles.mobileNavLink}>Cómo funciona</button></li>
            <li><button onClick={handleOpenModal} className={styles.mobileNavLink}>Contacto</button></li>
          </ul>
        </div>
      </nav>

      {/* Modal de contacto */}
      <ContactModal isOpen={showModal} onClose={handleCloseModal} />
    </>
  );
};

export default Navbar;
