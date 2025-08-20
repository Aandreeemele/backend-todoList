import express from 'express';
import { pool } from '../../confing/dataBase.js';
const router = express.Router();

router.get('/tablas', async (req, res) => {
  try {
    const [tablas] = await pool.query('SHOW TABLES;');
    res.json(tablas);
  } catch (err) {
    console.error('Error en /tablas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
