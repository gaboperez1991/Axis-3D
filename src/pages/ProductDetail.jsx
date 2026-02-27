import React, { useState, useEffect } from "react"; // Agregamos useEffect
import { useParams } from "react-router-dom";

// Importamos las funciones de Firestore necesarias
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // Asegúrate de que la ruta a tu archivo config.js sea correcta

// REMOVIDO: import productos from "../data/productos"; // Ya no necesitamos este archivo local

function ProductDetail({ onAgregar }) {
  const { id } = useParams(); // El ID del producto viene de la URL
  // const producto = productos.find(p => p.id === Number(id)); // Esto será reemplazado

  // NUEVO: Estado para almacenar los detalles del producto de Firestore
  const [producto, setProducto] = useState(null);
  // NUEVO: Estado para manejar la carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores

  // NUEVO: useEffect para cargar el producto específico desde Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Creamos una referencia al documento específico en la colección 'products'
        // ¡IMPORTANTE!: Asegúrate de que el nombre de tu colección sea 'products'
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef); // Obtenemos el documento

        if (productSnap.exists()) {
          // Si el documento existe, lo guardamos en el estado junto con su ID
          setProducto({ ...productSnap.data(), id: productSnap.id });
          setImagenActiva(productSnap.data().imagenes[0]); // Inicializamos la imagen activa
        } else {
          // Si el documento no existe
          setProducto(null);
          setError("Producto no encontrado.");
        }
      } catch (err) {
        console.error("Error al obtener el detalle del producto:", err);
        setError("Error al cargar el producto. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Solo intentamos buscar si tenemos un ID
      fetchProduct();
    }
  }, [id]); // Este efecto se ejecutará cada vez que el ID de la URL cambie

  const [imagenActiva, setImagenActiva] = useState(null); // Inicializado como null
  const [imagenZoom, setImagenZoom] = useState(null);

  // NUEVO: Manejo de estados de carga y error
  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!producto) {
    // Si no hay producto y no hay error, es que no se encontró
    return <p>Producto no encontrado</p>;
  }

  return (
    <>
      <div className="detalle-producto">
        {/* MINIATURAS */}
        <div className="miniaturas">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={producto.nombre} // Mejor accesibilidad
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



