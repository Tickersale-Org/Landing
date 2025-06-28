import styles from "./Testimonials.module.css";

const Testimonials = () => {
  // Icono de comillas SVG
  const QuoteIcon = () => (
    <svg className={styles.quoteIconSvg} viewBox="0 0 24 24">
      <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>
  );

  // Icono de estrella SVG
  const StarIcon = () => (
    <svg className={styles.star} viewBox="0 0 24 24">
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
    </svg>
  );

  // Datos de testimonios
  const testimonialsData = [
    {
      id: 1,
      text: "Increíble experiencia comprando entradas. El proceso fue súper rápido y seguro. Pude conseguir entradas para el concierto que quería sin ningún problema.",
      userName: "María González",
      userRole: "Compradora frecuente",
      avatar: "MG",
      rating: 5,
    },
    {
      id: 2,
      text: "Como vendedor, me encanta la transparencia de la plataforma. Las comisiones son claras y el sistema de pagos es muy confiable. Definitivamente seguiré usando Tickersale.",
      userName: "Carlos Mendoza",
      userRole: "Vendedor verificado",
      avatar: "CM",
      rating: 5,
    },
    {
      id: 3,
      text: "La mejor plataforma para reventa de entradas. Sin estafas, sin sorpresas. Todo muy claro desde el principio. Ya he comprado varias entradas aquí.",
      userName: "Ana Rodríguez",
      userRole: "Cliente satisfecha",
      avatar: "AR",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} style={{ opacity: index < rating ? 1 : 0.3 }} />
    ));
  };

  return (
    <section className={styles.testimonials}>
      {/* Elementos decorativos flotantes */}
      <div className={styles.floatingQuote}>"</div>
      <div className={styles.floatingQuote}>"</div>

      <div className={styles.container}>
        {/* Header de la sección */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>Testimonios</span>

          <h2 className={styles.title}>Lo que dicen nuestros usuarios</h2>

          <p className={styles.subtitle}>
            Miles de usuarios confían en Tickersale para comprar y vender
            entradas. Descubre por qué nuestra comunidad está tan satisfecha con
            nuestro servicio.
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className={styles.grid}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              {/* Icono de comillas */}
              <div className={styles.quoteIcon}>
                <QuoteIcon />
              </div>

              {/* Texto del testimonio */}
              <p className={styles.testimonialText}>"{testimonial.text}"</p>

              {/* Información del usuario */}
              <div className={styles.userInfo}>
                <div className={styles.avatar}>{testimonial.avatar}</div>

                <div className={styles.userDetails}>
                  <div className={styles.userName}>{testimonial.userName}</div>
                  <div className={styles.userRole}>{testimonial.userRole}</div>
                  <div className={styles.rating}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
