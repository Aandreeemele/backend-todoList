import express from 'express';
import { pool } from '../../confing/dataBase.js'; // 👈 revisa si tu carpeta es confing o config
const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    // Hacemos la consulta
    const [tareas] = await pool.query('SELECT * FROM tareas');
    
    // Enviamos la respuesta en formato JSON
    res.json(tareas);
  } catch (err) {
    console.error('Error en /tareas:', err.message); // 👈 muestra el error exacto
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message // 👈 envía el detalle al frontend para debug
    });
  }
});

export default router;
