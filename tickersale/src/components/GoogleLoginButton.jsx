import { useState } from "react";
import styles from "./GoogleLoginButton.module.css";

const GoogleLoginButton = ({ onSuccess, onError, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Google OAuth 2.0 configuration
  // En producción, estos valores deben estar en variables de entorno
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Reemplazar con tu Client ID real
  const REDIRECT_URI = window.location.origin + "/auth/google/callback";

  // Google OAuth 2.0 URL
  const getGoogleAuthUrl = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state: "google_oauth_state_" + Date.now(), // Para seguridad
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Handle Google login simulation
  const handleGoogleLogin = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      // MÉTODO 1: Redirección directa (comentado para demo)
      // window.location.href = getGoogleAuthUrl();

      // MÉTODO 2: Popup window (comentado para demo)
      // const popup = window.open(
      //   getGoogleAuthUrl(),
      //   "google-login",
      //   "width=500,height=600,scrollbars=yes,resizable=yes"
      // );

      // MÉTODO 3: Simulación para demo (REMOVER EN PRODUCCIÓN)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simular respuesta exitosa de Google
          const mockGoogleUser = {
            id: "google_123456789",
            email: "usuario@gmail.com",
            name: "Usuario Demo",
            picture: "https://via.placeholder.com/100",
            verified_email: true,
            given_name: "Usuario",
            family_name: "Demo",
            locale: "es",
          };

          // Simular éxito/falla aleatoria para demo
          if (Math.random() > 0.2) {
            // 80% éxito
            resolve(mockGoogleUser);
          } else {
            reject(new Error("Error de autenticación con Google"));
          }
        }, 2000);
      })
        .then((user) => {
          console.log("Google login successful:", user);
          if (onSuccess) {
            onSuccess(user);
          }
        })
        .catch((error) => {
          console.error("Google login error:", error);
          if (onError) {
            onError(error.message || "Error al iniciar sesión con Google");
          }
        });

      // CÓDIGO REAL PARA PRODUCCIÓN:
      /*
      // Para implementación real, usa una de estas opciones:
      
      // OPCIÓN A: Google Identity Services (Recomendado)
      // 1. npm install google-auth-library
      // 2. Configurar en index.html: <script src="https://accounts.google.com/gsi/client" async defer></script>
      // 3. Usar google.accounts.id.initialize() y google.accounts.id.prompt()
      
      // OPCIÓN B: Librería externa
      // 1. npm install @google-cloud/local-auth google-auth-library
      // 2. Configurar OAuth 2.0 credentials en Google Cloud Console
      
      // OPCIÓN C: Implementación manual con fetch
      // 1. Configurar OAuth 2.0 en Google Cloud Console
      // 2. Manejar el flujo de autorización manualmente
      // 3. Intercambiar código por tokens
      */
    } catch (error) {
      console.error("Google login error:", error);
      if (onError) {
        onError(error.message || "Error al iniciar sesión con Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Google logo SVG (oficial)
  const GoogleLogo = () => (
    <svg
      className={styles.googleLogo}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <button
      type="button"
      className={`${styles.googleButton} ${isLoading ? styles.loading : ""} ${
        disabled ? styles.disabled : ""
      }`}
      onClick={handleGoogleLogin}
      disabled={disabled || isLoading}
      aria-label="Iniciar sesión con Google"
    >
      {isLoading ? (
        <span className={styles.loadingContent}>
          <span className={styles.spinner}></span>
          Conectando...
        </span>
      ) : (
        <span className={styles.buttonContent}>
          <GoogleLogo />
          Continuar con Google
        </span>
      )}
    </button>
  );
};

export default GoogleLoginButton;
