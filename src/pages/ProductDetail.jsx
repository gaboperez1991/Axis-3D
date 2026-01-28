import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";

function ProductDetail({ onAgregar }) {
  const { id } = useParams();
  const producto = productos.find(p => p.id === Number(id));

  const [imagenActiva, setImagenActiva] = useState(
    producto?.imagenes[0]
  );
  const [imagenZoom, setImagenZoom] = useState(null);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <>
      <div className="detalle-producto">
        {/* MINIATURAS */}
        <div className="miniaturas">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={img === imagenActiva ? "activa" : ""}
              onClick={() => setImagenActiva(img)}
            />
          ))}
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div className="imagen-principal">
          <img
            src={imagenActiva}
            alt={producto.nombre}
            onClick={() => setImagenZoom(imagenActiva)}
          />
        </div>

        {/* INFO */}
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
      </div>

      {/* OVERLAY ZOOM */}
      {imagenZoom && (
        <div className="zoom-overlay" onClick={() => setImagenZoom(null)}>
          <img src={imagenZoom} alt="zoom" />
          <button
            className="cerrar"
            onClick={() => setImagenZoom(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

export default ProductDetail;


