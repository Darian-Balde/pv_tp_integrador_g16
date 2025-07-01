import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductForm.css";

const ProductForm = ({ onSubmit, initialData }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

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
    setAlert({
      show: true,
      message: initialData ? "Producto editado correctamente" : "Producto creado exitosamente",
      variant: "success"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form p-4 border rounded bg-light">
      <h2 className="mb-4">{initialData ? "Editar Producto" : "Crear Producto"}</h2>

      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlert({ ...alert, show: false })}></button>
        </div>
      )}

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

      <input
        name="category"
        className="form-control mb-3"
        placeholder="Categoría"
        value={product.category}
        onChange={handleChange}
        required
      />

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
