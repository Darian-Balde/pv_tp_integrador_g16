import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import womanLogo from "../assets/woman.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const user = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + (item.qty || 1), 0)
  );
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg" style={{ height: 70 }}>
      <div className="container-fluid">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={womanLogo}
            alt="Logo"
            className="me-2"
            style={{ width: 40, height: 40 }}
          />
          <span
            className="tp-title-navbar"
            style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}
          >
            TP Integrador
          </span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú Escritorio */}
        <div className="desktop-menu d-none d-lg-block">
          <ul className="navbar-nav ms-auto align-items-stretch">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-tab d-flex align-items-center">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/favoritos" className="nav-link nav-link-tab d-flex align-items-center">Favoritos</Link>
            </li>
            <li className="nav-item">
              <Link to="/crear" className="nav-link nav-link-tab d-flex align-items-center">Crear Producto</Link>
            </li>
            <li className="nav-item position-relative">
              <Link
                to="/carrito"
                className="nav-link nav-link-tab d-flex align-items-center"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <i className="bi bi-bag" style={{ fontSize: "1.3rem" }}></i>
                  {cartCount > 0 && (
                    <span
                      className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.7rem", zIndex: 10, top: "15%" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </span>
                <span style={{ lineHeight: "1", marginLeft: "0.4em" }}>Carrito</span>
              </Link>
            </li>

            {user && (
              <li className="nav-item d-flex align-items-center mx-2">
                <span className="badge rounded-pill bg-light text-success px-3 py-2" title={user.email}>
                  <i className="bi bi-person-circle me-1"></i>
                 {user.nombre ? user.nombre : user.email}
                </span>
              </li>
            )}

            {!user && (
              <>
                <li className="nav-item d-flex align-items-center">
                  <Link to="/login" className="btn btn-outline-success mx-1 my-1">Iniciar sesión</Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <Link to="/register" className="btn btn-success mx-1 my-1">Registrarse</Link>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item d-flex align-items-center">
                <Link
                  to="/login"
                  className="btn btn-danger mx-1 my-1"
                  onClick={() => {
                    localStorage.removeItem("sessionUser");
                    dispatch(logoutUser());
                  }}
                >
                  Cerrar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Menú Responsive */}
        {isOpen && (
          <div className="mobile-menu">
            <ul>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)} className={location.pathname === "/" ? "active-mobile" : ""}>
                  INICIO
                </Link>
              </li>
              <li>
                <Link to="/favoritos" onClick={() => setIsOpen(false)} className={location.pathname === "/favoritos" ? "active-mobile" : ""}>
                  FAVORITO
                </Link>
              </li>
              <li>
                <Link to="/crear" onClick={() => setIsOpen(false)} className={location.pathname === "/crear" ? "active-mobile" : ""}>
                  CREAR PRODUCTO
                </Link>
              </li>
              
              <li style={{ position: "relative" }}>
                <Link
                  to="/carrito"
                  onClick={() => setIsOpen(false)}
                  className={location.pathname === "/carrito" ? "active-mobile" : ""}
                  style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
                >
                  <span style={{ position: "relative", display: "flex", alignItems: "center" }}></span>
                  <i className="bi bi-bag position-relative" style={{ fontSize: "1.3rem" }}>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.7rem", zIndex: 10, top: "15%" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </i>
                  CARRITO
                </Link>
              </li>

              {!user ? (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(false)} className={location.pathname === "/login" ? "active-mobile" : ""}>
                      INICIAR SESIÓN
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setIsOpen(false)} className={location.pathname === "/register" ? "active-mobile" : ""}>
                      REGISTRARSE
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ color: "#9ee9be" }}>{user.nombre}</li>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => {
                        localStorage.removeItem("sessionUser");
                        dispatch(logoutUser());
                        setIsOpen(false);
                      }}
                    >
                      CERRAR SESIÓN
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
