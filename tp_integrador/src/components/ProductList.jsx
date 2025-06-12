/*Mejore la Ubicacion del icono de favoritos, falta agregar css a todo lo demas agregado*/

import React from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice";
import "../styles/ProductList.css";

const ProductList = () => {
  const { entities: products, loading, error } = useSelector(
    (state) => state.products
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const handleToggle = (product) => {
    dispatch(toggleFavorite(product));
  };

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
  <div className="product-container">

    <table className="product-table">
<thead>
  <tr className="product-header-row">
    <th>#</th>
    <th>Imagen</th>
    <th>Título</th>
    <th>Categoría</th>
    <th>Precio</th>
    <th>Rating</th>
    <th>Favorito</th>
  </tr>
</thead>
<tbody>
  {products.map((p) => (
    <tr key={p.id} className="product-row">
      <td>{p.id}</td>
      <td>
        <img
          src={p.image}
          alt={p.title}
          className="product-image"
          style={{ maxWidth: "50px", height: "auto" }}
        />
      </td>
      <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {p.title}
      </td>
      <td>{p.category}</td>
      <td>${p.price.toFixed(2)}</td>
      <td>{p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})</td>
      <td style={{ textAlign: "center" }}>
        <button onClick={() => handleToggle(p)} className="favorite-button" style={{ fontSize: "1.2rem" }}>
          {isFavorite(p.id) ? "❤️" : "🤍"}
        </button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
);

  
};

export default ProductList;                    