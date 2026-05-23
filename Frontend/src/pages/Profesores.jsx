import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import api from "../api/axios";
import styles from "./Dashboard.module.css"; // Importa los mismos estilos
import "../App.css";

export default function Profesores() {
  const [profesores, setProfesores] = useState([]);
  const [form, setForm] = useState({ nombre: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const res = await api.get("/api/profesores");
      setProfesores(res.data);
    } catch {
      setError("Error al cargar profesores");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {
    if (!form.nombre) return setError("Ingresa el nombre");
    try {
      if (editId) {
        await api.put(`/api/profesores/${editId}`, form);
      } else {
        await api.post("/api/profesores", form);
      }
      setForm({ nombre: "" });
      setEditId(null);
      setError("");
      cargar();
    } catch {
      setError("Error al guardar");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar profesor?")) return;
    await api.delete(`/api/profesores/${id}`);
    cargar();
  };

  const editar = (p) => {
    setForm({ nombre: p.nombre });
    setEditId(p.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar - Mismo diseño que el resto del sistema */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>🎓Sistema Académico</div>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/dashboard">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link className={styles.navLink} to="/alumnos">
            <Users size={20} /> Alumnos
          </Link>
          <Link className={styles.navLink} to="/profesores">
            <GraduationCap size={20} /> Profesores
          </Link>
          <Link className={styles.navLink} to="/materias">
            <BookOpen size={20} /> Materias
          </Link>
          <Link className={styles.navLink} to="/notas">
            <FileText size={20} /> Notas
          </Link>
        </nav>
        <div className={styles.footerNav}>
          <button
            className={styles.navLink}
            onClick={logout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </aside>

     <main className={styles.main}>

  <header className="page-header">
    <h1>Gestión de Profesores</h1>
  </header>

  <div className={styles.panel}>
    <h2>Profesores</h2>

    {error && <div className="error">{error}</div>}

    <div className="form-group">
      <input
        placeholder="Nombre del profesor"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <button className="btn btn-primary" onClick={guardar}>
        {editId ? "Actualizar" : "Agregar"}
      </button>

      {editId && (
        <button
          className="btn btn-warning"
          onClick={() => {
            setEditId(null);
            setForm({ nombre: "" });
          }}
        >
          Cancelar
        </button>
      )}
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {profesores.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td className="gap">
              <button className="btn-icon edit" onClick={() => editar(p)}>
                Editar
              </button>

              <button
                className="btn-icon delete"
                onClick={() => eliminar(p.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
</main>
    </div>
  );
}
