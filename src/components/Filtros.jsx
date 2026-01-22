import React from 'react';

function Filtros({ categoria, setCategoria, categorias }) {
  return (
    <select
      className="filtro"
      value={categoria}
      onChange={(e) => setCategoria(e.target.value)}
    >
      <option value="">Todas las categorias</option>
      {categorias.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default Filtros;
