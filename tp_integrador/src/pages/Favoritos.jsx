import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice";

const Favoritos = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  console.log("favoritos actuales:", favorites);

  const handleToggle = (product) => {
    dispatch(toggleFavorite(product));
  };

  if (!favorites.length) return <p>No hay productos favoritos.</p>;

  return (
    <div>
      <h2>Mis Favoritos ❤️</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Quitar</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleToggle(p)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                >
                  ❌
                </button>
              </td>
              <td>
                <img
                  src={p.image}
                  alt={p.title}
                  width="60"
                  height="60"
                  style={{ objectFit: "contain" }}
                />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>${Number(p.price).toFixed(2)}</td>
              <td>
                {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favoritos;
