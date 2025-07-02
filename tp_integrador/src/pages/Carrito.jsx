import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/CartSlice";
import "../styles/ProductList.css";

const Carrito = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  return (
    <div className="container mt-4">
      <h1 className="product-title-main">Carrito de compras <i className="bi bi-cart"></i></h1>
      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="product-grid">
            {items.map((item) => (
              <li key={item.id} className="product-card" style={{position:'relative'}}>
                <button
                  className="favorite-icon btn-fav"
                  style={{position:'absolute',top:10,right:10}}
                  onClick={() => dispatch(removeFromCart(item.id))}
                  title="Quitar del carrito"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <img src={item.image} alt={item.title} className="product-image" />
                <h2 className="product-name">{item.title}</h2>
                <p className="product-price">${item.price.toFixed(2)} x {item.qty}</p>
                <p style={{fontWeight:600}}>Subtotal: ${(item.price * (item.qty || 1)).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
              <i className="bi bi-cart-x"></i> Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
