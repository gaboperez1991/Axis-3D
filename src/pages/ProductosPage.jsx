import React from "react";
import ProductGrid from "../components/ProductGrid";
import "../styles/productosPage.css";

function ProductosPage({
  productos,
  categoria,
  setCategoria,
  orden,
  setOrden,
  onAgregar,
}) {
  return (
    <section className="productos-page">

      {/* BARRA SUPERIOR */}
      <div className="barra-productos">

        {/* FILTRO IZQUIERDA */}
        <div className="filtro-box">
          <label>Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="figuras">Figuras</option>
            <option value="llaveros">Llaveros</option>
            <option value="soportes">Soportes</option>
          </select>
        </div>

        {/* ORDEN DERECHA */}
        <div className="orden-box">
          <label>Ordenar por:</label>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Relevancia</option>
            <option value="precio-asc">Precio menor a mayor</option>
            <option value="precio-desc">Precio mayor a menor</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>

      </div>

      {/* GRID DE PRODUCTOS */}
      <ProductGrid
        productos={productos}
        onAgregar={onAgregar}
      />

    </section>
  );
}

export default ProductosPage;

