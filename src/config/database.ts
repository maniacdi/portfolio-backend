import mongoose from 'mongoose';
import { config } from './env';

export const connectToDatabase = async () => {
  try {
    console.log('🔗 Attempting MongoDB connection to:', config.mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB');

    mongoose.connection.on('error', (error) => {
      console.error('❌ Error on MongoDB:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Disconnected from MongoDB');
    });

    return mongoose.connection;

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};