import styles from "./Hero.module.css";
import heroIllustration from "../assets/hero-ilustracion.svg";


const Hero = () => {
  // Iconos decorativos
  const TicketIcon = () => (
    <svg className={styles.iconSvg} viewBox="0 0 24 24">
      <path d="M2 9a1 1 0 0 0 0 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a1 1 0 1 0 0-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2zm2.8 0a3.001 3.001 0 0 0 5.4 0h5.6a3.001 3.001 0 0 0 5.4 0V7H4.8v2zM20 13H4v-2h16v2z" />
    </svg>
  );

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.container}>
        {/* Columna izquierda */}
        <div className={styles.content}>
          <h1 className={`${styles.title} ${styles.fadeInUp}`}>
            Tickersale
          </h1>
          <p className={`${styles.subtitle} ${styles.fadeInUp}`}>
            Plataforma conceptual para revolucionar la compra y venta de entradas
          </p>
          <p className={`${styles.description} ${styles.fadeInUp}`}>
            Este proyecto nace como una solución tecnológica segura, directa y transparente,
            eliminando intermediarios y fomentando una experiencia confiable entre compradores y vendedores.
          </p>
          <p className={`${styles.note} ${styles.fadeInUp}`}>
            Desliza para conocer sus características, interfaces clave y beneficios.
          </p>
        </div>

        {/* Columna derecha - Imagen ilustrativa */}
        <div className={styles.imageContainer}>
          <div className={styles.heroImage}>
            <img
              src={heroIllustration}
              alt="Ilustración de entradas"
              className={styles.image}
            />
            <div className={styles.imageCaption}>
              <TicketIcon />
              <span>Tu marketplace de entradas de confianza</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
