import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../FavoritesSlice";

const ProductList = () => {
  const { entities: products, loading, error } = useSelector(
    (state) => state.products
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const handleToggle = (product) => {
    dispatch(toggleFavorite(product));
  };

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Favorito</th>
          <th>Imagen</th>
          <th>Título</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
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
                {isFavorite(p.id) ? "❤️" : "🤍"}
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
            <td>${p.price.toFixed(2)}</td>
            <td>
              {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
