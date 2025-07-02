import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { addToCart } from "../store/CartSlice";
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
        <div className="detalle-imagen">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detalle-info">
          <div className="detalle-header">
            <h2 className="detalle-titulo-verde">{product.title}</h2>
            <button
              className={`favorite-icon btn-fav${isFavorite(product.id) ? " active" : ""}`}
              onClick={() => handleToggle(product)}
              title={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <i className={`bi ${isFavorite(product.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
            </button>
          </div>
          <p className="detalle-categoria">
            Categoría: <span className="valor">{product.category}</span>
          </p>
          <p className="detalle-precio">
            Precio: <span className="valor">${product.price}</span>
          </p>
          <p className="detalle-descripcion">
            <strong>Descripción:</strong> {product.description}
          </p>
          <p className="detalle-rating">
            Rating:{" "}
            <span className="valor">
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
            </span>
          </p>
          <div className="detalle-botones">
            <button className="btn btn-agregar-carrito" onClick={() => dispatch(addToCart(product))}>
              <i className="bi bi-bag-plus"></i> Agregar al carrito
            </button>
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
