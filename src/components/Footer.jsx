function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/src/assets/img/logo/axis3dv2.png" alt="Axis 3D Logo" className="footer-logo"/>
        <p>Impresiones 3D personalizadas</p>

        <div className="footer-redes">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="WhatsApp">WhatsApp</a>
          <a href="#" aria-label="Email">Email</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Axis 3D
        </p>
      </div>
    </footer>
  );
}

export default Footer;
