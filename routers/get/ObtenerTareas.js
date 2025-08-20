import express from 'express';
import { pool } from '../../confing/dataBase.js';
const router = express.Router();

router.get('/tareas', async (req, res) => {
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas;');
    res.json(tareas);
  } catch (err) {
    console.error('Error en /tareas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
