import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";
import "../styles/productDetail.css";

function ProductDetail({ onAgregar }) {
  const { id } = useParams();

  const producto = productos.find(
    (p) => p.id === Number(id)
  );

  const [imagenActiva, setImagenActiva] = useState(
    producto?.imagenes[0]
  );

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="detalle-producto">
      <div className="galeria">
        <div className="miniaturas">
          {producto.imagenes.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={producto.nombre}
              className={img === imagenActiva ? "activa" : ""}
              onClick={() => setImagenActiva(img)}
            />
          ))}
        </div>

        <div className="imagen-principal">
          <img src={imagenActiva} alt={producto.nombre} />
        </div>
      </div>

      <div className="info">
        <h2>{producto.nombre}</h2>
        <p className="precio">${producto.precio}</p>

        <button
          className="btn-agregar"
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
}

export default ProductDetail;

