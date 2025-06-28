import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing/Landing";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Entradas from "./pages/Entradas/Entradas";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("landing"); // "landing", "login", or "register"

  // Scroll to top whenever the page changes
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]); // Trigger whenever currentPage changes

  const navigateToLogin = () => {
    setCurrentPage("login");
  };

  const navigateToLanding = () => {
    setCurrentPage("landing");
  };

  const navigateToRegister = () => {
    setCurrentPage("register");
  };

  const navigateToEntradas = () => {
    setCurrentPage("entradas");
  }

  // Render current page based on state
  return (
    <AuthProvider>
      <div className="App">
        {currentPage === "landing" && (
          <Landing
            onNavigateToLogin={navigateToLogin}
            onNavigateToRegister={navigateToRegister}
            onNavigateToEntradas={navigateToEntradas}
          />
        )}
        {currentPage === "login" && (
          <LoginPage
            onNavigateToLanding={navigateToLanding}
            onNavigateToRegister={navigateToRegister}
            onNavigateToEntradas={navigateToEntradas}
            onNavigateToLogin={navigateToLogin}
          />
        )}
        {currentPage === "register" && (
          <RegisterPage
            onNavigateToLanding={navigateToLanding}
            onNavigateToRegister={navigateToRegister}
            onNavigateToEntradas={navigateToEntradas}
            onNavigateToLogin={navigateToLogin}

          />
        )}
        {currentPage === "entradas" && (
          <Entradas
            onNavigateToLanding={navigateToLanding}
            onNavigateToLogin={navigateToLogin}
            onNavigateToEntradas={navigateToEntradas}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
