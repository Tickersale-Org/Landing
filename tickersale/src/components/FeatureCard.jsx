import styles from "./FeatureCard.module.css";

const FeatureCard = ({ icon, title, description, variant = "", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log(`${title} card clicked`);
    }
  };

  return (
    <div
      className={`${styles.card} ${variant ? styles[variant] : ""}`}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        <div className={styles.icon}>{icon}</div>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FeatureCard;
