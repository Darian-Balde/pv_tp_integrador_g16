import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice";
import "../styles/FavoriteList.css";

const FavoritesList = () => {
    const favorites = useSelector((state) => state.favorites.items);
    const dispatch = useDispatch();

    const handleToggle = (product) => {
        dispatch(toggleFavorite(product));
    };

    if (!favorites.length) return <p>No hay productos favoritos.</p>;

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Favoritos</h2>
            <div className="favorites-list">
                {favorites.map((p) => (
                    <div key={p.id} className="favorite-card">
                        <button
                            onClick={() => handleToggle(p)}  className="favorite-button"
                            title="Quitar de favoritos"
                        >
                            ❤️
                        </button>
                        
                        <img src={p.image} alt={p.title} className="favorite-image" />
                        <div className="favorite-info">
                            <h3 className="favorite-title">{p.title}</h3>
                            <p className="favorite-category">Categoría: {p.category}</p>
                            <p className="favorite-price">Precio: ${p.price.toFixed(2)}</p>
                            <p className="favorite-rating">
                                Calificación: {p.rating && p.rating.rate ? p.rating.rate : "N/A"} (
                                {p.rating && p.rating.count ? p.rating.count : 0})
                            </p>
                                


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
