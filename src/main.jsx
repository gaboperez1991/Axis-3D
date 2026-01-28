import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// estilos globales
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/products.css";
import "./styles/buttons.css";
import "./styles/cart.css";
import "./styles/footer.css";
import "./styles/header.css";
import "./styles/buscador.css";
import "./styles/filtros.css";
import "./styles/checkout.css";
import "./styles/carrusel.css";
import "./styles/productDetail.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
