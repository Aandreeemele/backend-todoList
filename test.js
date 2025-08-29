import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });
    console.log('✅ Conexión exitosa a MySQL');
    await connection.end();
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
}

testConnection();
