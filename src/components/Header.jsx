import { Link } from "react-router-dom";

import { FaInstagram, FaTiktok } from "react-icons/fa";

function Header({ busqueda, setBusqueda, categoria, setCategoria }) {
  return (
    <header className="header">
      <div className="header-inner">

        <div className="header-logo">
  <Link to="/">
    <img
      src="/src/assets/img/logo/axis3dv2.png"
      alt="Axis 3D"
      className="logo"
    />
  </Link>
</div>


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

        <div className="header-redes">
          <a href="#" target="_blank" rel="noreferrer">
            <FaTiktok />
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </div>

      </div>
    </header>
  );
}

export default Header;




