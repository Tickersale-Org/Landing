import styles from "./Features.module.css";
import FeatureCard from "./FeatureCard";

const Features = () => {
  // Iconos SVG para las características
  const SecureIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 17C10.67 17 9.67 16.33 9 15.67C9.33 14.67 10.67 14 12 14C13.33 14 14.67 14.67 15 15.67C14.33 16.33 13.33 17 12 17Z" />
    </svg>
  );

  const FastIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13,1L8.5,5.5L10,7L12,5L17,10L15,12L16.5,13.5L21,9L13,1M4,7L2,9L7,14L4,17L6,19L9,16L14,21L16,19L13,16L18,11L20,13L22,11L17,6L15,8L12,5L4,7Z" />
    </svg>
  );

  const TransparentIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
    </svg>
  );

  const handleFeatureClick = (featureName) => {
    console.log(`Feature clicked: ${featureName}`);
    // Aquí puedes agregar lógica adicional como analytics, navegación, etc.
  };

  const handleLearnMoreClick = () => {
    console.log("Learn more about features clicked");
    // Navegación a página de detalles o sección específica
  };

  const featuresData = [
    {
      icon: <SecureIcon />,
      title: "Transacciones Seguras",
      description:
        "Sistema de pagos protegido con encriptación de extremo a extremo. Tu dinero y datos están completamente seguros en cada transacción.",
      variant: "variant1",
    },
    {
      icon: <FastIcon />,
      title: "Proceso Rápido",
      description:
        "Compra y vende entradas en minutos. Nuestro sistema optimizado hace que el proceso sea rápido y sin complicaciones.",
      variant: "variant2",
    },
    {
      icon: <TransparentIcon />,
      title: "Transparencia Total",
      description:
        "Sin cargos ocultos ni sorpresas. Precios claros, comisiones transparentes y total visibilidad en cada paso del proceso.",
      variant: "variant3",
    },
  ];

  return (
    <section className={styles.features}>
      {/* Elemento decorativo de fondo */}
      <div className={styles.decorativeBackground}></div>

      <div className={styles.container}>
        {/* Header de la sección */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>¿Por qué Tickersale?</span>

          <h2 className={styles.title}>
            La plataforma que transforma la compra de entradas
          </h2>

          <p className={styles.subtitle}>
            Conectamos compradores y vendedores de manera segura, rápida y
            transparente. Descubre por qué miles de usuarios confían en nosotros
            para sus eventos favoritos.
          </p>
        </div>

        {/* Grid de características */}
        <div className={styles.grid}>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant}
              onClick={() => handleFeatureClick(feature.title)}
            />
          ))}
        </div>

        {/* Información adicional */}
        <div className={styles.additionalInfo}>
          <h3 className={styles.infoTitle}>
            ¿Quieres saber más sobre nuestro proceso?
          </h3>

          <p className={styles.infoDescription}>
            Descubre cómo funciona nuestro sistema de verificación de entradas,
            las medidas de seguridad que implementamos y todo lo que necesitas
            saber para comprar y vender con total confianza.
          </p>

          <button className={styles.infoButton} onClick={handleLearnMoreClick}>
            Conoce más detalles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
