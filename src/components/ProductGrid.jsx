import { useState } from "react";
import Producto from "./Producto";
import "../styles/products.css";

function ProductGrid({ productos, onAgregar }) {
  const POR_PAGINA = 4;
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(productos.length / POR_PAGINA);

  // ⛑️ si la página queda fuera de rango al filtrar
  if (pagina > totalPaginas && totalPaginas > 0) {
    setPagina(1);
  }

  const inicio = (pagina - 1) * POR_PAGINA;
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
              className={`pagina-btn ${pagina === i + 1 ? "activa" : ""}`}
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


