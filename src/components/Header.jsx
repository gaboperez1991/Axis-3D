function Header({ busqueda, setBusqueda, categoria, setCategoria }) {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/axis3dv2.png" alt="Axis 3D" className="logo" />
      </div>

      <div className="header-controls">
        <input
          className="buscador"
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="filtro"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="llaveros">Llaveros</option>
          <option value="soportes">Soportes</option>
          <option value="figuras">Figuras</option>
        </select>
      </div>

      <div className="header-redes">
        <a href="#" aria-label="Instagram">📷</a>
        <a href="#" aria-label="WhatsApp">💬</a>
      </div>
    </header>
  );
}

export default Header;


