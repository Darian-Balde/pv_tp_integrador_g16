import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

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

  const [showPassword, setShowPassword] = useState(false); // mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // para confirmar contraseña

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
    <div className="contenedor-formulario">
  <h2 className="titulo-formulario">Registro de Usuario</h2>
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
      {errors.email && <div className="texto-error">{errors.email}</div>}
    </div>

<div className="mb-3">
  <label className="etiqueta">Contraseña:</label>
  <div className="campo-con-ojito">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={form.password}
      onChange={handleChange}
      className="campo"
      required
    />
    <i
      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} ojito-icono`}
      onClick={() => setShowPassword(!showPassword)}
      title="Mostrar/Ocultar contraseña"
    ></i>
  </div>
  {errors.password && <div className="texto-error">{errors.password}</div>}
</div>


  <div className="mb-3">
  <label className="etiqueta">Confirmar Contraseña:</label>
  <div className="campo-con-ojito">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      className="campo"
      required
    />
    <i
      className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} ojito-icono`}
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      title="Mostrar/Ocultar contraseña"
    ></i>
  </div>
  {errors.confirmPassword && (
    <div className="texto-error">{errors.confirmPassword}</div>
  )}
</div>

    <button type="submit" className="boton">
      Registrarse
    </button>
  </form>
</div>

  );
};

export default Register;
