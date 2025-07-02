import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/ProductsSlice";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertContext";

const CrearProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleCreate = (nuevoProducto) => {
    // Validación adicional (el formulario ya impide campos vacíos y negativos con HTML5)
    if (
      !nuevoProducto.title.trim() ||
      !nuevoProducto.description.trim() ||
      !nuevoProducto.category.trim() ||
      !nuevoProducto.image.trim() ||
      nuevoProducto.price < 0
    ) {
      showAlert("Por favor, completá todos los campos correctamente.", "danger");
      return;
    }

    // Generar un ID falso (si no se conecta aún con backend)
    nuevoProducto.id = Date.now();

    dispatch(add(nuevoProducto));
    showAlert("Producto creado exitosamente", "success");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default CrearProducto;
