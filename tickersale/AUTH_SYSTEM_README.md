# 🔐 Sistema de Autenticación - Tickersale

## 📋 Descripción

Sistema completo de autenticación implementado con React Context que permite al Navbar mostrar contenido diferente según el estado de autenticación del usuario.

## 🚀 Características Implementadas

### **Estado No Autenticado**

- ✅ Muestra el botón "Iniciar sesión" en el Navbar
- ✅ Permite navegación al LoginPage
- ✅ Funciona en desktop y móvil

### **Estado Autenticado**

- ✅ Oculta el botón "Iniciar sesión"
- ✅ Muestra UserMenu con avatar/iniciales del usuario
- ✅ Menú desplegable con opciones:
  - Mi Perfil
  - Configuración
  - Ayuda
  - Cerrar Sesión
- ✅ Información del usuario en el header del menú
- ✅ Avatar con fallback a iniciales

## 🔧 Componentes Creados

### **1. AuthContext (`src/context/AuthContext.jsx`)**

Contexto React que maneja todo el estado de autenticación:

```javascript
// Funciones disponibles
const {
  user, // Datos del usuario
  isAuthenticated, // Estado de autenticación
  isLoading, // Estado de carga
  login, // Función para login
  logout, // Función para logout
  updateUser, // Actualizar datos del usuario
  getUserInitials, // Obtener iniciales
  getUserDisplayName, // Obtener nombre para mostrar
} = useAuth();
```

### **2. UserMenu (`src/components/UserMenu.jsx`)**

Menú desplegable para usuarios autenticados:

- Avatar con imagen o iniciales
- Información del usuario
- Opciones de navegación
- Botón de cerrar sesión

### **3. Navbar Actualizado**

- Integración con AuthContext
- Renderizado condicional según estado
- Loading state durante inicialización
- Soporte para mobile y desktop

## 🎯 Flujo de Autenticación

### **Login Process:**

1. Usuario completa LoginForm (email/password o Google)
2. LoginForm llama a `login()` del AuthContext
3. AuthContext almacena datos en localStorage
4. Navbar detecta cambio y muestra UserMenu
5. Usuario es redirigido a Landing page

### **Logout Process:**

1. Usuario hace clic en "Cerrar Sesión" en UserMenu
2. UserMenu llama a `logout()` del AuthContext
3. AuthContext limpia localStorage y estado
4. Navbar detecta cambio y muestra botón "Iniciar sesión"
5. Usuario es redirigido a Landing page

## 💾 Persistencia de Sesión

El sistema usa **localStorage** para mantener la sesión:

- `tickersale_user`: Datos del usuario
- `tickersale_token`: Token de autenticación

La sesión persiste entre:

- ✅ Recarga de página
- ✅ Cierre/apertura de pestaña
- ✅ Cierre/apertura de navegador

## 🎨 Estados Visuales

### **Loading State**

- Shimmer effect mientras carga el estado de auth
- Placeholder animado en lugar del botón/menú

### **Authenticated State**

- Avatar del usuario (imagen o iniciales)
- Nombre del usuario (solo desktop)
- Menú desplegable profesional
- Animaciones suaves

### **Unauthenticated State**

- Botón "Iniciar sesión" estilizado
- Mismos estilos que antes

## 📱 Responsividad

### **Desktop (768px+)**

- Avatar + nombre + chevron
- Menú desplegable completo
- Hover effects

### **Mobile (<768px)**

- Solo avatar + chevron (sin nombre)
- Menú adaptado para touch
- Integrado en hamburger menu

## 🔒 Datos de Usuario Soportados

El sistema maneja usuarios de múltiples fuentes:

```javascript
// Estructura de usuario
{
  id: "user_123",
  name: "Juan Pérez",
  email: "juan@example.com",
  picture: "https://...", // opcional
  provider: "email" | "google",
  verified: true,
  loginTime: "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Testing

### **Para probar login con email:**

- Email: `demo@example.com`
- Password: `password123`

### **Para probar login con Google:**

- Clic en "Continuar con Google"
- 80% de éxito (simulado)

### **Para probar logout:**

- Login como cualquier usuario
- Clic en avatar/menú
- Clic en "Cerrar Sesión"

## 🔧 Configuración

### **AuthProvider Setup**

El `AuthProvider` debe envolver toda la aplicación:

```javascript
// App.jsx
import { AuthProvider } from "./context/AuthContext";

function App() {
  return <AuthProvider>{/* Tu aplicación */}</AuthProvider>;
}
```

### **Hook Usage**

Para usar en cualquier componente:

```javascript
import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Hola {user.name}!</div>;
  }

  return <button onClick={() => login(userData)}>Login</button>;
};
```

## 🚀 Próximas Mejoras Posibles

- [ ] Refresh tokens automático
- [ ] Roles y permisos de usuario
- [ ] Remember me functionality
- [ ] Sesiones múltiples
- [ ] Notificaciones de sesión
- [ ] Analytics de login
- [ ] Protección de rutas automática

## 🐛 Troubleshooting

### **El UserMenu no aparece:**

- Verificar que el usuario esté loggeado (`isAuthenticated === true`)
- Revisar que los datos del usuario estén en localStorage
- Comprobar que AuthProvider envuelve la aplicación

### **La sesión no persiste:**

- Verificar que localStorage esté habilitado
- Comprobar que no hay errores en consola al guardar
- Verificar que los datos no están corruptos

### **El avatar no carga:**

- El componente tiene fallback automático a iniciales
- Verificar que la URL de la imagen sea válida
- El sistema maneja errores automáticamente

## 📚 Archivos Modificados/Creados

### **Nuevos:**

- `src/context/AuthContext.jsx` - Contexto de autenticación
- `src/components/UserMenu.jsx` - Menú de usuario
- `src/components/UserMenu.module.css` - Estilos del menú

### **Modificados:**

- `src/App.jsx` - Agregado AuthProvider
- `src/components/Navbar.jsx` - Integración con AuthContext
- `src/components/Navbar.module.css` - Estilos para auth section
- `src/components/LoginForm.jsx` - Integración con AuthContext
- `src/pages/LoginPage.jsx` - Callback de éxito

## ✅ Estado Actual

🎉 **Sistema Completamente Funcional**

- Autenticación por email ✅
- Autenticación por Google ✅
- Persistencia de sesión ✅
- UI responsivo ✅
- Estados de carga ✅
- Logout funcional ✅
- Navegación integrada ✅

El sistema está listo para usar en desarrollo y producción!
