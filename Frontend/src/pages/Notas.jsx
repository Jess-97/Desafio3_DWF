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

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    valor: "",
    alumno: { id: "" },
    materia: { id: "" },
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const [n, a, m] = await Promise.all([
        api.get("/api/notas"),
        api.get("/api/alumnos"),
        api.get("/api/materias"),
      ]);
      setNotas(n.data);
      setAlumnos(a.data);
      setMaterias(m.data);
    } catch {
      setError("Error al cargar datos");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {
    if (!form.valor || !form.alumno.id || !form.materia.id)
      return setError("Completa todos los campos");
    try {
      if (editId) {
        await api.put(`/api/notas/${editId}`, form);
      } else {
        await api.post("/api/notas", form);
      }
      setForm({ valor: "", alumno: { id: "" }, materia: { id: "" } });
      setEditId(null);
      setError("");
      cargar();
    } catch {
      setError("Error al guardar");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar nota?")) return;
    await api.delete(`/api/notas/${id}`);
    cargar();
  };

  const editar = (n) => {
    setForm({
      valor: n.valor,
      alumno: { id: n.alumno?.id },
      materia: { id: n.materia?.id },
    });
    setEditId(n.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar - Menú lateral unificado */}
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
          <h1>Gestión de Notas</h1>
        </header>
        <div className={styles.panel}>
          <h2>Notas</h2>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <input
              type="number"
              placeholder="Nota (0-10)"
              min="0"
              max="10"
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
            />

            <select
              value={form.alumno.id}
              onChange={(e) =>
                setForm({ ...form, alumno: { id: e.target.value } })
              }
            >
              <option value="">Seleccionar alumno</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>

            <select
              value={form.materia.id}
              onChange={(e) =>
                setForm({ ...form, materia: { id: e.target.value } })
              }
            >
              <option value="">Seleccionar materia</option>
              {materias.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
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
                  setForm({
                    valor: "",
                    alumno: { id: "" },
                    materia: { id: "" },
                  });
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
                <th>Nota</th>
                <th>Alumno</th>
                <th>Materia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((n) => (
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.valor}</td>
                  <td>
                    {n.alumno?.nombre} {n.alumno?.apellido}
                  </td>
                  <td>{n.materia?.nombre}</td>
                  <td className="gap">
                    <button className="btn-icon edit" onClick={() => editar(n)}>
                      Editar
                    </button>

                    <button
                      className="btn-icon delete"
                      onClick={() => eliminar(n.id)}
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
