import Producto from "./Producto";

function ProductGrid({ productos, onAgregar }) {
  return (
    <section>
      <h2>Productos</h2>

      <div className="product-grid">
        {productos.map((p) => (
          <Producto
            key={p.id}
            producto={p}
            onAgregar={onAgregar}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;

