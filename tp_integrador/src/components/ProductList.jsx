import React from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { entities: products, loading, error } = useSelector(
    (state) => state.products
  );

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
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
    </div>
  );
};

export default ProductList;
