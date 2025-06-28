import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import RegisterForm from "../../components/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = ({ onNavigateToLanding, onNavigateToRegister, onNavigateToEntradas, onNavigateToLogin }) => {
  return (
    <div className={styles.registerPageContainer}>
      {/* Navbar at the top */}
      <Navbar
        onNavigateToLanding={onNavigateToLanding}
        onNavigateToRegister={onNavigateToRegister}
        onNavigateToEntradas={onNavigateToEntradas}
        onNavigateToLogin={onNavigateToLogin}
      />
      {/* Main content area */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <div className={styles.brandIcon}>
              <svg
                className={styles.brandSvg}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM12 4.1L20 8.13V10C20 15.45 16.4 19.25 12 20C7.6 19.25 4 15.45 4 10V8.13L12 4.1Z" />
                <path d="M12 6L8 8V12C8 14.21 9.79 16 12 16S16 14.21 16 12V8L12 6Z" />
              </svg>
            </div>
            <h1 className={styles.welcomeTitle}>Únete a Tickersale</h1>
            <p className={styles.welcomeSubtitle}>
              Crea tu cuenta y comienza a gestionar tus eventos de forma
              profesional
            </p>
          </div>

          {/* Register Form Section */}
          <div className={styles.formSection}>
            <RegisterForm
              onRegisterSuccess={(user) => {
                console.log("Registration successful:", user);
                // Navigate to landing page after successful registration
                if (onNavigateToLanding) {
                  setTimeout(() => {
                    onNavigateToLanding();
                  }, 1000); // Small delay to show success state
                }
              }}
              onNavigateToLogin={onNavigateToLogin}
            />
          </div>

          {/* Additional Information */}
          <div className={styles.additionalInfo}>
            {/* Security Notice */}
            <div className={styles.securityNotice}>
              <div className={styles.securityIcon}>
                <svg
                  className={styles.securitySvg}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3M16,16H13V18H11V16H8L12,12L16,16Z" />
                </svg>
              </div>
              <p className={styles.securityText}>
                Su información está protegida con encriptación de nivel bancario
              </p>
            </div>

            {/* Features Highlight */}
            <div className={styles.featuresHighlight}>
              <h3 className={styles.featuresTitle}>
                ¿Por qué elegir Tickersale?
              </h3>
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg
                      className={styles.featureSvg}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V17H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>
                      Seguridad Garantizada
                    </h4>
                    <p className={styles.featureDescription}>
                      Protección total de datos personales y financieros
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg
                      className={styles.featureSvg}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13C13.6,14 14,13.6 14,13V10C14,9.4 13.6,9 13,9H9V7H13V6H11V5H9V6H8V7H9V9H8V10H8V11H9V13H8V14H9V15H8V16H9V17H11Z" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>Gestión Eficiente</h4>
                    <p className={styles.featureDescription}>
                      Herramientas profesionales para eventos exitosos
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg
                      className={styles.featureSvg}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>Soporte 24/7</h4>
                    <p className={styles.featureDescription}>
                      Asistencia técnica disponible en todo momento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Links Section */}
          <div className={styles.additionalLinksSection}>
            {/* Back to Home Link */}
            {onNavigateToLanding && (
              <p className={styles.backToHomePrompt}>
                <a
                  href="#home"
                  className={styles.backToHomeLink}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToLanding();
                  }}
                >
                  ← Volver al inicio
                </a>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default RegisterPage;
