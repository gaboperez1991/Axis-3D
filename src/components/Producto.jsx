import React from "react";

function Producto({ producto, onAgregar }) {
  const sinStock = producto.stock === 0;

  return (
    <div className="card-producto">
      <img
        src={producto.imagenes[0]}
        alt={producto.nombre}
        className="card-img"
      />

      <div className="card-body">
        <h3 className="card-titulo">{producto.nombre}</h3>
        <p className="card-precio">${producto.precio}</p>

        {sinStock ? (
          <p className="sin-stock">Sin stock</p>
        ) : (
          <button
            className="card-boton"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}

export default Producto;



