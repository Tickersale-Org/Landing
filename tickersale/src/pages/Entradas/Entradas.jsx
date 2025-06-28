import React from "react";
import styles from "./Entradas.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import TicketsList from "../../components/TicketsList/TicketsList";

export default function Entradas({ onNavigateToLanding, onNavigateToLogin, onNavigateToEntradas }) {
  return (
    <div className={styles.bgGradient}>
      {/* Navbar */}
      <Navbar
        onNavigateToLanding={onNavigateToLanding}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToEntradas={onNavigateToEntradas}
      />

      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Entradas Disponibles</h1>
        <p className={styles.pageSubtitle}>
          Compra y vende entradas de forma <span>segura</span> y <span>fácil</span> en Tickersale.
        </p>
        <TicketsList />
      </main>

      <Footer />
    </div>
  );
}
