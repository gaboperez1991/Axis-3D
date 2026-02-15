import React from "react";
import { Link } from "react-router-dom";
import Carrusel from "./Carrusel";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-texto">
        <h1>
          Impresión 3D<br />
          <span>Personalizada y Profesional</span>
        </h1>

        <p>
          Diseñamos y fabricamos piezas únicas con precisión y calidad.
          Desde decoración hasta soluciones técnicas.
        </p>

        <Link to="/productos" className="btn-ver-productos">
          Ver Productos
        </Link>
      </div>

      <div className="hero-carrusel">
        <Carrusel
          imagenes={[
            "/src/assets/img/carrusel/efelante1.png",
            "/src/assets/img/carrusel/gatito.png",
            "/src/assets/img/carrusel/llavero dragon.png",
            "/src/assets/img/carrusel/soporte elegante.png",
          ]}
        />
      </div>
    </section>
  );
}

export default Hero;

