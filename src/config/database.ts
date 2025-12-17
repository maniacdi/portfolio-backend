// src/config/database.ts
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ Error de MongoDB:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Desconectado de MongoDB');
    });
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};