import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./UserMenu.module.css";

const UserMenu = ({ onNavigateToLanding }) => {
  const { user, logout, getUserInitials, getUserDisplayName } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const result = logout();
    if (result.success) {
      setIsMenuOpen(false);
      // Navigate to landing page after logout
      if (onNavigateToLanding) {
        onNavigateToLanding();
      }
    }
  };

  const handleMenuItemClick = (action) => {
    setIsMenuOpen(false);

    switch (action) {
      case "profile":
        console.log("Navigate to profile");
        // Here you would navigate to profile page
        break;
      case "settings":
        console.log("Navigate to settings");
        // Here you would navigate to settings page
        break;
      case "help":
        console.log("Navigate to help");
        // Here you would navigate to help page
        break;
      default:
        break;
    }
  };

  if (!user) return null;

  // Icons for menu items
  const ProfileIcon = () => (
    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );

  const HelpIcon = () => (
    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  return (
    <div className={styles.userMenuContainer}>
      {/* User Menu Button */}
      <button
        ref={buttonRef}
        className={`${styles.userMenuButton} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Menú de usuario"
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
      >
        <div className={styles.userInfo}>
          {/* User Avatar */}
          <div className={styles.userAvatar}>
            {user.picture ? (
              <img
                src={user.picture}
                alt={`Avatar de ${getUserDisplayName()}`}
                className={styles.avatarImage}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={styles.avatarFallback}
              style={{ display: user.picture ? "none" : "flex" }}
            >
              {getUserInitials()}
            </div>
          </div>

          {/* User Name (Desktop only) */}
          <span className={styles.userName}>{getUserDisplayName()}</span>

          {/* Chevron Icon */}
          <ChevronDownIcon />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={`${styles.dropdownMenu} ${isMenuOpen ? styles.open : ""}`}
        role="menu"
        aria-labelledby="user-menu-button"
      >
        {/* User Info Header */}
        <div className={styles.menuHeader}>
          <div className={styles.menuAvatar}>
            {user.picture ? (
              <img
                src={user.picture}
                alt={`Avatar de ${user.name}`}
                className={styles.menuAvatarImage}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={styles.menuAvatarFallback}
              style={{ display: user.picture ? "none" : "flex" }}
            >
              {getUserInitials()}
            </div>
          </div>
          <div className={styles.menuUserInfo}>
            <div className={styles.menuUserName}>{user.name}</div>
            <div className={styles.menuUserEmail}>{user.email}</div>
          </div>
        </div>

        {/* Menu Divider */}
        <div className={styles.menuDivider}></div>

        {/* Menu Items */}
        <div className={styles.menuItems}>
          <button
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("profile")}
            role="menuitem"
          >
            <ProfileIcon />
            <span>Mi Perfil</span>
          </button>

          <button
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("settings")}
            role="menuitem"
          >
            <SettingsIcon />
            <span>Configuración</span>
          </button>

          <button
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("help")}
            role="menuitem"
          >
            <HelpIcon />
            <span>Ayuda</span>
          </button>
        </div>

        {/* Menu Divider */}
        <div className={styles.menuDivider}></div>

        {/* Logout Button */}
        <button
          className={`${styles.menuItem} ${styles.logoutItem}`}
          onClick={handleLogout}
          role="menuitem"
        >
          <LogoutIcon />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
