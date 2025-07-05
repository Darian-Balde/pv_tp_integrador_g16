import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { addToCart } from "../store/CartSlice";
import "../styles/DetalleProductos.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.entities.find((p) => p.id === parseInt(id))
  );
  const favorites = useSelector((state) => state.favorites.items);
  const lastAdded = useSelector((state) => state.cart.lastAdded);
  const [showAlert, setShowAlert] = useState(false);

  // Scroll al top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Alerta al agregar al carrito
  useEffect(() => {
    if (lastAdded?.id === product?.id) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastAdded, product]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);
  const handleToggle = () => dispatch(toggleFavorite(product));
  const handleAddToCart = () => dispatch(addToCart(product));
  const volverA = location.state?.from || "/";

  if (!product) {
    return (
      <div className="detalle-container">
        <p className="text-danger fs-4">⚠ Producto no encontrado.</p>
        <Link to="/" className="btn btn-secondary mt-3">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ALERTA agregado al carrito */}
      {showAlert && lastAdded && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20000,
            minWidth: 280,
            maxWidth: 400,
            width: "90vw",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
            style={{ pointerEvents: "auto" }}
          >
            <strong>{lastAdded.title}</strong> fue agregado al carrito.
          </div>
        </div>
      )}

      <div className="detalle-container">
        <div className="detalle-contenido">
          {/* Imagen */}
          <div className="detalle-imagen">
            <img src={product.image} alt={product.title} />
          </div>

          {/* Información */}
          <div className="detalle-info">
            <div className="detalle-header">
              <h2 className="detalle-titulo-verde">{product.title}</h2>
              <button
                className={`favorite-icon btn-fav${isFavorite(product.id) ? " active" : ""}`}
                onClick={handleToggle}
                title={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <i className={`bi ${isFavorite(product.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
              </button>
            </div>

            <p className="detalle-categoria">
              Categoría: <span className="valor">{product.category}</span>
            </p>
            <p className="detalle-precio">
              Precio: <span className="valor">${product.price.toFixed(2)}</span>
            </p>
            <p className="detalle-descripcion">
              <strong>Descripción:</strong> {product.description}
            </p>

            <p className="detalle-rating">
              Rating:
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

            {/* Botones */}
            <div className="detalle-botones">
              <button className="btn btn-agregar-carrito" onClick={handleAddToCart}>
                <i className="bi bi-bag-plus"></i> Agregar al carrito
              </button>
              <Link to={volverA} className="btn btn-volver">
                <i className="bi bi-arrow-left-circle"></i> Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleProducto;
