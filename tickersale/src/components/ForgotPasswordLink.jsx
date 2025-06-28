import { useState } from "react";
import styles from "./ForgotPasswordLink.module.css";

const ForgotPasswordLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Open modal handler
  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsSuccess(false);
    setError("");
    setEmail("");
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setError("");
    setEmail("");
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setError("Por favor ingrese su email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un email válido");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call for password reset
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful password reset request
          if (email.includes("@")) {
            resolve();
          } else {
            reject(new Error("Error al enviar el email"));
          }
        }, 1500);
      });

      setIsSuccess(true);
      console.log("Password reset email sent to:", email);
    } catch (err) {
      setError(err.message || "Error al enviar el email. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  // Success checkmark icon
  const CheckIcon = () => (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill="currentColor"
      />
    </svg>
  );

  // Close icon
  const CloseIcon = () => (
    <svg
      className={styles.closeIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      {/* Forgot Password Link */}
      <a
        href="#forgot-password"
        className={styles.forgotPasswordLink}
        onClick={handleLinkClick}
      >
        ¿Olvidaste tu contraseña?
      </a>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <div className={styles.modalContent}>
            {/* Close button */}
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              <CloseIcon />
            </button>

            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 id="modal-title" className={styles.modalTitle}>
                Recuperar Contraseña
              </h2>
              <p className={styles.modalSubtitle}>
                Ingresa tu email y te enviaremos un enlace para restablecer tu
                contraseña
              </p>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className={styles.successContent}>
                <div className={styles.successIcon}>
                  <CheckIcon />
                </div>
                <h3 className={styles.successTitle}>¡Email Enviado!</h3>
                <p className={styles.successMessage}>
                  Hemos enviado un enlace de recuperación a{" "}
                  <strong>{email}</strong>
                </p>
                <p className={styles.successInstructions}>
                  Revisa tu bandeja de entrada y sigue las instrucciones para
                  restablecer tu contraseña.
                </p>
                <button className={styles.successButton} onClick={closeModal}>
                  Entendido
                </button>
              </div>
            ) : (
              /* Form State */
              <form className={styles.modalForm} onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && (
                  <div className={styles.errorMessage} role="alert">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="reset-email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`${styles.input} ${error ? styles.inputError : ""}`}
                    placeholder="ejemplo@correo.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                {/* Action Buttons */}
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingContent}>
                        <span className={styles.spinner}></span>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar Email"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordLink;
