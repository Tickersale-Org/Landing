import styles from './TicketModal.module.css';

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const ahorro = ticket.originalPrice > ticket.price
    ? (ticket.originalPrice - ticket.price)
    : 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                className={styles.closeSvg}
                aria-hidden="true"
            >
                <line x1="4" y1="4" x2="16" y2="16" stroke="#273368" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="16" y1="4" x2="4" y2="16" stroke="#273368" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
        </button>
        <div className={styles.header}>
          <h2 className={styles.title}>{ticket.eventName}</h2>
          {ticket.isVerified && (
            <span className={styles.verified}>✔ Verificado</span>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.divider}></div>
        <ul className={styles.infoList}>
            <li>
                <span className={styles.infoLabel}>Fecha:</span>
                <span className={styles.infoValue}>{ticket.date}</span>
            </li>
            <li>
                <span className={styles.infoLabel}>Lugar:</span>
                <span className={styles.infoValue}>{ticket.venue}</span>
            </li>
            <li>
                <span className={styles.infoLabel}>Zona:</span>
                <span className={styles.infoValue}>
                {ticket.section} {ticket.seat !== 'N/A' && `- ${ticket.seat}`}
                </span>
            </li>
            <li>
                <span className={styles.infoLabel}>Vendedor:</span>
                <span className={styles.infoValue}>{ticket.seller}</span>
            </li>
            <li>
                <span className={styles.infoLabel}>Publicado:</span>
                <span className={styles.infoValue}>{ticket.publishedAt}</span>
            </li>
            <li>
                <span className={styles.infoLabel}>Stock:</span>
                <span className={styles.infoValue}>{ticket.stock}</span>
            </li>     
        </ul>
          <div className={styles.priceRow}>
            <span className={styles.priceValue}>S/ {ticket.price}</span>
            {ahorro > 0 && (
              <span className={styles.ahorro}>Ahorra S/ {ahorro}</span>
            )}
          </div>
          <button className={styles.buyDemoBtn} disabled>
            Comprar entrada (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
