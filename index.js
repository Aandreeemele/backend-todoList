// Se importa la dependencia dotenv para administrar las variables
// de entorno del archivo .env
require('dotenv').config();

// importando el módulo express
const express = require('express');

/**
 * Crea la instancia principal de Express.
 * Esta será la base para:
 * - Definir rutas (app.get/post/put/delete)
 * - Registrar middlewares (app.use)
 * - Iniciar el servidor (app.listen)
 */
const app = express();

// MIS RUTAS MIDDLEWARE
app.get('/',(req,res)=>{
    res.send("Mi backEnd con ExpressJS");
});

// CONFIGURACIÓN DEL SERVIDOR
// process.env.PORT: Lee el puerto desde las variables de entorno (archivo .env)
// || 3000: Si no existe, usa el puerto 3000 (operador "OR" de JavaScript)
const PORT = process.env.PORT || 3000;


// Crea un servidor web y lo deja "escuchando" en el puerto 3000
// Permite que tu backend reciba solicitudes (GET, POST, etc.)
// desde clientes (navegadores, apps móviles, etc.).
app.listen(PORT,()=>{
    console.log(`Servidor: http://localhost:${PORT}`);
})
