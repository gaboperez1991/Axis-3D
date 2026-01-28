import React from "react";
import { Link } from "react-router-dom";

function Producto({ producto, onAgregar }) {
  return (
    <div className="card-producto">
      <Link to={`/producto/${producto.id}`}>
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          className="card-img"
        />
      </Link>

      <div className="card-body">
        <h3 className="card-titulo">{producto.nombre}</h3>
        <p className="card-precio">${producto.precio}</p>

        {producto.stock > 0 ? (
          <button
            className="card-boton"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        ) : (
          <span className="sin-stock">Sin stock</span>
        )}
      </div>
    </div>
  );
}

export default Producto;






