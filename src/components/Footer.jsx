import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="/src/assets/img/logo/axis3dv2.png"
          alt="Axis 3D"
          className="footer-logo"
        />

        <p className="footer-text">
          Impresiones 3D personalizadas · Llaveros · Soportes · Figuras
        </p>

        <p className="footer-text small">
          Buenos Aires, Argentina
        </p>

        <div className="footer-separador" />

        <p className="footer-copy">
          © {new Date().getFullYear()} Axis 3D · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;

