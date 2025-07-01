import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";
import "bootstrap/dist/css/bootstrap.min.css";

const IMAGES_PER_VIEW_DESKTOP = 6;
const IMAGES_PER_VIEW_MOBILE = 2;

const ProductList = () => {
  const { entities: products, loading, error } = useSelector(
    (state) => state.products
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // Responsive: cuántas imágenes mostrar
  const [imagesPerView, setImagesPerView] = useState(IMAGES_PER_VIEW_DESKTOP);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerView(window.innerWidth < 768 ? IMAGES_PER_VIEW_MOBILE : IMAGES_PER_VIEW_DESKTOP);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carrusel automático
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setCarouselIdx((prev) =>
        (prev + imagesPerView) % products.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [products.length, imagesPerView]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const handleToggle = (product) => {
    dispatch(toggleFavorite(product));
  };

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  // Obtener las imágenes a mostrar en el carrusel
  const getCarouselImages = () => {
    let imgs = [];
    for (let i = 0; i < imagesPerView; i++) {
      const idx = (carouselIdx + i) % products.length;
      imgs.push(products[idx]);
    }
    return imgs;
  };

  return (
    <div className="product-container">
      {/* Mensaje superior */}
      <div className="fullwidth-banner mb-1">
        <div className="bg-success bg-opacity-75 rounded-0 text-white shadow text-center py-2 fs-4 fw-bold" style={{letterSpacing: 1}}>
          ¡20% de descuento en ropa de abrigos!
        </div>
      </div>

      {/* Carrusel tipo slider */}
      <div
        className="fullwidth-carousel d-flex justify-content-center align-items-center"
        style={{
          overflow: "hidden",
          minHeight: 200,
          background: "linear-gradient(90deg, #e4f0e8 0%, #c8e6c9 100%)",
        }}
      >
        <div
          className="d-flex w-100 justify-content-center align-items-center"
          style={{ gap: 0 }}
        >
          {getCarouselImages().map((p) => (
            <div
              key={p.id}
              style={{
                flex: `0 0 ${100 / imagesPerView}%`,
                maxWidth: `${100 / imagesPerView}%`,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.7s",
                padding: 0,
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  maxHeight: 120,
                  objectFit: "contain",
                  maxWidth: "90%",
                  width: "100%",
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 12px 0 rgba(46,93,59,0.08)",
                  padding: 8,
                  margin: "0 auto",
                  display: "block"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje inferior */}
      <div className="fullwidth-banner mb-3 mt-1">
        <div className="bg-success bg-opacity-75 rounded-0 text-white shadow text-center py-2 fs-4 fw-bold" style={{letterSpacing: 1}}>
          ¡Aprovechá la promo antes que se termine!
        </div>
      </div>

      <h1 className="product-title-main">Lista de Productos 🛍️</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            {/* Corazón Bootstrap */}
            <button
              className={`favorite-icon btn-fav ${isFavorite(p.id) ? "active" : ""}`}
              onClick={() => handleToggle(p)}
              title={isFavorite(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <i className={`bi ${isFavorite(p.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
            </button>
            <img src={p.image} alt={p.title} className="product-image" />
            <h2 className="product-name">{p.title}</h2>
            {/* Rating en estrellas */}
            <div className="mb-1">
              {(() => {
                const rate = p.rating?.rate ?? 0;
                const fullStars = Math.floor(rate);
                const halfStar = rate - fullStars >= 0.5;
                const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                return (
                  <>
                    {[...Array(fullStars)].map((_, i) => (
                      <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
                    ))}
                    {halfStar && <i className="bi bi-star-half text-warning"></i>}
                    {[...Array(emptyStars)].map((_, i) => (
                      <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
                    ))}
                    <span className="ms-1 text-secondary" style={{ fontSize: "0.95rem" }}>
                      {rate.toFixed(1)} ({p.rating?.count ?? 0})
                    </span>
                  </>
                );
              })()}
            </div>
            <p className="product-price">${p.price.toFixed(2)}</p>
            <div className="botones-lista">
              <Link to={`/detalle/${p.id}`} className="no-underline">
                <button className="btn-detalle" title="Ver detalles">
                  <i className="bi bi-info-circle"></i> Ver más
                </button>
              </Link>
              <Link to={`/editar/${p.id}`} className="no-underline">
                <button className="btn-editar" title="Editar producto">
                  <i className="bi bi-pencil-square"></i> Editar
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="fin-lista">Ha alcanzado el final de la lista. ✨</p>
    </div>
  );
};

export default ProductList;
