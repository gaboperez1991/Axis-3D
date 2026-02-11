import { useState } from "react";
import productosData from "../data/productos";
import AdminProductForm from "../components/AdminProductsFrom";

function AdminDashboard() {
  const [productos, setProductos] = useState(productosData);
  const [editando, setEditando] = useState(null);

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const guardarProducto = (producto) => {
    if (producto.id) {
      // editar
      setProductos((prev) =>
        prev.map((p) =>
          p.id === producto.id ? producto : p
        )
      );
    } else {
      // nuevo
      const nuevo = {
        ...producto,
        id: Date.now(),
      };

      setProductos((prev) => [...prev, nuevo]);
    }

    setEditando(null);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Panel Admin - Axis 3D</h2>

      <AdminProductForm
        key={editando?.id || "nuevo"}
        onGuardar={guardarProducto}
        productoEditar={editando}
      />

      <div className="admin-list">
        {productos.map((p) => (
          <div key={p.id} className="admin-card">
            <img src={p.imagenes[0]} alt={p.nombre} />
            <div>
              <h4>{p.nombre}</h4>
              <p>${p.precio}</p>
              <p>Stock: {p.stock}</p>
            </div>

            <div className="admin-actions">
              <button onClick={() => setEditando(p)}>
                Editar
              </button>

              <button onClick={() => eliminarProducto(p.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

