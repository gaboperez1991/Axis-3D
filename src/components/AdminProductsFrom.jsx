import { useState } from "react";

function AdminProductForm({ onGuardar, productoEditar }) {
  const initialState = {
    nombre: productoEditar?.nombre || "",
    precio: productoEditar?.precio || "",
    stock: productoEditar?.stock || "",
    imagenes: productoEditar?.imagenes || [""],
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "imagen") {
      setForm({ ...form, imagenes: [value] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      imagenes: [""],
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre del producto</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>URL de Imagen</label>
        <input
          type="text"
          name="imagen"
          value={form.imagenes[0]}
          onChange={handleChange}
          required
        />
      </div>

      <button className="save-btn" type="submit">
        {productoEditar ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
}

export default AdminProductForm;



