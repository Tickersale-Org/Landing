import styles from "./CallToAction.module.css";

const CallToAction = ({ onNavigateToRegister }) => {
  // Iconos SVG
  const RocketIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6L17,11H14V17H10V11H7L12,6Z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className={styles.featureIcon} viewBox="0 0 24 24">
      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className={styles.featureIcon} viewBox="0 0 24 24">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
    </svg>
  );

  const FastIcon = () => (
    <svg className={styles.featureIcon} viewBox="0 0 24 24">
      <path d="M13,1L8.5,5.5L10,7L12,5L17,10L15,12L16.5,13.5L21,9L13,1Z" />
    </svg>
  );

  const SupportIcon = () => (
    <svg className={styles.featureIcon} viewBox="0 0 24 24">
      <path d="M12,1C8.96,1 6.21,2.65 4.86,5.17C5.5,6.15 6.8,6.26 7.53,5.17C8.25,4.09 10.07,3.5 12,3.5C13.93,3.5 15.75,4.09 16.47,5.17C17.2,6.26 18.5,6.15 19.14,5.17C17.79,2.65 15.04,1 12,1M7,9A2,2 0 0,0 5,11A2,2 0 0,0 7,13A2,2 0 0,0 9,11A2,2 0 0,0 7,9M17,9A2,2 0 0,0 15,11A2,2 0 0,0 17,13A2,2 0 0,0 19,11A2,2 0 0,0 17,9M12,17.5C10.07,17.5 8.25,16.91 7.53,15.83C6.8,14.74 5.5,14.85 4.86,15.83C6.21,18.35 8.96,20 12,20C15.04,20 17.79,18.35 19.14,15.83C18.5,14.85 17.2,14.74 16.47,15.83C15.75,16.91 13.93,17.5 12,17.5Z" />
    </svg>
  );

  // Manejadores de eventos
  const handlePrimaryClick = () => {
    console.log("Primary CTA clicked - redirecting to registration");
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      console.log("Navigation to register not provided");
    }
  };

  const handleSecondaryClick = () => {
    console.log("Secondary CTA clicked - showing more info");
    // Aquí puedes agregar lógica para mostrar más información
  };

  // Características destacadas
  const features = [
    {
      icon: <CheckIcon />,
      text: "Sin comisiones ocultas",
    },
    {
      icon: <ShieldIcon />,
      text: "100% seguro y confiable",
    },
    {
      icon: <FastIcon />,
      text: "Proceso en minutos",
    },
    {
      icon: <SupportIcon />,
      text: "Soporte 24/7",
    },
  ];

  return (
    <section className={styles.cta}>
      {/* Elemento decorativo de fondo */}
      <div className={styles.decorativeBackground}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Icono principal */}
          <div className={styles.iconContainer}>
            <RocketIcon />
          </div>

          {/* Contenido principal */}
          <h2 className={styles.title}>¿Listo para empezar?</h2>

          <p className={styles.subtitle}>
            Únete a miles de usuarios que ya confían en Tickersale. Compra y
            vende entradas de manera segura, rápida y sin complicaciones. Tu
            próximo evento está a solo un clic de distancia.
          </p>

          {/* Botones de acción */}
          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryButton}
              onClick={handlePrimaryClick}
            >
              Crear cuenta gratis
            </button>

            <button
              className={styles.secondaryButton}
              onClick={handleSecondaryClick}
            >
              Ver cómo funciona
            </button>
          </div>

          {/* Características destacadas */}
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                {feature.icon}
                <span className={styles.featureText}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
