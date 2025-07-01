import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductForm from "../components/ProductForm";
import {  update , remove } from "../store/ProductsSlice"; // podés usar otro reducer tipo `update`

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const producto = useSelector((state) =>
    state.products.entities.find((p) => p.id === parseInt(id))
  );

  if (!producto) return <p>Producto no encontrado</p>;

  const handleEdit = (product) => {
  if (product._delete) {
    dispatch(remove(product.id));
    alert("Producto eliminado");
    navigate("/");
  } else {
    dispatch(update(product));
    alert("Producto actualizado");
    navigate("/");
  }
};

  // const handleEdit = (updatedProduct) => {
  //   dispatch(update(updatedProduct)); 
  //   alert("Producto actualizado");
  //   navigate("/");
  // };

  return <ProductForm initialData={producto} onSubmit={handleEdit} />;
};

export default EditarProducto;
