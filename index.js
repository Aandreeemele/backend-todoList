import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './config/dataBase.js'; // solo una vez
import getTablas from './routers/get/obtenerTablas.js';
import getTareas from './routers/get/obtenerTareas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', getTablas);
app.use('/api', getTareas);

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

// Conexión segura a MySQL
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión a MySQL exitosa');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
