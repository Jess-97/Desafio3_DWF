# 🎓 Sistema Académico

Sistema web académico desarrollado para la gestión de estudiantes, profesores, materias y notas.

El proyecto ya contaba con parte del funcionamiento del backend. En esta etapa se desarrolló principalmente la interfaz del frontend, la integración con los servicios del backend y la implementación de seguridad con autenticación JWT.

---

# 🚀 Funcionalidades

- Inicio de sesión de usuarios
- Registro de usuarios
- Gestión de estudiantes
- Gestión de profesores
- Gestión de materias
- Gestión de notas
- Validaciones de formularios
- Consumo de API REST
- Integración frontend y backend
- Seguridad con JWT
- Protección de endpoints

---

# 🌐 Desarrollo Frontend

Se desarrollaron las interfaces visuales del sistema y se realizó la integración con el backend mediante consumo de API.

## 📄 Páginas desarrolladas

- Página de inicio de sesión
- Página de registro
- Dashboard principal
- Gestión de estudiantes
- Gestión de profesores
- Gestión de materias
- Gestión de notas
- Navegación y menú lateral
- Formularios conectados al backend
- Validaciones de acceso y autenticación

---

# ⚙️ Mejoras e implementación Backend

## 🔐 Seguridad y autenticación

- Implementación de Spring Security
- Integración de autenticación JWT
- Creación de filtros de autenticación
- Protección de endpoints mediante roles
- Configuración de sesiones stateless
- Configuración de CORS para conexión con el frontend

## 📦 Dependencias y configuración

- Actualización de configuración Maven
- Integración de dependencias JWT
- Configuración de propiedades JWT
- Configuración de puertos y aplicación
- Corrección de compatibilidad de Spring Boot

## 🗄️ Base de datos y entidades

- Corrección y mejora de entidades:
  - Alumno
  - Materia
  - Nota
  - Usuario

- Implementación de relaciones entre entidades
- Agregado de timestamps de creación y actualización
- Creación de tablas faltantes:
  - nota
  - usuario

- Actualización de schema.sql y data.sql

## 🔄 API REST y controladores

- Implementación de endpoints protegidos
- Creación de controladores:
  - AuthController
  - UserController
  - NotaController

- Implementación de operaciones CRUD
- Endpoints para login y registro

## 📄 DTOs y repositorios

- Creación de DTOs:
  - AuthRequest
  - AuthResponse
  - RegisterRequest
  - UserDto

- Implementación de UserRepository
- Integración de UserDetailsService

## ⚠️ Manejo de errores

- Implementación de GlobalExceptionHandler
- Manejo global de:
  - errores de validación
  - acceso denegado
  - credenciales inválidas
  - token JWT inválido o expirado
  - recursos no encontrados

---

# 🛠️ Tecnologías utilizadas

## Frontend
- React
- Vite
- CSS
- Axios

## Backend
- Spring Boot
- Spring Security
- JWT
- Java
- MySQL
- JPA / Hibernate

---

# ▶️ Ejecución del proyecto

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
mvn spring-boot:run
```

---
# 👨‍💻 Proyecto académico

Jessica Paola Alvarez Sanchez. -AS241238
Gisselle Esmeralda Rodriguez Benitez. -RB243017
