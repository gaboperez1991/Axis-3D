import React from "react";

function Cart({
  carrito,
  quitarUno,
  vaciarCarrito,
}) {
  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="cart">
      <h2>🛒 Carrito</h2>

      {carrito.length === 0 && (
        <p>El carrito está vacío</p>
      )}

      {carrito.map((p) => (
        <div className="cart-item" key={p.id}>
          <div>
            <strong>{p.nombre}</strong>
            <p>
              ${p.precio} x {p.cantidad}
            </p>
          </div>

          <button onClick={() => quitarUno(p.id)}>
            ➖
          </button>
        </div>
      ))}

      {carrito.length > 0 && (
        <>
          <h3>Total: ${total}</h3>

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


