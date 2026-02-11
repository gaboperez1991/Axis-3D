import { useState } from "react";
import Producto from "./Producto";
import "../styles/products.css";

function ProductGrid({ productos, onAgregar }) {
  const POR_PAGINA = 6;
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);

  // Ajustamos la página de forma segura
  const paginaActual =
    totalPaginas === 0
      ? 1
      : Math.min(pagina, totalPaginas);

  const inicio = (paginaActual - 1) * POR_PAGINA;
  const visibles = productos.slice(inicio, inicio + POR_PAGINA);

  return (
    <section className="productos-box">
      <h2 className="productos-titulo">Productos</h2>

      <div className="productos-grid">
        {visibles.map((p) => (
          <Producto
            key={p.id}
            producto={p}
            onAgregar={onAgregar}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacion">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              className={`pagina-btn ${paginaActual === i + 1 ? "activa" : ""}`}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;




