import { useState } from "react";
import styles from "./InterfacesGrid.module.css";

import landing from "../assets/howitworks/landing.png";
import login from "../assets/howitworks/login.png";
import register from "../assets/howitworks/register.png";
import listado from "../assets/howitworks/listado.png";
import modalCompra from "../assets/howitworks/modal-compra.png";

const interfaces = [
  {
    title: "Landing",
    description: "Página inicial que presenta Tickersale y guía al usuario a las secciones clave.",
    image: landing,
  },
  {
    title: "Login",
    description: "Interfaz para acceder a tu cuenta de forma segura y rápida.",
    image: login,
  },
  {
    title: "Registro",
    description: "Formulario de registro para nuevos usuarios interesados en comprar o vender.",
    image: register,
  },
  {
    title: "Lista de Entradas",
    description: "Muestra las entradas disponibles con filtros y búsqueda interactiva.",
    image: listado,
  },
  {
    title: "Detalles de Entrada",
    description: "Modal con información detallada del evento y opción de compra.",
    image: modalCompra,
  },
];

const InterfacesGrid = () => {
  const [selected, setSelected] = useState(null);

  const openModal = (image) => {
    setSelected(image);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <section id="como-funciona" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>¿Cómo funciona Tickersale?</h2>
        <p className={styles.description}>
          Estas son las interfaces clave que conforman la experiencia dentro de la plataforma.
        </p>
        <div className={styles.grid}>
          {interfaces.map((item, index) => (
            <div className={styles.card} key={index} onClick={() => openModal(item.image)}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selected} alt="Interfaz ampliada" />
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InterfacesGrid;
