// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import travelRoutes from './routes/travels';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Conectar a MongoDB
connectToDatabase();

// Rutas
app.use('/api/travels', travelRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Portfolio Backend API'
  });
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend funcionando correctamente!',
    version: '1.0.0'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 API Test: http://localhost:${PORT}/api/test`);
});