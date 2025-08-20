import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './confing/dataBase.js'; // Verifica que la carpeta sea realmente 'confing' o 'config'
import getTablas from './routers/get/obtenerTablas.js';
import getTareas from './routers/get/ObtenerTareas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware CORS: solo permite tu front
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

// Middleware para parsear JSON
app.use(express.json());

// Middlewares de rutas
app.use('/api', getTablas);
app.use('/api', getTareas);

// Prueba de conexión a MySQL
(async () => {
  try {
    const [results] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexión a MySQL exitosa:', results[0].result);
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  }
})();

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
