// Importa axios para hacer peticiones HTTP
import axios from 'axios';

// Crea una instancia de axios con la URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor de peticiones: agrega el token JWT en cada solicitud
api.interceptors.request.use((config) => {
  // Obtiene el token guardado en localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // Agrega el token en el header Authorization como Bearer
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas: maneja errores de autenticación
api.interceptors.response.use(
  // Si la respuesta es exitosa, la retorna sin cambios
  (response) => response,
  (error) => {
    // Si el token expiró o no está autorizado (401 o 403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Elimina el token inválido del localStorage
      localStorage.removeItem('token');
      // Redirige al login automáticamente
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Exporta la instancia para usarla en toda la aplicación
export default api;