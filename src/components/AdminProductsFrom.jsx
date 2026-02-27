import React, { useState } from "react"; // Ya no necesitamos useEffect aquí

function AdminProductForm({ onGuardar, productoEditar }) {
  // Función para obtener el estado inicial del formulario
  // Se ejecutará una vez cuando el componente se monte (o remonte por la key)
  const getInitialFormState = () => ({
    nombre: productoEditar?.nombre || "",
    // Convertimos números a string para que los inputs tipo "number" los muestren correctamente.
    // Esto es importante para evitar que React trate un input con valor 0 como un "input no controlado".
    precio: String(productoEditar?.precio || "") || "",
    stock: String(productoEditar?.stock || "") || "",
    // Aseguramos que 'imagenes' sea un array y tenga al menos un elemento si está vacío
    imagenes:
      productoEditar?.imagenes && productoEditar.imagenes.length > 0
        ? productoEditar.imagenes
        : [""],
    categoria: productoEditar?.categoria || "",
  });

  // Inicializamos el estado 'form' utilizando la función getInitialFormState.
  // Esto se ejecutará cada vez que el componente se monte o remonte (debido a la 'key').
  const [form, setForm] = useState(getInitialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "imagen") {
      setForm({ ...form, imagenes: [value] });
    } else if (name === "precio" || name === "stock") {
      // Convertimos el valor a número para el estado interno
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productToSave = {
      ...form,
      // Pasamos el ID directamente de 'productoEditar' si estamos editando.
      // Si 'productoEditar' es null (nuevo producto), 'id' será undefined, lo cual es correcto.
      id: productoEditar?.id,
      // Aseguramos que los valores finales de precio y stock sean números antes de enviar
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    onGuardar(productToSave);

    // Después de guardar, el componente padre (AdminDashboard) cambiará 'editando' a null,
    // lo que provocará que la 'key' de este componente cambie a "nuevo",
    // y React lo desmontará y montará de nuevo, reiniciando automáticamente el formulario.
    // Por lo tanto, no es necesario llamar a setForm(initialState) aquí.
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
        <label>Categoría</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="figuras">Figuras</option>
          <option value="llaveros">Llaveros</option>
          <option value="soportes">Soportes</option>
        </select>
      </div>

      <div className="form-group">
        <label>URL de Imagen</label>
        <input
          type="text"
          name="imagen"
          value={form.imagenes[0] || ""}
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



