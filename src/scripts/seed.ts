import mongoose from 'mongoose';
import Travel from '../models/Travel';
import dotenv from 'dotenv';
import { create } from 'domain';

dotenv.config();

const travels = [
  {
    title: "Japan Adventure",
    country: "Japan",
    location: "Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    date: {
      start: new Date("2024-03-26"),
      end: new Date("2024-04-06"),
    },
    description: "Exploring the vibrant streets of Tokyo, Kyoto, Osaka, Takayama and Hakone.",
    duration: 5,
    type: "cultural",
    images: [
      "/images/travels/tokyo-1.jpg",
      "/images/travels/tokyo-2.jpg",
      "/images/travels/tokyo-3.jpg",
    ],
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Sushi at Tsukiji Market"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Barcelona Concert",
    country: "Spain",
    location: "Barcelona",
    coordinates: { lat: 41.3851, lng: 2.1734 },
    date: {
      start: new Date("2023-07-10"),
      end: new Date("2023-07-17"),
    },
    duration: 5,
    description: "Discovering Gaudí's masterpieces and Maneskin concert.",
    type: "cultural",
    images: ["/images/travels/barcelona-1.jpg", "/images/travels/barcelona-2.jpg"],
    highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter", "Tapas in El Born"],
    createdAt: new Date(),
    updatedAt: new Date(),  },
  {
    title: "Iceland ❄️",
    country: "Iceland",
    location: "Interlaken",
    coordinates: { lat: 64.0863, lng: -18.8632 },
    date: {
      start: new Date("2023-09-05"),
      end: new Date("2023-09-12"),
    },
    duration: 5,
    description: "Full visit around the whole island.",
    type: "adventure",
    images: ["/images/travels/ice-1.jpg", "/images/travels/ice-2.jpg"],
    highlights: ["Golden Circle", "Blue Lagoon", "Reykjavik location", "Northern Lights"],
    createdAt: new Date(),
    updatedAt: new Date(),  },
  {
    title: "San Francisco NBA",
    country: "USA",
    location: "San Francisco",
    coordinates: { lat: 37.7828, lng: -122.456 },
    date: {
      start: new Date("2023-11-03"),
      end: new Date("2023-11-10"),
    },
    duration: 5,
    description: "Tech conference and networking in the city that never sleeps.",
    type: "cultural",
    images: ["/images/travels/sfc-1.jpg"],
    highlights: [
     "Golden Gate Bridge",
      "Alcatraz Island",
      "Fisherman's Wharf",
      "Chinatown",
      "NBA Game",
    ],
    createdAt: new Date(),
    updatedAt: new Date(), 
  },
  {
    title: "Maldives Retreat",
    country: "Maldives",
    location: "Malé",
    coordinates: { lat: 4.2569, lng: 73.4525 },
    date: {
      start: "2024-01-20",
      end: "2024-02-05",
    },
    duration: 5,
    description: "Relaxing beach vacation in tropical paradise.",
    type: "vacation",
    images: [
      "/images/travels/mald-1.jpg",
      "/images/travels/mald-2.jpg",
      "/images/travels/mald-3.jpg",
    ],
    highlights: ["Overwater Bungalow", "Snorkeling with Manta Rays", "Sunset", "Spa Day"],
    createdAt: new Date(),
    updatedAt: new Date(),  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Conectado a MongoDB');

    // Limpiar colección
    await Travel.deleteMany({});
    console.log('🗑️  Colección limpiada');

    // Insertar datos
    await Travel.insertMany(travels);
    console.log(`🌱 Insertados ${travels.length} viajes`);

    // Mostrar estadísticas
    const count = await Travel.countDocuments();
    console.log(`📊 Total de viajes en DB: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDatabase();