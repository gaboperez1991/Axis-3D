import React from "react";

function Cart({
  carrito,
  agregarUno,
  quitarUno,
  vaciarCarrito,
}) {
  const total = carrito.reduce(
    (acc, p) => acc + p.price * p.cantidad,
    0
  );

  return (
    <div className="cart">
      <h2>🛒 Carrito</h2>

      {carrito.length === 0 && (
        <p className="cart-vacio">El carrito está vacío</p>
      )}

      {carrito.map((p) => (
        <div className="cart-item" key={p.id}>
          <div className="cart-info">
            <strong>{p.nombre}</strong>
            <span>
              ${p.precio} × {p.cantidad}
            </span>
          </div>

          <div className="cart-actions">
            <button onClick={() => quitarUno(p.id)}>➖</button>
            <button onClick={() => agregarUno(p)}>➕</button>
            <button
              className="cart-eliminar"
              onClick={() => quitarUno(p.id, true)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {carrito.length > 0 && (
        <>
          <h3 className="cart-total">
            Total: ${total}
          </h3>

          <button
            className="vaciar"
            onClick={vaciarCarrito}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;



