import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm";
import ForgotPasswordLink from "../../components/ForgotPasswordLink";
import styles from "./LoginPage.module.css";

const LoginPage = ({ onNavigateToLanding, onNavigateToRegister, onNavigateToEntradas, onNavigateToLogin }) => {
  return (
    <div className={styles.loginPageContainer}>
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
            <h1 className={styles.welcomeTitle}>Bienvenido a Tickersale</h1>
            <p className={styles.welcomeSubtitle}>
              Accede a tu cuenta para gestionar tus tickets de forma segura
            </p>
          </div>

          {/* Login Form Section */}
          <div className={styles.formSection}>
            <LoginForm
              onLoginSuccess={() => {
                // Navigate to landing page after successful login
                if (onNavigateToLanding) {
                  setTimeout(() => {
                    onNavigateToLanding();
                  }, 1000); // Small delay to show success state
                }
              }}
            />

            {/* Forgot Password Link */}
            <div className={styles.forgotPasswordSection}>
              <ForgotPasswordLink />
            </div>
          </div>

          {/* Additional Links Section */}
          <div className={styles.additionalLinksSection}>
            <p className={styles.signupPrompt}>
              ¿No tienes una cuenta?{" "}
              <a
                href="#signup"
                className={styles.signupLink}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateToRegister) {
                    onNavigateToRegister();
                  } else {
                    console.log("Navigation to register page not provided");
                  }
                }}
              >
                Regístrate aquí
              </a>
            </p>

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
              Tu información está protegida con encriptación de nivel bancario
            </p>
          </div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default LoginPage;
