import React from "react";
import styles from "./Landing.module.css";

import Navbar from "../../components/NavBar/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import InterfacesGrid from "../../components/InterfacesGrid";
import FinalMessage from "../../components/FinalMessage";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  return (
    <div className={styles.landing}>
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className={styles.main}>
        <Hero />
        <Features />
        <InterfacesGrid />
        <FinalMessage />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Landing;