import 'dotenv/config';

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtDays: Number(process.env.JWT_EXPIRES_IN_DAYS || 7),
  cookieName: process.env.COOKIE_NAME || 'access_token',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'https://lead-management-system-psi.vercel.app/'
};
