import { useState } from "react";

const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  imagenes: [""],
};

function AdminProductForm({ onGuardar, productoEditar }) {
  const [form, setForm] = useState(() =>
    productoEditar
      ? {
          ...productoEditar,
          imagenes: [...(productoEditar.imagenes || [""])],
        }
      : estadoInicial
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagenChange = (e) => {
    setForm((prev) => ({
      ...prev,
      imagenes: [e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onGuardar({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });

    setForm(estadoInicial);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />

      <input
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={handleChange}
        required
      />

      <input
        name="imagenes"
        placeholder="URL Imagen"
        value={form.imagenes[0]}
        onChange={handleImagenChange}
        required
      />

      <button type="submit">
        {productoEditar ? "Actualizar" : "Crear Producto"}
      </button>
    </form>
  );
}

export default AdminProductForm;

