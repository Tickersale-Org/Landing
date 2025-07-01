# 🔐 Configuración de Google OAuth 2.0 para Tickersale

Esta guía te ayudará a implementar el inicio de sesión con Google en tu aplicación React + Vite.

## 📋 Tabla de Contenidos

1. [Configuración en Google Cloud Console](#configuración-en-google-cloud-console)
2. [Instalación de Dependencias](#instalación-de-dependencias)
3. [Configuración del Proyecto](#configuración-del-proyecto)
4. [Implementación Recomendada](#implementación-recomendada)
5. [Variables de Entorno](#variables-de-entorno)
6. [Seguridad y Mejores Prácticas](#seguridad-y-mejores-prácticas)
7. [Solución de Problemas](#solución-de-problemas)

---

## 🚀 Configuración en Google Cloud Console

### Paso 1: Crear un Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Identity API**

### Paso 2: Configurar OAuth 2.0

1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **OAuth 2.0 Client IDs**
3. Selecciona **Web application**
4. Configura:
   - **Name**: `Tickersale Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (desarrollo)
     - `https://tudominio.com` (producción)
   - **Authorized redirect URIs**:
     - `http://localhost:5173/auth/google/callback`
     - `https://tudominio.com/auth/google/callback`

### Paso 3: Obtener Credenciales

- Copia el **Client ID** y **Client Secret**
- Guárdalos de forma segura

---

## 📦 Instalación de Dependencias

### Opción A: Google Identity Services (Recomendada)

```bash
# No requiere dependencias adicionales
# Solo agrega el script en index.html
```

### Opción B: Librería de Google Auth

```bash
npm install google-auth-library
```

### Opción C: Librería de terceros

```bash
npm install @google-cloud/local-auth
# o
npm install react-google-login
```

---

## ⚙️ Configuración del Proyecto

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Google OAuth 2.0 Configuration
VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback

# En producción
# VITE_GOOGLE_REDIRECT_URI=https://tudominio.com/auth/google/callback
```

### 2. Actualizar index.html

Agrega el script de Google Identity Services:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Otros meta tags -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🔧 Implementación Recomendada

### Método 1: Google Identity Services (Más Moderno)

Actualiza `GoogleLoginButton.jsx`:

```javascript
import { useState, useEffect } from "react";
import styles from "./GoogleLoginButton.module.css";

const GoogleLoginButton = ({ onSuccess, onError, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    // Inicializar Google Identity Services
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      setIsGoogleLoaded(true);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    setIsLoading(true);
    try {
      // Decodificar JWT token
      const credential = response.credential;
      const payload = JSON.parse(atob(credential.split(".")[1]));

      // Enviar a tu backend para validación
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      if (result.ok) {
        const userData = await result.json();
        onSuccess(userData);
      } else {
        throw new Error("Error de autenticación");
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!isGoogleLoaded || disabled || isLoading) return;

    setIsLoading(true);
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        setIsLoading(false);
        onError("No se pudo mostrar el diálogo de Google");
      }
    });
  };

  // Resto del componente...
};
```

### Método 2: OAuth 2.0 Manual

Actualiza `GoogleLoginButton.jsx` para usar el flujo OAuth completo:

```javascript
const GoogleLoginButton = ({ onSuccess, onError, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getGoogleAuthUrl = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state: crypto.randomUUID(), // Para seguridad
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const handleGoogleLogin = () => {
    if (disabled || isLoading) return;

    // Redireccionar a Google
    window.location.href = getGoogleAuthUrl();
  };

  // Resto del componente...
};
```

---

## 🔐 Backend Integration

### Ejemplo de endpoint para validar el token:

```javascript
// /api/auth/google (Node.js/Express ejemplo)
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;

    // Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Crear o actualizar usuario en tu base de datos
    const user = await createOrUpdateUser({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });

    // Generar JWT token propio
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
});
```

---

## 🛡️ Seguridad y Mejores Prácticas

### 1. Variables de Entorno

- ✅ **NUNCA** expongas el Client Secret en el frontend
- ✅ Usa `VITE_` prefix para variables accesibles en Vite
- ✅ Diferentes credenciales para desarrollo y producción

### 2. Validación del Token

- ✅ Siempre valida tokens en el backend
- ✅ Verifica la audiencia (client_id)
- ✅ Implementa expiración de tokens

### 3. HTTPS

- ✅ Usar HTTPS en producción
- ✅ Configurar dominios autorizados correctamente

### 4. Estado y CSRF

- ✅ Usar parámetro `state` para prevenir CSRF
- ✅ Generar valores únicos y verificarlos

---

## 🔧 Configuración de Vite

Actualiza `vite.config.js` si necesitas proxy para desarrollo:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
```

---

## 🚨 Solución de Problemas

### Error: "OAuth client ID not found"

- Verifica que el Client ID esté correcto en `.env`
- Asegúrate de usar `import.meta.env.VITE_GOOGLE_CLIENT_ID`

### Error: "redirect_uri_mismatch"

- Verifica que la URI de redirección coincida exactamente
- Incluye el protocolo (`http://` o `https://`)

### Error: "popup_blocked"

- El navegador está bloqueando popups
- Usa redirección completa en lugar de popup

### El botón no aparece

- Verifica que el script de Google esté cargado
- Revisa la consola para errores de JavaScript

---

## 📚 Recursos Adicionales

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Cloud Console](https://console.cloud.google.com/)
- [JWT.io - Token Debugger](https://jwt.io/)

---

## ✅ Checklist de Implementación

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Identity API habilitada
- [ ] OAuth 2.0 credentials configuradas
- [ ] Variables de entorno configuradas
- [ ] Script de Google agregado a index.html
- [ ] Backend endpoint para validación implementado
- [ ] HTTPS configurado (producción)
- [ ] Dominios autorizados configurados
- [ ] Manejo de errores implementado
- [ ] Logging y monitoreo configurado

---

**¡Importante!** 🚨

El código actual en `GoogleLoginButton.jsx` está configurado para **DEMO** únicamente.
Para implementación en producción, reemplaza la sección de simulación con una de las
implementaciones reales mostradas en esta guía.
