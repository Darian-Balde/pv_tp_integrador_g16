/*Para que se muestre los productos marcados*/

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice";
import "../styles/ProductList.css";

const FavoritesList = () => {
    const favorites = useSelector((state) => state.favorites.items);
    const dispatch = useDispatch();

    const handleToggle = (product) => {
        dispatch(toggleFavorite(product));
    };

    if (!favorites.length) return <p>No hay productos favoritos.</p>;

    return (
        <div className="product-container">
            <h2>Favoritos</h2>
            <table className="product-table">
                <thead>
                    <tr className="product-header-row">
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Rating</th>
                        <th>Favorito</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map((p) => (
                        <tr key={p.id} className="product-row">
                            <td>{p.id}</td>
                            <td>
                                <img src={p.image} alt={p.title} className="product-image" />
                            </td>
                            <td>{p.title}</td>
                            <td>{p.category}</td>
                            <td>${p.price.toFixed(2)}</td>
                            <td>{p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})</td>
                            <td style={{ textAlign: "center" }}>
                                <button onClick={() => handleToggle(p)} className="favorite-button">
                                    ❤️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavoritesList;
