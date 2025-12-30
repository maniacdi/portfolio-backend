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
    required: [true, 'El título es requerido'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  location: {
    type: String,
    required: [true, 'La ubicación es requerida'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'El país es requerido'],
    trim: true
  },
  coordinates: {
    lat: { 
      type: Number, 
      required: [true, 'La latitud es requerida'],
      min: [-90, 'Latitud mínima: -90'],
      max: [90, 'Latitud máxima: 90']
    },
    lng: { 
      type: Number, 
      required: [true, 'La longitud es requerida'],
      min: [-180, 'Longitud mínima: -180'],
      max: [180, 'Longitud máxima: 180']
    }
  },
  dates: {
    start: { 
      type: Date, 
      required: [true, 'La fecha de inicio es requerida'] 
    },
    end: { 
      type: Date, 
      required: [true, 'La fecha de fin es requerida'],
      validate: {
        validator: function(this: ITravel, value: Date) {
          return value >= this.dates.start;
        },
        message: 'La fecha de fin debe ser posterior a la fecha de inicio'
      }
    }
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'La duración mínima es 1 día']
  },
  type: {
    type: String,
    enum: {
      values: ['vacation', 'business', 'adventure', 'cultural'],
      message: '{VALUE} no es un tipo válido. Usa: vacation, business, adventure, cultural'
    },
    required: [true, 'El tipo de viaje es requerido']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [2000, 'La descripción no puede exceder 2000 caracteres']
  },
  highlights: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Debe ser una URL válida de imagen (jpg, png, gif, webp)'
    }
  }]
}, {
  timestamps: true
});

// Middleware to calculate duration before saving
TravelSchema.pre<ITravel>('save', function(next) {
  if (this.dates.start && this.dates.end) {
    const diffTime = Math.abs(this.dates.end.getTime() - this.dates.start.getTime());
    this.duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  next();
});

// Indexes for optimized queries
TravelSchema.index({ title: 'text', description: 'text', location: 'text', country: 'text' });
TravelSchema.index({ type: 1 });
TravelSchema.index({ country: 1 });
TravelSchema.index({ 'dates.start': -1 });
TravelSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

export default mongoose.model<ITravel>('Travel', TravelSchema);