<div align="center">

# 🎓 Frontend - MetaUni (Sistema Académico Universitario)

![React](https://img.shields.io/badge/React-19-blue)
![Material UI](https://img.shields.io/badge/Material_UI-7.x-007FFF)
![React Router](https://img.shields.io/badge/React_Router-7.9.1-orange)
![Axios](https://img.shields.io/badge/Axios-HTTP-blueviolet)
![Render](https://img.shields.io/badge/Deploy-Render-purple)
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)

**Aplicación frontend en React para el sistema académico MetaUni, que consume la API REST del backend desplegado en Render.**

</div>

---

## 📖 Descripción

Frontend del sistema **MetaUni**, desarrollado con **React 19** y **Material UI 7.x**, que consume la **API REST** del backend alojado en Render.  
Ofrece una interfaz moderna, responsive e intuitiva para la gestión académica universitaria.  

Este proyecto nació como una **práctica personal** para aprender **React, Context API y la integración con un backend real**, además de experimentar con el **despliegue en la web**.  
Fue creado con la idea de **motivar a los estudiantes** a seguir su progreso académico de una forma **visual y entretenida**.

🔗 Backend asociado: [Proyecto-MetaUni-Backend](https://github.com/joacomendiola/Proyecto-MetaUni-Backend)

---

## ✨ Características

- 🌐 **Single Page Application (SPA)** con React Router  
- 🔐 **Autenticación JWT** y rutas protegidas  
- 🧠 **Context API** para gestión global de estado  
- ⚙️ **Axios** para comunicación con el backend  
- 💅 **Material UI + CSS3** para estilos modernos y responsive  
- 🎭 **Framer Motion** para animaciones sutiles  
- 🔔 **React Toastify** para notificaciones y feedback visual  
- 🌓 **Modo oscuro** almacenado en localStorage  

---

## 🏗️ Stack Tecnológico

- ⚛️ **React 19.1.1** – Biblioteca principal de UI  
- 🧩 **Material UI 7.3.2** – Componentes visuales y layout  
- 🛣️ **React Router DOM 7.9.1** – Navegación entre páginas  
- 📦 **Axios 1.12.2** – Cliente HTTP para la API  
- 🔤 **Context API** – Estado global de autenticación  
- 🎨 **CSS3 / App.css** – Estilos personalizados  
- 💬 **React Toastify** – Sistema de notificaciones  
- 🎬 **Framer Motion** – Animaciones y transiciones suaves  
- ☁️ **Render** – Plataforma de despliegue (en desarrollo)  

---

## 📂 Estructura del Proyecto

```text
src/
├── components/
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   ├── ProgressBar.js
│   ├── RutaProtegida.js
│   └── SelectorColor.jsx
│
├── context/
│   └── AuthContext.js
│
├── pages/
│   ├── AdminPage.js
│   ├── CarreraDetail.js
│   ├── CrearCarrera.jsx
│   ├── Dashboard.js
│   ├── Dashboard.css
│   ├── EditarMateria.jsx
│   ├── Login.js
│   ├── Login.css
│   ├── Perfil.js
│   └── Register.js
│
├── services/
│   └── api.js
│
├── App.js
├── App.css
├── index.js
└── index.css
```

---

## 🧠 Uso de la Aplicación

1. Iniciar sesión con un usuario registrado.  
2. Acceder al **panel principal** con resumen de carreras y materias.  
3. Navegar entre secciones desde la **Navbar**.  
4. Crear, editar o eliminar carreras y materias.  
5. Ver el progreso académico con la barra de avance visual.  
6. Cerrar sesión de manera segura.  

---

## 🔗 Comunicación con Backend

Configuración base (`api.js`):  
- URL base: `https://proyecto-metauni-backend.onrender.com`  
- Interceptores para incluir token JWT en headers  
- Manejo global de errores y expiración de sesión  

---

## 💻 Ejemplo de Rutas (App.js)

```jsx
<Routes>
  <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
  <Route path="/iniciar-sesion" element={<Login />} />
  <Route path="/registrarse" element={<Register />} />
  <Route path="/panel" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
  <Route path="/carrera/:id" element={<RutaProtegida><CarreraDetail /></RutaProtegida>} />
  <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
  <Route path="/admin" element={<RutaProtegida rolRequerido="ROLE_ADMIN"><AdminPage /></RutaProtegida>} />
</Routes>
```

---

## 🌐 Despliegue

El frontend está configurado para ser desplegado en Render, utilizando variables de entorno que permiten la conexión con el backend alojado en la misma plataforma.
El proceso de build se ejecuta automáticamente en cada actualización del repositorio, generando una versión optimizada lista para producción.

---

## 👨‍💻 Autor

Desarrollado por **Joaquín Mendiola**  
🌐 GitHub: [joacomendiola](https://github.com/joacomendiola)  


