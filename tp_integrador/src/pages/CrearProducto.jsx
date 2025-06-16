import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../ProductsSlice";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = (nuevoProducto) => {
    // Validación adicional (el formulario ya impide campos vacíos y negativos con HTML5)
    if (
      !nuevoProducto.title.trim() ||
      !nuevoProducto.description.trim() ||
      !nuevoProducto.category.trim() ||
      !nuevoProducto.image.trim() ||
      nuevoProducto.price < 0
    ) {
      alert("Por favor, completá todos los campos correctamente.");
      return;
    }

    // Generar un ID falso (si no se conecta aún con backend)
    nuevoProducto.id = Date.now();

    dispatch(add(nuevoProducto));
    alert("Producto creado exitosamente");
    navigate("/"); // o a donde desees redirigir
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default CrearProducto;