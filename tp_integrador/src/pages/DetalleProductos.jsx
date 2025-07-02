import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import "../styles/DetalleProductos.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.entities.find((p) => p.id === parseInt(id))
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = (id) => favorites.some((item) => item.id === id);
  const handleToggle = (product) => dispatch(toggleFavorite(product));

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-contenido">
        {/* Botón favorito arriba a la derecha */}
        <button
          className={`favorite-icon btn-fav ${isFavorite(product.id) ? "active" : ""}`}
          onClick={() => handleToggle(product)}
          title={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <i className={`bi ${isFavorite(product.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
        <div className="detalle-imagen">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detalle-info">
          <h2 className="detalle-titulo-verde">{product.title}</h2>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p>
            <strong>Rating:</strong>{" "}
            {(() => {
              const rate = product.rating?.rate ?? 0;
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
                    {rate.toFixed(1)} ({product.rating?.count ?? 0})
                  </span>
                </>
              );
            })()}
          </p>
          <div className="volver-container">
            <Link to="/" className="btn btn-volver">
              <i className="bi bi-arrow-left-circle"></i> Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
