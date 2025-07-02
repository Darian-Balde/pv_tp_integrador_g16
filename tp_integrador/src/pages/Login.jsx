import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
import "../styles/Login.css";
import { useAlert } from "../components/AlertContext"; // 👈 Importa el hook

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert(); // 👈 Usa el hook

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
      localStorage.setItem("sessionUser", JSON.stringify(userFound));
      dispatch(loginUser(userFound));
      showAlert("¡Bienvenido!", "success"); // 👈 Usa la alerta global
      setTimeout(() => navigate("/"), 1200); // 👈 Espera el tiempo de la alerta
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo-formulario">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="etiqueta">Correo:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control campo"
            required
          />
        </div>

        <div className="mb-3">
          <label className="etiqueta">Contraseña:</label>
          <div className="contenedor-ojito">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control campo"
              required
              style={{ paddingRight: "2.5rem" }}
            />
            <button
              type="button"
              className="btn-icon-ojito"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label="Mostrar/Ocultar contraseña"
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </div>

        {error && <div className="texto-error mb-3">{error}</div>}

        <button type="submit" className="btn boton">
          Ingresar
        </button>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta?{" "}
          <a href="/register" className="link-registrarse">Registrate</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
