import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, BookOpen, FileText, LogOut } from 'lucide-react';
import api from '../api/axios';
import styles from './Dashboard.module.css'; 

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const res = await api.get('/api/alumnos');
      setAlumnos(res.data);
    } catch { setError('Error al cargar alumnos'); }
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async () => {
    if (!form.nombre || !form.apellido) return setError('Completa todos los campos');
    try {
      if (editId) {
        await api.put(`/api/alumnos/${editId}`, form);
      } else {
        await api.post('/api/alumnos', form);
      }
      setForm({ nombre: '', apellido: '' });
      setEditId(null);
      setError('');
      cargar();
    } catch { setError('Error al guardar'); }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar alumno?')) return;
    await api.delete(`/api/alumnos/${id}`);
    cargar();
  };

  const editar = (a) => {
    setForm({ nombre: a.nombre, apellido: a.apellido });
    setEditId(a.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>🎓Sistema Académico</div>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/dashboard"><LayoutDashboard size={20}/> Dashboard</Link>
          <Link className={styles.navLink} to="/alumnos"><Users size={20}/> Alumnos</Link>
          <Link className={styles.navLink} to="/profesores"><GraduationCap size={20}/> Profesores</Link>
          <Link className={styles.navLink} to="/materias"><BookOpen size={20}/> Materias</Link>
          <Link className={styles.navLink} to="/notas"><FileText size={20}/> Notas</Link>
        </nav>
        <div className={styles.footerNav}>
          <button className={styles.navLink} onClick={logout} style={{background:'none', border:'none', cursor:'pointer', color:'#94a3b8'}}>
            <LogOut size={20}/> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="content-area">
        <header className="page-header">
          <h1>Gestión de Alumnos</h1>
        </header>

        {error && <div className="alert-error">{error}</div>}

        <div className="card">
          <h3>{editId ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
          <div className="form-group">
            <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
            <input placeholder="Apellido" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} />
            <button className="btn-save" onClick={guardar}>{editId ? 'Actualizar' : 'Agregar'}</button>
            {editId && <button className="btn-cancel" onClick={() => { setEditId(null); setForm({ nombre: '', apellido: '' }); }}>Cancelar</button>}
          </div>
        </div>
        
        <div className="card">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Apellido</th><th className="text-right">Acciones</th></tr>
            </thead>
            <tbody>
              {alumnos.map(a => (
                <tr key={a.id}>
                  <td><span className="id-badge">{a.id}</span></td>
                  <td>{a.nombre}</td>
                  <td>{a.apellido}</td>
                  <td className="actions-cell">
                    <button className="btn-icon edit" onClick={() => editar(a)}>Editar</button>
                    <button className="btn-icon delete" onClick={() => eliminar(a.id)}>Eliminar</button>
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