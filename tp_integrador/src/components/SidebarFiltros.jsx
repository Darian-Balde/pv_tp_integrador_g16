import React from "react";
import "../styles/SidebarFiltros.css";

const SidebarFilters = ({ categorias, seleccionarCategoria, categoriaActiva, criterio, setCriterio }) => {
  return (
    <aside className="sidebar-filters">
      <div className="filter-section">
        <h5>Categorías</h5>
        <ul className="filter-list">
          <li
            className={categoriaActiva === "Todas" ? "activa" : ""}
            onClick={() => seleccionarCategoria("Todas")}
          >
            Todas las categorías
          </li>
          {categorias.map((cat, i) => (
            <li
              key={i}
              className={categoriaActiva === cat ? "activa" : ""}
              onClick={() => seleccionarCategoria(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h5>Ordenar por</h5>
        <ul className="filter-list">
          <li className={criterio === "precio" ? "activa" : ""} onClick={() => setCriterio("precio")}>
            Precio
          </li>
          <li className={criterio === "rating" ? "activa" : ""} onClick={() => setCriterio("rating")}>
            Rating
          </li>
          <li className={criterio === "nombre" ? "activa" : ""} onClick={() => setCriterio("nombre")}>
            Nombre
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarFilters;
