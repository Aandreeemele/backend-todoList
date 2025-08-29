import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import getTablas from './routers/get/obtenerTablas.js';
import getTareas from './routers/get/obtenerTareas.js';
import { pool } from './config/dataBase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS
app.use(cors({ origin: '*' }));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', getTablas);
app.use('/api', getTareas);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

// Prueba de conexión a MySQL
(async () => {
  try {
    const [results] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión a MySQL exitosa:", results[0].result);
  } catch (err) {
    console.error("❌ Error de conexión a MySQL:", err.message);
  }
})();

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
