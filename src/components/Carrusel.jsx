import { useEffect, useState } from "react";

function Carrusel({ imagenes = [] }) {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (!imagenes.length) return;

    const intervalo = setInterval(() => {
      setActual((prev) =>
        prev === imagenes.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, [imagenes]);

  if (!imagenes.length) return null;

  const anterior = () => {
    setActual(
      actual === 0 ? imagenes.length - 1 : actual - 1
    );
  };

  const siguiente = () => {
    setActual(
      actual === imagenes.length - 1 ? 0 : actual + 1
    );
  };

  return (
    <section className="carrusel">
      <button className="carrusel-btn" onClick={anterior}>
        ◀
      </button>

      <div className="carrusel-viewport">
        <img
          src={imagenes[actual]}
          alt="Banner"
          className="carrusel-img"
        />
      </div>

      <button className="carrusel-btn" onClick={siguiente}>
        ▶
      </button>
    </section>
  );
}

export default Carrusel;












