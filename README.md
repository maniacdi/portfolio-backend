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
# Clone repository
git clone https://github.com/tu-usuario/portfolio-backend.git
cd portfolio-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev

# For production build
npm run build
npm start
```
