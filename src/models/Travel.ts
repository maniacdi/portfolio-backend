// src/models/Travel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITravel extends Document {
  title: string;
  location: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dates: {
    start: Date;
    end: Date;
  };
  duration: number;
  type: 'vacation' | 'business' | 'adventure' | 'cultural';
  description: string;
  highlights: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TravelSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  dates: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1 
  },
  type: { 
    type: String, 
    enum: ['vacation', 'business', 'adventure', 'cultural'],
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  highlights: [{ 
    type: String 
  }],
  images: [{ 
    type: String 
  }]
}, {
  timestamps: true // Crea createdAt y updatedAt automáticamente
});

// Índices para búsquedas rápidas
TravelSchema.index({ type: 1 });
TravelSchema.index({ country: 1 });
TravelSchema.index({ 'dates.start': -1 });

export default mongoose.model<ITravel>('Travel', TravelSchema);