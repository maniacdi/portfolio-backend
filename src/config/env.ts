export const config = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'secret_dev',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

console.log('🔧 Config loaded. MongoDB URI present:', !!process.env.MONGO_URI);