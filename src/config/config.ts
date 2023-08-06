import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno del archivo correspondiente
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const config = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  pageSize: 25
};

export default config;
