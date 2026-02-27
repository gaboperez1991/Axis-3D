import React, { useState, useEffect } from "react"; // Añadimos useEffect para la carga de datos
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Importamos las funciones de Firestore necesarias y la instancia de db
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase/config"; // Asegúrate de que la ruta a tu archivo config.js sea correcta

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
// REMOVIDO: import productos from "./data/productos"; // Ya no necesitamos este archivo local

function AppContent() {
  const location = useLocation();

  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  // NUEVO: Estado para almacenar los productos de Firestore
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  // NUEVO: Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);

  // NUEVO: useEffect para cargar los productos desde Firestore cuando el componente se monta
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Indicamos que estamos cargando
      try {
        // Obtenemos una referencia a la colección 'products' en Firestore
        // ¡IMPORTANTE!: Asegúrate de que el nombre de tu colección en Firestore sea 'products'
        const productsCollectionRef = collection(db, "products");
        const data = await getDocs(productsCollectionRef);
        const productsArray = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Incluimos el ID del documento como 'id' del producto
        }));
        setFirestoreProducts(productsArray); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setLoading(false); // Terminamos la carga, independientemente del resultado
      }
    };

    getProducts(); // Llamamos a la función para obtener los productos
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

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

  // Usamos 'firestoreProducts' en lugar de 'productos' del archivo local
  const productosFiltrados = firestoreProducts
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

  // NUEVO: Mostrar un mensaje de carga mientras se obtienen los productos
  if (loading) {
    return (
      <div className="app">
        <p>Cargando productos...</p>
      </div>
    );
  }

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
                  {/* Pasamos los productos de Firestore al ProductGrid */}
                  <ProductGrid
                    productos={firestoreProducts.slice(0, 3)} // O la lógica que necesites para los productos destacados
                    onAgregar={agregarUno}
                  />
                </>
              }
            />

            <Route
              path="/productos"
              element={
                <ProductosPage
                  productos={productosFiltrados} // Pasamos los productos filtrados de Firestore
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













