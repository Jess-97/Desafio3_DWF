import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Alumnos from './pages/Alumnos';
import Profesores from './pages/Profesores';
import Materias from './pages/Materia';
import Notas from './pages/Notas';
import Dashboard from './pages/Dashboard'; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/alumnos" element={<PrivateRoute><Alumnos /></PrivateRoute>} />
        <Route path="/profesores" element={<PrivateRoute><Profesores /></PrivateRoute>} />
        <Route path="/materias" element={<PrivateRoute><Materias /></PrivateRoute>} />
        <Route path="/notas" element={<PrivateRoute><Notas /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;