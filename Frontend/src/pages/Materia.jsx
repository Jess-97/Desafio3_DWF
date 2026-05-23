import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  LogOut,
} from "lucide-react";
import api from "../api/axios";
import styles from "./Dashboard.module.css";
import "../App.css";

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [form, setForm] = useState({ nombre: "", profesor: { id: "" } });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const [m, p] = await Promise.all([
        api.get("/api/materias"),
        api.get("/api/profesores"),
      ]);
      setMaterias(m.data);
      setProfesores(p.data);
    } catch {
      setError("Error al cargar datos");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {
    if (!form.nombre || !form.profesor.id)
      return setError("Completa todos los campos");
    try {
      const payload = {
        nombre: form.nombre,
        profesor: { id: Number(form.profesor.id) },
      };
      if (editId) {
        await api.put(`/api/materias/${editId}`, payload);
      } else {
        await api.post("/api/materias", payload);
      }
      setForm({ nombre: "", profesor: { id: "" } });
      setEditId(null);
      setError("");
      cargar();
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar materia?")) return;
    try {
      await api.delete(`/api/materias/${id}`);
      cargar();
    } catch {
      setError("Error al eliminar");
    }
  };

  const editar = (m) => {
    setForm({ nombre: m.nombre, profesor: { id: m.profesor?.id || "" } });
    setEditId(m.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar - Mismo diseño */}
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

      {/* Contenido Principal */}
      <main className={styles.main}>
        <header className="page-header">
          <h1>Gestión de Materias</h1>
        </header>

        <div className={styles.panel}>
          <h2>Materias</h2>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <input
              placeholder="Nombre de la materia"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <select
              value={form.profesor.id}
              onChange={(e) =>
                setForm({ ...form, profesor: { id: e.target.value } })
              }
            >
              <option value="">Seleccionar profesor</option>
              {profesores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={guardar}>
              {editId ? "Actualizar" : "Agregar"}
            </button>
            {editId && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  setEditId(null);
                  setForm({ nombre: "", profesor: { id: "" } });
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
                <th>Profesor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nombre}</td>
                  <td>{m.profesor?.nombre || "-"}</td>
                  <td className="gap">
                    <button className="btn-icon edit" onClick={() => editar(m)}>
                      Editar
                    </button>

                    <button
                      className="btn-icon delete"
                      onClick={() => eliminar(m.id)}
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
