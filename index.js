import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ Conexión a MySQL
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// 🔹 Ruta de prueba general
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

// 🔹 Endpoint: Obtener todas las tablas
app.get('/api/tablas', async (req, res) => {
  try {
    const [tablas] = await pool.query('SHOW TABLES;');
    res.json(tablas);
  } catch (err) {
    console.error('Error completo en /tablas:', err); // 🔹 muestra todo el objeto error
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message || JSON.stringify(err)
    });
  }
});

// 🔹 Endpoint: Obtener todas las tareas
app.get('/api/tareas', async (req, res) => {
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas');
    res.json(tareas);
  } catch (err) {
    console.error('Error completo en /tareas:', err); // 🔹 muestra todo el objeto error
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message || JSON.stringify(err)
    });
  }
});

// 🔹 Prueba de conexión a MySQL al iniciar
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión a MySQL exitosa');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL al iniciar:', err); // 🔹 muestra todo el objeto error
  });

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
