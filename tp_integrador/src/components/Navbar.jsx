import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import React, { useState } from "react";
import womanLogo from "../assets/woman.png"; // 👉 importá la imagen
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="navbar-izq">
        <div className="hamburguesa" onClick={toggleMenu}>
          ☰
        </div>
        <Link to="/" className="logo-home">
          <img src={womanLogo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/favoritos" onClick={() => setIsOpen(false)}>Favoritos</Link>
        <Link to="/crear" onClick={() => setIsOpen(false)}>Crear Producto</Link>
        {user && (
          <span className="navbar-user">Bienvenido, {user.email}</span>
        )}
        {!user && (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Registrarse</Link>
          </>
        )}
          {user && (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("sessionUser");
                dispatch(logoutUser());
                setIsOpen(false);
              }}
            >
            Cerrar sesión
            </Link>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
