import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state (check for existing session)
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check localStorage for existing user session
        const savedUser = localStorage.getItem("tickersale_user");
        const savedToken = localStorage.getItem("tickersale_token");

        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear corrupted data
        localStorage.removeItem("tickersale_user");
        localStorage.removeItem("tickersale_token");
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading time for better UX
    setTimeout(initializeAuth, 500);
  }, []);

  // Login function
  const login = (userData, token = null) => {
    try {
      // Generate a mock token if none provided
      const authToken =
        token ||
        `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create user object with all necessary data
      const user = {
        id: userData.id || `user_${Date.now()}`,
        name: userData.name || userData.email?.split("@")[0] || "Usuario",
        email: userData.email,
        picture: userData.picture || null,
        provider: userData.provider || "email", // 'email', 'google', etc.
        verified: userData.verified || userData.verified_email || true,
        loginTime: new Date().toISOString(),
        ...userData,
      };

      // Save to localStorage
      localStorage.setItem("tickersale_user", JSON.stringify(user));
      localStorage.setItem("tickersale_token", authToken);

      // Update state
      setUser(user);
      setIsAuthenticated(true);

      console.log("User logged in:", user);
      return { success: true, user, token: authToken };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem("tickersale_user");
      localStorage.removeItem("tickersale_token");

      // Reset state
      setUser(null);
      setIsAuthenticated(false);

      console.log("User logged out");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  // Update user information
  const updateUser = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };

      // Save to localStorage
      localStorage.setItem("tickersale_user", JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);

      console.log("User updated:", updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: error.message };
    }
  };

  // Check if user has specific permission/role
  const hasPermission = (permission) => {
    if (!isAuthenticated || !user) return false;

    // Mock permission system - you can expand this
    const userPermissions = user.permissions || ["read"];
    return userPermissions.includes(permission);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const names = user.name.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "";

    // Prefer first name, fallback to full name, then email
    if (user.given_name) return user.given_name;
    if (user.name) {
      const firstName = user.name.split(" ")[0];
      return firstName;
    }
    if (user.email) {
      return user.email.split("@")[0];
    }

    return "Usuario";
  };

  // Context value
  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,

    // Actions
    login,
    logout,
    updateUser,

    // Utilities
    hasPermission,
    getUserInitials,
    getUserDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
