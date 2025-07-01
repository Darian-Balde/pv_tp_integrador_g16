import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/FavoritesSlice";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarFilters from "./SidebarFiltros";

const IMAGES_PER_VIEW_DESKTOP = 6;
const IMAGES_PER_VIEW_MOBILE = 2;

const ProductList = () => {
  const { entities: products, loading, error } = useSelector(
    (state) => state.products
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const [imagesPerView, setImagesPerView] = useState(IMAGES_PER_VIEW_DESKTOP);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // NUEVO: Estado para ordenamiento y categoría seleccionada
  const [criterio, setCriterio] = useState("precio");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // NUEVO: Obtener lista única de categorías
  const categoriasDisponibles = [...new Set(products.map((p) => p.category))];

  // Ordena los productos por precio, rating o nombre
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

  // NUEVO: Filtrar productos por categoría seleccionada
  const filtrarProductos = () => {
    if (categoriaSeleccionada === "Todas") return products;
    return products.filter((p) => p.category === categoriaSeleccionada);
  };

  useEffect(() => {
    const handleResize = () => {
      setImagesPerView(
        window.innerWidth < 768 ? IMAGES_PER_VIEW_MOBILE : IMAGES_PER_VIEW_DESKTOP
      );
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

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', width: '100%'}}>
      <div style={{textAlign: 'center'}}>
        <div className="spinner-border text-success mb-2" role="status" style={{width: '3rem', height: '3rem'}}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div style={{fontSize: '1.2rem', color: '#198754'}}>Cargando productos…</div>
      </div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="product-container" style={{ display: "flex", gap: "1.5rem" }}>
      {/* Sidebar ahora recibe criterio y setCriterio */}
      <SidebarFilters
        categorias={categoriasDisponibles}
        seleccionarCategoria={setCategoriaSeleccionada}
        categoriaActiva={categoriaSeleccionada}
        criterio={criterio}
        setCriterio={setCriterio}
      />
      <div style={{ flex: 1 }}>
        <div className="fullwidth-banner mb-1">
          <div className="bg-success bg-opacity-75 text-white text-center py-2 fs-4 fw-bold" style={{ letterSpacing: 1 }}>
            ¡20% de descuento en ropa de abrigos!
          </div>
        </div>
        <div
          className="fullwidth-carousel d-flex justify-content-center align-items-center"
          style={{
            overflow: "hidden",
            minHeight: 200,
            background: "linear-gradient(90deg, #e4f0e8 0%, #c8e6c9 100%)",
          }}
        >
          <div className="d-flex w-100 justify-content-center align-items-center" style={{ gap: 0 }}>
            {getCarouselImages().map((p) => (
              <div
                key={p.id}
                style={{
                  flex: `0 0 ${100 / imagesPerView}%`,
                  maxWidth: `${100 / imagesPerView}%`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "opacity 0.7s",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                    maxWidth: "90%",
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px rgba(46,93,59,0.08)",
                    padding: 8,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="fullwidth-banner mb-3 mt-1">
          <div className="bg-success bg-opacity-75 text-white text-center py-2 fs-4 fw-bold" style={{ letterSpacing: 1 }}>
            ¡Aprovechá la promo antes que se termine!
          </div>
        </div>
        <h1 className="product-title-main">Lista de Productos 🛍️</h1>

        {/* NUEVO: Filtramos y luego ordenamos */}
        <div className="product-grid">
          {ordenarProductos(filtrarProductos()).map((p) => (
            <div className="product-card" key={p.id}>
              <button
                className={`favorite-icon btn-fav ${isFavorite(p.id) ? "active" : ""}`}
                onClick={() => handleToggle(p)}
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
              <div className="botones-lista">
                <Link to={`/detalle/${p.id}`} className="no-underline">
                  <button className="btn-detalle">
                    <i className="bi bi-info-circle"></i> Ver más
                  </button>
                </Link>
                <Link to={`/editar/${p.id}`} className="no-underline">
                  <button className="btn-editar">
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="fin-lista">Ha alcanzado el final de la lista. ✨</p>
      </div>
    </div>
  );
};

export default ProductList;
