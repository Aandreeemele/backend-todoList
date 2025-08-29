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

// 🔹 Función para crear pool con reconexión
let pool;

async function createPool(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      pool = mysql.createPool({
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

      const conn = await pool.getConnection();
      console.log('✅ Conexión a MySQL exitosa');
      conn.release();
      break;
    } catch (err) {
      console.error(`❌ Error de conexión a MySQL (intento ${i + 1}):`, err);
      if (i < retries - 1) {
        console.log(`⏳ Reintentando en ${delay / 1000} segundos...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        console.error('❌ No se pudo conectar a MySQL después de varios intentos.');
      }
    }
  }
}

// Crear pool al iniciar
await createPool();

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
    console.error('Error completo en /tablas:', err);
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
    console.error('Error completo en /tareas:', err);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message || JSON.stringify(err)
    });
  }
});

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
