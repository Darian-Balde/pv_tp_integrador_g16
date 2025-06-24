import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Función auxiliar para validar email simple
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validación simple
  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(form.email)) {
      newErrors.email = "Correo inválido";
    }
    if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    return newErrors;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el email ya está registrado
    const alreadyRegistered = users.some((user) => user.email === form.email);
    if (alreadyRegistered) {
      alert("Ese correo ya está registrado");
      return;
    }

    // Guardar nuevo usuario
    const newUser = { email: form.email, password: form.password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("¡Registro exitoso! Ahora podés iniciar sesión.");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Registro de Usuario</h2>
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
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
