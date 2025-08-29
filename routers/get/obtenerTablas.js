import express from 'express';
import { pool } from '../../config/dataBase.js';
const router = express.Router();

router.get('/tablas', async (req, res) => {  // solo '/tablas'
  try {
    const [tablas] = await pool.query('SHOW TABLES;');
    res.json(tablas);
  } catch (err) {
    console.error('Error en /tablas:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
