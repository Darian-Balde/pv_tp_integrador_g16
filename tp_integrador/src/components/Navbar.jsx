import { Link } from "react-router-dom";
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
  const dispatch = useDispatch();

  return (
  <nav
    className="navbar navbar-expand-lg"
    style={{
      fontFamily: "'Montserrat', Arial, sans-serif",
      height: 70,
      background: "linear-gradient(90deg, #6bbf7b 0%, #4e9e5d 100%)",
    }}
  >
    <div className="container-fluid">
      {/* Logo */}
      <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => setIsOpen(false)}>
        <img src={womanLogo} alt="Logo" className="me-2" style={{ width: 40, height: 40 }} />
        <span style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>TP Integrador</span>
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
            <Link to="/" className="nav-link nav-link-tab">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/favoritos" className="nav-link nav-link-tab">Favoritos</Link>
          </li>
          <li className="nav-item">
            <Link to="/crear" className="nav-link nav-link-tab">Crear Producto</Link>
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

      {/* Menú Móvil */}
      {isOpen && (
        <div className="mobile-menu">
          <ul>
            <li><Link to="/" onClick={() => setIsOpen(false)} className="active">INICIO</Link></li>
            <li><Link to="/favoritos" onClick={() => setIsOpen(false)}>FAVORITO</Link></li>
            <li><Link to="/crear" onClick={() => setIsOpen(false)}>SERVICIOS</Link></li>
            <li><Link to="/portafolio" onClick={() => setIsOpen(false)}>PORTAFOLIO</Link></li>
            <li><Link to="/contacto" onClick={() => setIsOpen(false)}>CONTACTO</Link></li>
            {!user ? (
              <>
                <li><Link to="/login" onClick={() => setIsOpen(false)}>INICIAR SESIÓN</Link></li>
                <li><Link to="/register" onClick={() => setIsOpen(false)}>REGISTRARSE</Link></li>
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
