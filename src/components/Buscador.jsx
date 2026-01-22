import React from 'react';

function Buscador({ valor, onChange }) {
  return (
    <input
      className="buscador"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar productos..."
    />
  );
}

export default Buscador;
