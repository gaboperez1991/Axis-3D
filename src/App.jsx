import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import BotonWhatsApp from "./components/BotonWhatsApp";
import Footer from "./components/Footer";

import ProductDetail from "./pages/ProductDetail";
import productos from "./data/productos";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  /* =========================
     CARRITO
  ========================= */

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

  /* =========================
     FILTROS
  ========================= */

  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" || p.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoria={categoria}
          setCategoria={setCategoria}
        />

        <div className="layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="contenido">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Carrusel
                      imagenes={[
                        "/src/assets/img/carrusel/efelante1.png",
                        "/src/assets/img/carrusel/gatito.png",
                        "/src/assets/img/carrusel/llavero dragon.png",
                        "/src/assets/img/carrusel/soporte elegante.png",
                      ]}
                    />

                    <ProductGrid
                      productos={productosFiltrados}
                      onAgregar={agregarUno}
                    />
                  </>
                }
              />

              <Route
                path="/producto/:id"
                element={
                  <ProductDetail onAgregar={agregarUno} />
                }
              />
            </Routes>
          </div>

          {/* COLUMNA DERECHA */}
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
              onChange={(e) => setNombreCliente(e.target.value)}
            />

            <BotonWhatsApp
              carrito={carrito}
              nombre={nombreCliente}
            />
          </aside>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;









