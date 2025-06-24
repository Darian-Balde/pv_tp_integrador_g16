import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../userSlice"; // ✅ importamos acción

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (user) =>
        user.email === form.email && user.password === form.password
    );

    if (userFound) {
      // Guardar sesión en localStorage
      localStorage.setItem("sessionUser", JSON.stringify(userFound));

      // ✅ Actualizar Redux
      dispatch(loginUser(userFound));

      alert("¡Bienvenido!");
      navigate("/");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
