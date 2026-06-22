import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

dotenv.config();

const projects = [
  {
    slug: 'compras-app',
    title: 'Compras App',
    category: 'mobile',
    status: 'daily',
    featured: true,
    order: 1,
    year: 2024,
    tagline: {
      es: 'Lista de la compra compartida en tiempo real',
      en: 'Real-time shared shopping list',
    },
    summary: {
      es: 'App móvil para compartir la lista de la compra en tiempo real entre varios dispositivos. React Native + Expo, backend propio Node.js con Socket.io y MongoDB Atlas. En uso diario real.',
      en: 'Mobile app to share the shopping list in real time across devices. React Native + Expo, custom Node.js backend with Socket.io and MongoDB Atlas. In real daily use.',
    },
    problem: {
      es: 'En casa acabábamos comprando cosas repetidas o olvidando lo que faltaba: las listas en papel o notas sueltas no se sincronizaban entre nosotros.',
      en: 'At home we kept buying duplicates or forgetting what was missing: paper lists and scattered notes never stayed in sync between us.',
    },
    solution: {
      es: 'App nativa Android con sincronización instantánea entre dispositivos vía WebSockets. Backend propio Express/Socket.io con MongoDB Atlas, autenticación y listas compartidas. Desplegada en mi NAS con Docker, Nginx, SSL automático (Let\'s Encrypt) y CI/CD con GitHub Actions + EAS Update.',
      en: 'Native Android app with instant cross-device sync over WebSockets. Custom Express/Socket.io backend with MongoDB Atlas, auth and shared lists. Deployed on my home NAS with Docker, Nginx, automatic SSL (Let\'s Encrypt) and CI/CD via GitHub Actions + EAS Update.',
    },
    stack: ['React Native', 'Expo', 'Node.js', 'Socket.io', 'MongoDB', 'Docker', 'Nginx', 'CI/CD'],
    repo: 'https://github.com/maniacdi/compras-app',
    coverImage: '/images/projects/compras-app/cover.webp',
    images: ['/images/projects/compras-app/cover.webp'],
  },
  {
    slug: 'ironlog',
    title: 'IronLog',
    category: 'mobile',
    status: 'production',
    featured: false,
    order: 2,
    year: 2025,
    tagline: {
      es: 'Crea rutinas y sigue tu progreso de entreno',
      en: 'Build routines and track your training progress',
    },
    summary: {
      es: 'App móvil para crear rutinas, registrar entrenamientos y ver tu progreso. React Native + Expo, con los datos en local (AsyncStorage). La uso a diario, instalada como APK.',
      en: 'Mobile app to create routines, log workouts and track your progress. React Native + Expo, data stored locally (AsyncStorage). I use it daily, installed as an APK.',
    },
    problem: {
      es: 'Quería llevar mis rutinas y progreso en el gimnasio sin apps llenas de anuncios, suscripciones o cuentas obligatorias.',
      en: 'I wanted to track my gym routines and progress without apps full of ads, subscriptions or mandatory accounts.',
    },
    solution: {
      es: 'App ligera y offline-first: rutinas personalizadas, registro de series y un panel de progreso. React Native + Expo con persistencia local (AsyncStorage) y gráficas en SVG. Distribuida como APK directa.',
      en: 'A lightweight, offline-first app: custom routines, set logging and a progress panel. React Native + Expo with local persistence (AsyncStorage) and SVG charts. Shipped as a direct APK.',
    },
    stack: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
    repo: 'https://github.com/maniacdi/ironlog',
    coverImage: '/images/projects/ironlog/cover.webp',
    images: ['/images/projects/ironlog/cover.webp', '/images/projects/ironlog/1.webp'],
  },
  {
    slug: 'porra-mundial',
    title: 'Porra Mundial',
    category: 'game',
    status: 'production',
    featured: false,
    order: 3,
    year: 2022,
    tagline: {
      es: 'Predicciones del Mundial para picarse con los amigos',
      en: 'World Cup predictions to compete with friends',
    },
    summary: {
      es: 'Juego web de predicciones del Mundial: aciertas marcadores y subes en la clasificación del grupo. JavaScript + Supabase, desplegado en Vercel.',
      en: 'World Cup prediction web game: guess the scores and climb your group leaderboard. JavaScript + Supabase, deployed on Vercel.',
    },
    problem: {
      es: 'Cada Mundial hacíamos la porra a mano en hojas de cálculo: lioso de actualizar y fácil de discutir los puntos.',
      en: 'Every World Cup we ran the pool by hand in spreadsheets: messy to update and easy to argue over the scoring.',
    },
    solution: {
      es: 'App web donde cada amigo mete sus predicciones y la clasificación se calcula sola en tiempo real. JavaScript en el front con Supabase (Postgres + auth) como backend, desplegada en Vercel.',
      en: 'A web app where each friend enters their predictions and the leaderboard updates automatically in real time. Vanilla JavaScript on the front with Supabase (Postgres + auth) as the backend, deployed on Vercel.',
    },
    stack: ['JavaScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    demo: 'https://porra-mundial-lilac.vercel.app/',
    repo: 'https://github.com/maniacdi/porra-mundial',
    coverImage: '/images/projects/porra-mundial/cover.webp',
    images: ['/images/projects/porra-mundial/cover.webp'],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    category: 'web',
    status: 'production',
    featured: false,
    order: 4,
    year: 2024,
    tagline: {
      es: 'Este portfolio — Next.js, bilingüe y con API propia',
      en: 'This portfolio — Next.js, bilingual, with its own API',
    },
    summary: {
      es: 'Mi portfolio personal con Next.js, TypeScript y Framer Motion, con una API REST propia en Node.js/Express y MongoDB Atlas que alimenta esta sección y la de Viajes en vivo. Bilingüe y con CI/CD en cada push.',
      en: 'My personal portfolio with Next.js, TypeScript and Framer Motion, powered by a custom Node.js/Express REST API with MongoDB Atlas that feeds this section and the Travels page live. Bilingual, with CI/CD on every push.',
    },
    problem: {
      es: 'Quería un portfolio que no fuera el típico de plantilla y que además demostrara mi trabajo full-stack de verdad, no solo el front.',
      en: 'I wanted a portfolio that wasn\'t the usual template and that actually proved my full-stack work, not just the front end.',
    },
    solution: {
      es: 'Front en Next.js (App Router, SSR/ISR) bilingüe ES/EN con animaciones Framer Motion y un asistente de IA. El contenido de Proyectos y Viajes se sirve desde mi propia API REST (Node.js/Express + MongoDB Atlas), desplegada aparte. Todo con CI/CD automático en Vercel.',
      en: 'Next.js front (App Router, SSR/ISR), bilingual ES/EN with Framer Motion animations and an AI assistant. Projects and Travels content is served from my own REST API (Node.js/Express + MongoDB Atlas), deployed separately. All with automated CI/CD on Vercel.',
    },
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    demo: 'https://javimagaldi.com',
    repo: 'https://github.com/maniacdi/portfolio',
    coverImage: '/images/projects/portfolio/cover.webp',
    images: ['/images/projects/portfolio/cover.webp'],
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Conectado a MongoDB');

    await Project.deleteMany({});
    console.log('🗑️  Colección de proyectos limpiada');

    await Project.insertMany(projects);
    console.log(`🌱 Insertados ${projects.length} proyectos`);

    const count = await Project.countDocuments();
    console.log(`📊 Total de proyectos en DB: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedProjects();
