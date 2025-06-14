import { Link } from "react-router-dom";
import "./Navbar.css";
import React, { useState } from "react";
import womanLogo from "../assets/woman.png"; // 👉 importá la imagen

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-izq">
        <div className="hamburguesa" onClick={toggleMenu}>
          ☰
        </div>
        <Link to="/" className="logo-home">
          <img src={womanLogo}  alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/favoritos" onClick={() => setIsOpen(false)}>Favoritos</Link>
        <Link to="/crear" onClick={() => setIsOpen(false)}>Crear Producto</Link>
      </div>
    </nav>
  );
};

export default Navbar;
