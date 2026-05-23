import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";
import imagen from "../assets/education.png";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await api.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Usuario o contraseña incorrectos",
      );
    }
  };

  return (
    <div className="login-container">
      {/* PANEL IZQUIERDO */}
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
          <h2>Iniciar sesión</h2>

          <span>Ingresa tus credenciales para acceder</span>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Correo electrónico</label>

              <input
                type="text"
                placeholder="ejemplo@correo.com"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>

              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <button type="submit">Iniciar sesión</button>
          </form>

          <p className="register-text">
            ¿No tienes cuenta?
            <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
