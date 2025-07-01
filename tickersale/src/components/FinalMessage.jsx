import styles from "./FinalMessage.module.css";

const FinalMessage = () => {
  return (
    <section className={styles.final}>
      <div className={styles.container}>
        <h2 className={styles.title}>¿Te interesa esta propuesta?</h2>
        <p className={styles.description}>
          Este proyecto fue desarrollado como una propuesta innovadora para facilitar la compra y venta de entradas. Si deseas conocer más sobre su funcionamiento o tienes sugerencias, estaré encantada de compartirte los detalles.
        </p>

        <div className={styles.buttonGroup}>
          <a href="#como-funciona" className={styles.secondaryButton}>
            Ver interfaces clave
          </a>
        </div>
      </div>
    </section>
  );
};
export default FinalMessage;
