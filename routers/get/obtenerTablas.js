import express from 'express';
import { pool } from '../../confing/dataBase.js';
const router = express.Router();

router.get('/tablas', async (req, res) => {
  try {
    const [tablas] = await pool.query('SHOW TABLES;');
    res.json(tablas);
  } catch (err) {
    console.error('Error en /tablas:', err.message); // 👈 muestra mensaje del error
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: err.message // 👈 devuelve detalle para debug
    });
  }
});

export default router;
