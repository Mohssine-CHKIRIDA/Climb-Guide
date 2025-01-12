import dotenv from 'dotenv';
import pkg from 'pg';


dotenv.config();
const { Pool } = pkg;
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Test de la connexion
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erreur de connexion:', err.stack);
  }
  console.log('Connecté à la base de données PostgreSQL');
  release();
});

export default pool;