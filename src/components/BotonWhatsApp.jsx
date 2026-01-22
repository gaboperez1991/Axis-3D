import React from "react";

function BotonWhatsApp({ carrito, nombre }) {
  const numero = "5491164134020"; 

  const mensaje = carrito
    .map(
      (p) =>
        `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}`
    )
    .join("%0A");

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const texto = `Hola! Mi nombre es ${nombre}%0A%0AQuiero hacer este pedido:%0A${mensaje}%0A%0ATotal: $${total}`;

  const url = `https://wa.me/${numero}?text=${texto}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button
        className="boton-whatsapp"
        disabled={!nombre}
      >
        Finalizar por WhatsApp
      </button>
    </a>
  );
}

export default BotonWhatsApp;





