import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { Link } from "react-router-dom";
import "../styles/FavoriteList.css";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const handleToggle = (product) => {
    dispatch(toggleFavorite(product));
  };

  if (!favorites.length) return <p>No hay productos favoritos.</p>;

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Favoritos</h2>
      <div className="favorites-list">
        {favorites.map((p) => (
          <div key={p.id} className="favorite-card">
            <button
              onClick={() => handleToggle(p)}
              className={`favorite-icon btn-fav${favorites.some(f => f.id === p.id) ? " active" : ""}`}
              title="Quitar de favoritos"
            >
              <i className={`bi ${favorites.some(f => f.id === p.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
            </button>

            <img src={p.image} alt={p.title} className="favorite-image" />
            <div className="favorite-info">
              <h3 className="favorite-title">{p.title}</h3>
              <p className="favorite-category">
                Categoría: <span className="valor">{p.category}</span>
              </p>
              <p className="favorite-price">
                Precio: <span className="valor">${p.price.toFixed(2)}</span>
              </p>
              <p className="favorite-rating">
                Calificación:{" "}
                <span className="valor">
                  {(() => {
                    const rate = p.rating?.rate ?? 0;
                    const full = Math.floor(rate);
                    const half = rate - full >= 0.5;
                    const empty = 5 - full - (half ? 1 : 0);
                    return (
                      <>
                        {[...Array(full)].map((_, i) => (
                          <i key={`f-${i}`} className="bi bi-star-fill text-warning"></i>
                        ))}
                        {half && <i className="bi bi-star-half text-warning"></i>}
                        {[...Array(empty)].map((_, i) => (
                          <i key={`e-${i}`} className="bi bi-star text-warning"></i>
                        ))}
                        <span className="ms-1 text-secondary" style={{ fontSize: "0.95rem" }}>
                          {rate.toFixed(1)} ({p.rating?.count ?? 0})
                        </span>
                      </>
                    );
                  })()}
                </span>
              </p>
              <div className="botones-lista">
                <Link to={`/detalle/${p.id}`} className="no-underline">
                  <button className="btn-detalle">
                    <i className="bi bi-info-circle"></i> Ver más
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
