import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { Link, useLocation } from "react-router-dom";
import { addToCart, clearLastAdded } from "../store/CartSlice";
import "../styles/ProductList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarFilters from "./SidebarFiltros";

const IMAGES_PER_VIEW_DESKTOP = 6;
const IMAGES_PER_VIEW_MOBILE = 2;

const ProductList = () => {
  const { entities: products, loading, error } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const lastAdded = useSelector((state) => state.cart.lastAdded);
  const dispatch = useDispatch();
  const location = useLocation();

  const [imagesPerView, setImagesPerView] = useState(IMAGES_PER_VIEW_DESKTOP);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [criterio, setCriterio] = useState("precio");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animatingId, setAnimatingId] = useState(null);
  const timeoutRef = useRef();

  const [showAlert, setShowAlert] = useState(false); 

  const categoriasDisponibles = [...new Set(products.map((p) => p.category))];

  const ordenarProductos = (productos) => {
    const copia = [...productos];
    switch (criterio) {
      case "precio":
        return copia.sort((a, b) => a.price - b.price);
      case "rating":
        return copia.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
      case "nombre":
        return copia.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copia;
    }
  };

  const filtrarProductos = () => {
    if (categoriaSeleccionada === "Todas") return products;
    return products.filter((p) => p.category === categoriaSeleccionada);
  };

  useEffect(() => {
    const handleResize = () => {
      setImagesPerView(window.innerWidth < 768 ? IMAGES_PER_VIEW_MOBILE : IMAGES_PER_VIEW_DESKTOP);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + imagesPerView) % products.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [products.length, imagesPerView]);

  useEffect(() => {
    if (lastAdded) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearLastAdded());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastAdded, dispatch]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);
  const handleToggle = (product) => dispatch(toggleFavorite(product));

  const getCarouselImages = () => {
    const imgs = [];
    for (let i = 0; i < imagesPerView; i++) {
      const idx = (carouselIdx + i) % products.length;
      imgs.push(products[idx]);
    }
    return imgs;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAnimatingId(product.id);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnimatingId(null), 600);
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-success mb-2" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div style={{ fontSize: "1.2rem", color: "#198754" }}>Cargando productos…</div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="product-container" style={{ display: "flex", gap: "1.5rem" }}>
      <div style={{ flex: 1 }}>
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
              pointerEvents: "none"
            }}
          >
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ pointerEvents: "auto" }}>
              <strong>{lastAdded.title}</strong> fue agregado al carrito.
            </div>
          </div>
        )}

        {/* Banners */}
        <div className="fullwidth-banner mb-1">
          <div className="bg-success bg-opacity-75 text-white text-center py-2 fs-4 fw-bold">
            ¡20% de descuento por tiempo limitado!
          </div>
        </div>

        {/* Carrusel */}
        <div className="fullwidth-carousel d-flex justify-content-center align-items-center">
          <div className="d-flex w-100 justify-content-center align-items-center">
            {getCarouselImages().map((p) => (
              <div
                key={p.id}
                className="carousel-image-wrapper"
                style={{
                  flex: `0 0 ${100 / imagesPerView}%`,
                  maxWidth: `${100 / imagesPerView}%`,
                }}
              >
                <img src={p.image} alt={p.title} className="carousel-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="fullwidth-banner mb-3 mt-1">
          <div className="bg-success bg-opacity-75 text-white text-center py-2 fs-4 fw-bold">
            ¡Aprovechá la promo antes que se termine!
          </div>
        </div>

        {/* Filtros móviles */}
        <div className="btn-filtro-abajo">
          <button className="btn btn-success" onClick={() => setSidebarOpen(true)}>
            <i className="bi bi-filter"></i> Filtros
          </button>
        </div>

        <h1 className="product-title-main">Lista de Productos 🛍️</h1>

        <div className="product-grid">
          {ordenarProductos(filtrarProductos()).map((p) => (
            <div className="product-card" key={p.id}>
              <Link
                to={`/detalle/${p.id}`}
                state={{ from: location.pathname }}
                className="no-underline card-link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <button
                  className={`favorite-icon btn-fav ${isFavorite(p.id) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggle(p);
                  }}
                  title={isFavorite(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <i className={`bi ${isFavorite(p.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
                </button>
                <img src={p.image} alt={p.title} className="product-image" />
                <h2 className="product-name">{p.title}</h2>
                <div className="mb-1">
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
                </div>
                <p className="product-price">${p.price.toFixed(2)}</p>
              </Link>
              
           <div className="botones-lista">
                <Link to={`/editar/${p.id}`} className="no-underline">
                  <button className="btn-editar">
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                </Link>
                <button
                  className={`btn-carrito${animatingId === p.id ? " animating" : ""}`}
                  title="Agregar al carrito"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(p);
                  }}
                >
                  <i className="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="fin-lista">Ha alcanzado el final de la lista. ✨</p>

        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
            <div className="sidebar-panel" onClick={(e) => e.stopPropagation()}>
              <SidebarFilters
                categorias={categoriasDisponibles}
                seleccionarCategoria={setCategoriaSeleccionada}
                categoriaActiva={categoriaSeleccionada}
                criterio={criterio}
                setCriterio={setCriterio}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
