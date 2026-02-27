import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function ProductDetail({ onAgregar }) {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Productos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al traer producto:", error);
        setError("Producto no encontrado.");
      } else {
        setProducto(data);
      }

      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="detalle-producto">
      <div className="imagen-principal">
        <img
          src={producto.image_url}
          alt={producto.name}
          style={{ maxWidth: "400px" }}
        />
      </div>

      <div className="info">
        <h2>{producto.name}</h2>
        <p className="precio">${producto.price}</p>
        <p>{producto.description}</p>

        <button
          className="btn-agregar"
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;



