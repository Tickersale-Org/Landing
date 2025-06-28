import styles from './TicketCard.module.css';

export default function TicketCard({ ticket, onPreview }) {
  const ahorro = ticket.originalPrice > ticket.price
    ? (ticket.originalPrice - ticket.price)
    : 0;

  return (
    <div
      className={styles.card}
      tabIndex={0}
      onClick={onPreview}
      title="Haz click para ver detalles"
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.event}>{ticket.eventName}</span>
        {ticket.isVerified && <span className={styles.verified}>✔ Verificado</span>}
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{ticket.date}</span>
        <span className={styles.section}>{ticket.section} {ticket.seat !== 'N/A' && `- ${ticket.seat}`}</span>
      </div>

      {/* Datos del evento */}
      <div className={styles.venue}>{ticket.venue}</div>

      {/* Reventa info */}
      <div className={styles.sellerInfo}>
        <span className={styles.seller}>Vende: <b>{ticket.seller}</b></span>
        <span className={styles.published}>Publicado: {ticket.publishedAt}</span>
      </div>

      {/* Estado y stock */}
      <div className={styles.badges}>
        <span className={styles.stock}>Stock: {ticket.stock}</span>
        {ahorro > 0 && (
          <span className={styles.ahorro}>Ahorra S/ {ahorro}</span>
        )}
      </div>

      {/* Precio y acción */}
      <div className={styles.footer}>
        <span className={styles.price}>S/ {ticket.price}</span>
        <button
          className={styles.buyButton}
          disabled
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
