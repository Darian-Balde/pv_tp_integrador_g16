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
      <table className="product-table">
        <thead className="product-header-row">
          <tr>
            <th>#</th>
            <th>Favorito</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Rating</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr className="product-row" key={p.id}>
              <td>{p.id}</td>
              <td>
                <button
                  className="favorite-button"
                  onClick={() => handleToggle(p)}
                >
                  {isFavorite(p.id) ? "❤️" : "🤍"}
                </button>
              </td>
              <td>
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
              <td>
                <Link to={`/editar/${p.id}`}>
                  <button style={{ padding: "5px 10px", cursor: "pointer" }}>
                    Editar
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
