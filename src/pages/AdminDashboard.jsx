import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

import AdminProductForm from "../components/AdminProductsFrom";
import "../styles/products.css";

function AdminDashboard() {
  const { logout } = useAuth();
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(productsCollectionRef, orderBy("nombre", "asc"));
        const data = await getDocs(q);
        const productsArray = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos(productsArray);
      } catch (err) {
        console.error("Error al cargar productos en Admin Dashboard:", err);
        setError("Error al cargar productos.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [productsCollectionRef]); // Se ejecuta solo una vez al cargar el componente

  const eliminarProducto = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      console.log(`Producto con ID ${id} eliminado correctamente.`);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setError("Error al eliminar el producto.");
    }
  };

  const guardarProducto = async (producto) => {
    setLoading(true);
    setError(null);
    try {
      if (producto.id) {
        // Si el producto tiene un ID, lo actualizamos
        const productDoc = doc(db, "products", producto.id);
        // MODIFICACIÓN AQUÍ: Renombramos 'id' a '_unusedId' para evitar la advertencia del linter
        const { id: _unusedId, ...productoSinId } = producto; 
        await updateDoc(productDoc, productoSinId);
        setProductos((prev) =>
          prev.map((p) => (p.id === producto.id ? producto : p))
        );
        console.log(`Producto con ID ${producto.id} actualizado correctamente.`);
      } else {
        // Si no tiene ID, es un producto nuevo, lo agregamos
        const docRef = await addDoc(productsCollectionRef, producto);
        setProductos((prev) => [...prev, { ...producto, id: docRef.id }]);
        console.log(`Nuevo producto agregado con ID ${docRef.id}.`);
      }
      setEditando(null);
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setError("Error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && productos.length === 0) {
    return (
      <div className="admin-layout">
        <p>Cargando productos del administrador...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

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
                      src={p.imagenes && p.imagenes[0]}
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










