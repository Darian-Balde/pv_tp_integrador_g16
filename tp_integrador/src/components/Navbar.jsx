import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/favoritos">Favoritos</Link>
      <Link to="/crear">Crear Producto</Link>
    </nav>
  );
};

export default Navbar;
