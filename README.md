# 🚀 Portfolio Backend API

Backend Node.js para el portfolio personal de Magaldidev. Proporciona una API REST para gestionar viajes, proyectos y otras secciones del portfolio.

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **TypeScript** para tipado estático
- **MongoDB** + **Mongoose** ODM
- **JWT** para autenticación (opcional)
- **CORS** para comunicación con frontend

## 📁 Estructura del Proyecto

portfolio-backend/
├── src/
│ ├── app.ts # Punto de entrada
│ ├── config/ # Configuraciones
│ ├── models/ # Modelos de MongoDB
│ ├── routes/ # Rutas de API
│ ├── controllers/ # Controladores
│ ├── middleware/ # Middlewares personalizados
│ └── scripts/ # Scripts de utilidad
├── .env # Variables de entorno
├── .gitignore # Archivos ignorados
└── package.json # Dependencias

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/portfolio-backend.git
cd portfolio-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar en desarrollo
npm run dev

# Iniciar en producción
npm run build
npm start
```
