import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/DetalleProductos.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.entities.find((p) => p.id === parseInt(id))
  );

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
        <div className="detalle-contenido">
            <div className="detalle-imagen">
                <img src={product.image} alt={product.title}/>
            </div>

            <div className="detalle-info">
                <h2>{product.title}</h2>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Rating:</strong> {product.rating?.rate ?? "N/A"} ({product.rating?.count ?? 0})</p>
                
                <div className="volver-container">
                    <Link to="/" className="volver-button">Volver al inicio</Link>
                </div>
                
            </div>
                
        </div>
    </div>
  );
};

export default DetalleProducto;
