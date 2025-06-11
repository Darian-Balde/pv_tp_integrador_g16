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
          <th>Favorito</th>
          <th>Imagen</th>
          <th>Título</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="product-row">
            <td className="product-id">{p.id}</td>
            <td style={{ textAlign: "center" }} className="favorite-cell">
              <button
                onClick={() => handleToggle(p)}
                className="favorite-button"
              >
                {isFavorite(p.id) ? "❤️" : "🤍"}
              </button>
            </td>
            <td className="image-cell">
              <img
                src={p.image}
                alt={p.title}
                className="product-image"
              />
            </td>
            <td className="product-title">{p.title}</td>
            <td className="product-category">{p.category}</td>
            <td className="product-price">${p.price.toFixed(2)}</td>
            <td className="product-rating">
              {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

  
};

export default ProductList;                    