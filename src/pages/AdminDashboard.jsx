import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import productosData from "../data/productos";
import AdminProductForm from "../components/AdminProductsFrom";

function AdminDashboard() {
  const { logout } = useAuth();
  const [productos, setProductos] = useState(productosData);
  const [editando, setEditando] = useState(null);

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const guardarProducto = (producto) => {
    if (producto.id) {
      setProductos((prev) =>
        prev.map((p) => (p.id === producto.id ? producto : p))
      );
    } else {
      const nuevo = {
        ...producto,
        id: Date.now(),
      };
      setProductos((prev) => [...prev, nuevo]);
    }

    setEditando(null);
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div>
          <img
            src="/src/assets/img/logo/axis3dv2.png"
            alt="Axis 3D"
            className="admin-logo-img"
          />
          <h2 className="admin-logo">Axis 3D</h2>

          <nav>
            <button className="sidebar-btn active">
              Productos
            </button>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR */}
        <div className="admin-topbar">
          <h1>Dashboard</h1>

          <div className="admin-user">
            Administrador
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total productos</h3>
            <p>{productos.length}</p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="admin-form-card">
          <h2>Agregar / Editar Producto</h2>

          <AdminProductForm
            key={editando?.id || "nuevo"}
            onGuardar={guardarProducto}
            productoEditar={editando}
          />
        </div>

        {/* TABLA */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.imagenes[0]}
                      alt={p.nombre}
                      className="admin-thumb"
                    />
                  </td>

                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>

                  <td className="acciones">
                    <button
                      className="edit-btn"
                      onClick={() => setEditando(p)}
                    >
                      Editar
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => eliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;







