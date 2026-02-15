import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import BotonWhatsApp from "./components/BotonWhatsApp";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductosPage from "./pages/ProductosPage";
import productos from "./data/productos";

function AppContent() {
  const location = useLocation();

  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  const esAdmin = location.pathname.startsWith("/admin");
  const esLogin = location.pathname === "/login";

  const agregarUno = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarUno = (id, eliminar = false) => {
    if (eliminar) {
      setCarrito(carrito.filter((p) => p.id !== id));
    } else {
      setCarrito(
        carrito
          .map((p) =>
            p.id === id
              ? { ...p, cantidad: p.cantidad - 1 }
              : p
          )
          .filter((p) => p.cantidad > 0)
      );
    }
  };

  const vaciarCarrito = () => setCarrito([]);

  const productosFiltrados = productos
    .filter((p) => {
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoria === "" || p.categoria === categoria;

      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio;
      if (orden === "precio-desc") return b.precio - a.precio;
      if (orden === "az") return a.nombre.localeCompare(b.nombre);
      if (orden === "za") return b.nombre.localeCompare(a.nombre);
      return 0;
    });

  return (
    <div className="app">
      {!esLogin && !esAdmin && (
        <Header
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      )}

      <div className="layout container">

        <div className="contenido">
          <Routes>

            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ProductGrid
                    productos={productos.slice(0, 3)}
                    onAgregar={agregarUno}
                  />
                </>
              }
            />

            <Route
              path="/productos"
              element={
                <ProductosPage
                  productos={productosFiltrados}
                  busqueda={busqueda}
                  setBusqueda={setBusqueda}
                  categoria={categoria}
                  setCategoria={setCategoria}
                  orden={orden}
                  setOrden={setOrden}
                  onAgregar={agregarUno}
                />
              }
            />

            <Route
              path="/producto/:id"
              element={<ProductDetail onAgregar={agregarUno} />}
            />

            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>

        {!esAdmin && !esLogin && (
          <aside className="columna-carrito">
            <Cart
              carrito={carrito}
              agregarUno={agregarUno}
              quitarUno={quitarUno}
              vaciarCarrito={vaciarCarrito}
            />

            <input
              className="input-nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombreCliente}
              onChange={(e) =>
                setNombreCliente(e.target.value)
              }
            />

            <BotonWhatsApp
              carrito={carrito}
              nombre={nombreCliente}
            />
          </aside>
        )}
      </div>

      {!esLogin && !esAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;













