import express from 'express';
import { pool } from '../../config/dataBase.js'; // ✅ corregido
const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas');
    res.json(tareas);
  } catch (err) {
    console.error('Error en /tareas:', err.message);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message
    });
  }
});

export default router;
