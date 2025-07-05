import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductForm.css";

const categoriasEjemplo = [
  "Electrónica",
  "Ropa",
  "Hogar",
  "Juguetes",
  "Libros"
];

const ProductForm = ({ onSubmit, initialData, categories }) => {
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

  // Eliminar confirmación nativa, solo delegar al padre
  const handleDelete = () => {
    onSubmit({ ...product, _delete: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  const products = useSelector((state) => state.products.entities);
  const categorias = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className="product-form p-4 border rounded bg-light">
      <h2 className="mb-4">{initialData ? "Editar Producto" : "Crear Producto"}</h2>

      <input
        name="title"
        className="form-control mb-3"
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
        className="form-control mb-3"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
        required
      />

      
      <select
        name="category"
        className="form-control mb-3"
        value={product.category}
        onChange={handleChange}
        required
      >
        <option value="">Seleccioná una categoría</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        name="image"
        className="form-control mb-3"
        placeholder="URL de imagen"
        value={product.image}
        onChange={handleChange}
      />

      <textarea
        name="description"
        className="form-control mb-3"
        placeholder="Descripción"
        value={product.description}
        onChange={handleChange}
        required
        minLength={10}
      />

      <button type="submit" className="btn btn-primary me-2">
        {initialData ? "Guardar cambios" : "Crear producto"}
      </button>

      {initialData && (
        <button
          type="button"
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Eliminar producto
        </button>
      )}
    </form>
  );
};

export default ProductForm;