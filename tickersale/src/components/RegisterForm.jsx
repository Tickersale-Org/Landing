import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength validation
  const validatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const issues = [];

    if (password.length < minLength) {
      issues.push(`mínimo ${minLength} caracteres`);
    }
    if (!hasUpperCase) {
      issues.push("una letra mayúscula");
    }
    if (!hasLowerCase) {
      issues.push("una letra minúscula");
    }
    if (!hasNumbers) {
      issues.push("un número");
    }
    if (!hasSpecialChar) {
      issues.push("un carácter especial");
    }

    return {
      isValid: issues.length === 0,
      issues: issues,
      strength:
        issues.length === 0 ? "fuerte" : issues.length <= 2 ? "media" : "débil",
    };
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear auth error when user makes changes
    if (authError) {
      setAuthError("");
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    } else if (formData.username.trim().length < 3) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 3 caracteres";
    } else if (formData.username.trim().length > 20) {
      newErrors.username =
        "El nombre de usuario no puede tener más de 20 caracteres";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username.trim())) {
      newErrors.username =
        "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else {
      const passwordValidation = validatePasswordStrength(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = `La contraseña debe contener: ${passwordValidation.issues.join(", ")}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAuthError("");

    try {
      // Simulate API call for registration
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate registration logic - check if email already exists
          if (formData.email === "existing@example.com") {
            reject(new Error("Esta dirección de email ya está registrada"));
          } else if (formData.username === "existinguser") {
            reject(new Error("Este nombre de usuario ya está en uso"));
          } else {
            resolve();
          }
        }, 1500);
      });

      // Success - create user data and login
      const userData = {
        email: formData.email,
        name: formData.username,
        username: formData.username,
        provider: "email",
        verified: false, // Usually email verification is needed
      };

      const loginResult = login(userData);

      if (loginResult.success) {
        console.log("Registration successful:", loginResult.user);

        // Reset form
        setFormData({ username: "", email: "", password: "" });

        // Call success callback if provided
        if (onRegisterSuccess) {
          onRegisterSuccess(loginResult.user);
        }
      } else {
        throw new Error(loginResult.error || "Error al registrar la cuenta");
      }
    } catch (error) {
      setAuthError(
        error.message || "Error al registrar la cuenta. Intente nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Google login success
  const handleGoogleSuccess = (user) => {
    console.log("Google registration successful:", user);

    // Create user data for AuthContext
    const userData = {
      ...user,
      provider: "google",
      verified: true,
    };

    const loginResult = login(userData);

    if (loginResult.success) {
      setAuthError("");

      // Reset any existing form errors
      setErrors({});
      setFormData({ username: "", email: "", password: "" });

      // Call success callback if provided
      if (onRegisterSuccess) {
        onRegisterSuccess(loginResult.user);
      }
    } else {
      setAuthError(loginResult.error || "Error al registrarse con Google");
    }
  };

  // Handle Google login error
  const handleGoogleError = (error) => {
    console.error("Google registration error:", error);
    setAuthError(
      error || "Error al registrarse con Google. Intente nuevamente.",
    );

    // Clear any existing form errors
    setErrors({});
  };

  // Get password strength indicator
  const getPasswordStrengthIndicator = () => {
    if (!formData.password) return null;

    const validation = validatePasswordStrength(formData.password);
    const strengthClass =
      validation.strength === "fuerte"
        ? "strong"
        : validation.strength === "media"
          ? "medium"
          : "weak";

    return (
      <div className={styles.passwordStrengthIndicator}>
        <div className={`${styles.strengthBar} ${styles[strengthClass]}`}>
          <div className={styles.strengthFill}></div>
        </div>
        <span className={`${styles.strengthText} ${styles[strengthClass]}`}>
          Seguridad: {validation.strength}
        </span>
      </div>
    );
  };

  // Eye icon for password visibility toggle
  const EyeIcon = () => (
    <svg
      className={styles.eyeIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      className={styles.eyeIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );

  return (
    <div className={styles.registerFormContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Crear Cuenta</h2>
          <p className={styles.formSubtitle}>
            Complete los datos para crear su nueva cuenta
          </p>
        </div>

        {/* Auth Error Message */}
        {authError && (
          <div className={styles.authError} role="alert">
            {authError}
          </div>
        )}

        {/* Google Registration Button */}
        <div className={styles.googleLoginSection}>
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            disabled={isLoading}
            buttonText="Registrarse con Google"
          />
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>o registrarse con email</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Username Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
            placeholder="ejemplo_usuario"
            disabled={isLoading}
            autoComplete="username"
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <span
              id="username-error"
              className={styles.errorMessage}
              role="alert"
            >
              {errors.username}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="ejemplo@correo.com"
            disabled={isLoading}
            autoComplete="email"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${styles.input} ${styles.passwordInput} ${
                errors.password ? styles.inputError : ""
              }`}
              placeholder="Cree una contraseña segura"
              disabled={isLoading}
              autoComplete="new-password"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              className={styles.togglePasswordButton}
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {getPasswordStrengthIndicator()}

          {errors.password && (
            <span
              id="password-error"
              className={styles.errorMessage}
              role="alert"
            >
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`${styles.submitButton} ${isLoading ? styles.loading : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loadingContent}>
              <span className={styles.spinner}></span>
              Creando cuenta...
            </span>
          ) : (
            "Crear Cuenta"
          )}
        </button>

        {/* Login Link */}
        <div className={styles.loginLinkSection}>
          <p className={styles.loginPrompt}>
            ¿Ya tienes una cuenta?{" "}
            <a
              href="#login"
              className={styles.loginLink}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToLogin) {
                  onNavigateToLogin();
                } else {
                  console.log("Navigate to login");
                }
              }}
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>

        {/* Terms and Privacy Notice */}
        <div className={styles.termsNotice}>
          <p className={styles.termsText}>
            Al crear una cuenta, acepta nuestros{" "}
            <a
              href="#terms"
              className={styles.termsLink}
              onClick={(e) => {
                e.preventDefault();
                console.log("Terms and conditions clicked");
              }}
            >
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a
              href="#privacy"
              className={styles.termsLink}
              onClick={(e) => {
                e.preventDefault();
                console.log("Privacy policy clicked");
              }}
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
