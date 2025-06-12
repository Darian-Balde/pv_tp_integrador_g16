import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice"; 
import { Link } from "react-router-dom";
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
      <h1 className="product-title-main">Lista de Productos 🛍️</h1>
      <div className="product-grid">
       {products.map((p) => (
        <div className="product-card" key={p.id}>
          <div className="favorite-icon" onClick={() => handleToggle(p)}>
            {isFavorite(p.id) ? "❤️" : "🤍"}
          </div>
          <img src={p.image} alt={p.title} className="product-image" />
          <h2 className="product-name">{p.title}</h2>
          <p className="product-category">{p.category}</p>
          <p className="product-price">${p.price.toFixed(2)}</p>
          <p className="product-rating">
            {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
          </p>
          <Link to={`/editar/${p.id}`}>
            <button className="edit-button">Editar</button>
          </Link>
        </div>
        ))}
      </div>
        <p className="fin-lista">Ha alcanzado el final de la lista. ✨</p>

    </div>
  );
};

export default ProductList;
