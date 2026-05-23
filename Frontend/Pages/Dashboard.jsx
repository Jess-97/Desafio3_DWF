import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState(0);
  const [profesores, setProfesores] = useState(0);
  const [materias, setMaterias] = useState(0);
  const [notas, setNotas] = useState(0);

  const [dataChart, setDataChart] = useState([]);

  const cargarDatos = async () => {
    try {
      const [a, p, m, n] = await Promise.all([
        api.get("/api/alumnos"),
        api.get("/api/profesores"),
        api.get("/api/materias"),
        api.get("/api/notas"),
      ]);

      setAlumnos(a.data.length);
      setProfesores(p.data.length);
      setMaterias(m.data.length);
      setNotas(n.data.length);

      // 🔥 gráfica simple por ejemplo (puedes cambiar lógica luego)
      setDataChart([
        { name: "Alumnos", total: a.data.length },
        { name: "Profesores", total: p.data.length },
        { name: "Materias", total: m.data.length },
        { name: "Notas", total: n.data.length },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* ================= SIDEBAR (NO TOCAR) ================= */}
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

      {/* ================= CONTENIDO ================= */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h2>🎓Bienvenido al sistema académico🎓</h2>
        </header>

        {/* ================= TARJETAS REALES ================= */}
        <section className={styles.statsGrid}>
          <div className={styles.card}>
            <Users size={22} />
            <div>
              <p>Alumnos</p>
              <h3>{alumnos}</h3>
            </div>
          </div>

          <div className={styles.card}>
            <GraduationCap size={22} />
            <div>
              <p>Profesores</p>
              <h3>{profesores}</h3>
            </div>
          </div>

          <div className={styles.card}>
            <BookOpen size={22} />
            <div>
              <p>Materias</p>
              <h3>{materias}</h3>
            </div>
          </div>

          <div className={styles.card}>
            <FileText size={22} />
            <div>
              <p>Notas</p>
              <h3>{notas}</h3>
            </div>
          </div>
        </section>

        {/* ================= GRÁFICA REAL ================= */}
        <section className={styles.contentGrid}>
          <div className={styles.panel}>
            <h3>Gráfico general del sistema</h3>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={dataChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
<div className={styles.panel}>
  <h3>Panel informativo</h3>

  <div
    style={{
      width: "100%",
      height: "300px",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
      background: "#f8fafc",
    }}
  >
    <img
      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
      alt="tecnologia educacion"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(0.9)",
      }}
    />

    <div
      style={{
        position: "absolute",
        bottom: "15px",
        left: "15px",
        color: "white",
        background: "rgba(0,0,0,0.45)",
        padding: "10px 14px",
        borderRadius: "10px",
        fontSize: "14px",
      }}
    >
      Sistema educativo digital
    </div>
  </div>
</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
