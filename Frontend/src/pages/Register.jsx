import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Register.css"; // Usamos el mismo CSS del Login
import imagen from "../assets/education.png";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/api/auth/register", form);
      setSuccess("Usuario registrado. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al registrar");
    }
  };

  return (
    // CAMBIO 1: Clase login-container para el diseño de 2 paneles
    <div className="login-container">
      {/* PANEL IZQUIERDO (Se mantiene fijo) */}
      <div className="login-left">
        <div className="curve-shape"></div>
        <div className="login-brand">
          <h1>
            <span className="white-text">🎓 Sistema</span>

            <br />

            <span className="blue-text">Académico</span>
          </h1>

          <p>
            Gestiona alumnos, profesores
            <br />
            materias y notas
          </p>
          <img src={imagen} alt="education"  className="login-image"/>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="login-right">
        <div className="login-card">
          <h2>Crear Cuenta</h2>
          {error && <div className="error">{error}</div>}
          {success && (
            <div className="success" style={{ color: "green" }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* CAMBIO 2: Envolvemos cada input en un div "input-group" para que el CSS funcione */}
            <div className="input-group">
              <label>Usuario</label>
              <input
                placeholder="Usuario"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Nombre</label>
              <input
                placeholder="Nombre"
                value={form.firstname}
                onChange={(e) =>
                  setForm({ ...form, firstname: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Apellido</label>
              <input
                placeholder="Apellido"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Edad</label>
              <input
                type="number"
                placeholder="Edad"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
              />
            </div>

            <button type="submit">Registrarse</button>
          </form>

          <p className="register-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
