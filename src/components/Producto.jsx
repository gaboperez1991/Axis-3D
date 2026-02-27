import React from "react";
import { Link } from "react-router-dom";

// Puedes definir una URL de imagen por defecto aquí,
// o importarla si tienes un archivo de assets.
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/300x200?text=No+Image"; // Ejemplo de placeholder

function Producto({ producto, onAgregar }) {
  // Asegurarse de que 'producto' exista antes de acceder a sus propiedades
  if (!producto) {
    return null; // O un mensaje de error, dependiendo de cómo quieras manejarlo.
  }

  // Lógica para obtener la URL de la imagen de forma segura
  const imageUrl =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : DEFAULT_IMAGE_URL; // Usamos la imagen por defecto si no hay imágenes

  return (
    <div className="card-producto">
      <Link to={`/producto/${producto.id}`}>
        <img
          src={imageUrl} // Usamos la URL segura aquí
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







