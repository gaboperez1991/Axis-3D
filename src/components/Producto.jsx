function Producto({ producto, onAgregar }) {
  const { nombre, precio, imagenes, stock } = producto;
  const sinStock = stock === 0;

  return (
    <div className="card-producto">
      <img src={imagenes[0]} alt={nombre} className="card-img" />

      <h3 className="card-titulo">{nombre}</h3>
      <p className="card-precio">${precio}</p>

      {sinStock ? (
        <p className="sin-stock">Sin stock</p>
      ) : (
        <button onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </button>
      )}
    </div>
  );
}
export default Producto;




