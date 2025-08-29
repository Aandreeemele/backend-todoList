import express from 'express';
import { pool } from '../../config/dataBase.js';
const router = express.Router();

router.get('/tareas', async (req, res) => {  // solo '/tareas'
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas');
    res.json(tareas);
  } catch (err) {
    console.error('Error en /tareas:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
