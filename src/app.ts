import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import travelRoutes from './routes/travels';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
 origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://portfolio-backend-azure-one.vercel.app', 
  ],
  credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/api/travels', travelRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Portfolio Backend API'
  });
});

// API Test Endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend funcionando correctamente!',
    version: '1.0.0'
  });
});

app.use('/images', express.static('public/images'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 API Test: http://localhost:${PORT}/api/test`);
});


