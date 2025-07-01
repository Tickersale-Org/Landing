import { useEffect } from "react";
import styles from "./ContactModal.module.css";

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>¿Quieres recibir noticias?</h2>
        <p>Déjanos tu correo y te avisaremos cuando Tickersale esté disponible.</p>
        <form className={styles.form}>
          <input type="email" placeholder="tuemail@ejemplo.com" required />
          <button type="submit">Suscribirme</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
