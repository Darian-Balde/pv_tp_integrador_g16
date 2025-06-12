import React, { useState, useEffect } from "react";
import "./ProductForm.css";

const ProductForm = ({ onSubmit, initialData }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setProduct({
    ...product,
    [name]: name === "price" ? parseFloat(value) : value
  });
};


  const handleDelete = (id) => {
  if (window.confirm("¿Estás seguro que querés eliminar este producto?")) {
    onSubmit({ ...product, _delete: true });
  }
};

  const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(product);
  alert(initialData ? "Producto editado correctamente" : "Producto creado exitosamente");
};


  return (
    <form onSubmit={handleSubmit} className="product-form">
  <h2>{initialData ? "Editar Producto" : "Crear Producto"}</h2>

  <input
    name="title"
    placeholder="Título"
    value={product.title}
    onChange={handleChange}
    required
    minLength={3}
  />

  <input
    name="price"
    type="number"
    step="0.01"
    min="0"
    placeholder="Precio"
    value={product.price}
    onChange={handleChange}
    required
  />

  <input
    name="category"
    placeholder="Categoría"
    value={product.category}
    onChange={handleChange}
    required
  />

  <input
    name="image"
    placeholder="URL de imagen"
    value={product.image}
    onChange={handleChange}
  />

  <textarea
    name="description"
    placeholder="Descripción"
    value={product.description}
    onChange={handleChange}
    required
    minLength={10}
  />

  <button type="submit">
    {initialData ? "Guardar cambios" : "Crear producto"}
  </button>

  {initialData && (
    <button
      type="button"
      onClick={() => handleDelete(product.id)}
      className="delete-button"
    >
      Eliminar producto
    </button>
  )}
</form>

  );
};

export default ProductForm;
