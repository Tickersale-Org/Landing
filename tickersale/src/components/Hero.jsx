import styles from "./Hero.module.css";

const Hero = ({ onNavigateToRegister }) => {
  const handleCTAClick = () => {
    console.log("CTA clicked - redirecting to registration");
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      console.log("Navigation to register not provided");
    }
  };

  // Iconos SVG para elementos decorativos
  const TicketIcon = () => (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 9a1 1 0 0 0 0 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a1 1 0 1 0 0-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2zm2.8 0a3.001 3.001 0 0 0 5.4 0h5.6a3.001 3.001 0 0 0 5.4 0V7H4.8v2zM20 13H4v-2h16v2z" />
    </svg>
  );

  const StarIcon = () => (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" />
    </svg>
  );

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Contenido principal */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            La forma más segura de comprar entradas
          </h1>

          <p className={styles.subtitle}>
            Conectamos a vendedores y compradores de entradas de manera segura,
            transparente y sin intermediarios innecesarios. Tu entrada perfecta
            te está esperando.
          </p>

          <button className={styles.ctaButton} onClick={handleCTAClick}>
            Empezar ahora
          </button>

          {/* Estadísticas */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Entradas vendidas</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5K+</div>
              <div className={styles.statLabel}>Usuarios activos</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Área de imagen/ilustración */}
        <div className={styles.imageContainer}>
          {/* Imagen placeholder - puedes reemplazar con una imagen real */}
          <div
            className={styles.heroImage}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              fontSize: "1.2rem",
              color: "white",
              textAlign: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TicketIcon />
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Tickersale
              </div>
              <div style={{ opacity: 0.8 }}>
                Tu marketplace de entradas de confianza
              </div>
            </div>
          </div>

          {/* Elementos decorativos flotantes */}
          <div className={styles.decorativeElements}>
            <div className={styles.floatingIcon}>
              <TicketIcon />
            </div>
            <div className={styles.floatingIcon}>
              <StarIcon />
            </div>
            <div className={styles.floatingIcon}>
              <ShieldIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
