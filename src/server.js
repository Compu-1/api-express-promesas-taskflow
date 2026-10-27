/**
 * server.js
 * Servidor HTTP principal con Express para el Taller Formativo de Promesas.
 * Diseñado para ser consumido desde aplicaciones web cliente (Frontend TaskFlow).
 */

import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Middleware de CORS (Cross-Origin Resource Sharing)
// Permite que clientes web ejecutándose en otros puertos (ej. 3000 con live-server o 5173 con Vite)
// puedan consumir los endpoints sin restricciones de navegador.
app.use(cors());

// 2. Middleware para parsear cuerpos de peticiones en formato JSON
app.use(express.json());

// 3. Logger simple para auditoría visual en consola
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 4. Ruta raíz con documentación viva del API
app.get('/', (req, res) => {
  res.json({
    name: "TaskFlow API — Concepto de Promesas en JavaScript",
    version: "1.0.0",
    course: "Computación en Internet I (Universidad Icesi)",
    status: "online",
    endpoints: {
      "GET /api/tasks": "Listar tareas (acepta ?filter=all|pending|completed)",
      "GET /api/tasks/:id": "Obtener una tarea específica por ID",
      "POST /api/tasks": "Crear tarea (Body: { title: string })",
      "PATCH /api/tasks/:id/toggle": "Conmutar estado completed (true/false)",
      "DELETE /api/tasks/:id": "Eliminar tarea por ID",
      "GET /api/tasks/analytics/summary": "Resumen analítico con Promise.all()",
      "POST /api/tasks/reset": "Restablecer base de datos inicial",
      "GET /api/health": "Chequeo de salud del servicio"
    }
  });
});

// 5. Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 6. Montar enrutador de tareas
app.use('/api/tasks', taskRoutes);

// 7. Middleware para manejo de rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
    method: req.method
  });
});

// 8. Middleware centralizado para captura y manejo de errores (Rechazos de Promesas)
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  console.error(`❌ Error capturado [HTTP ${status}]:`, err.message);

  res.status(status).json({
    error: err.name || "Error del Servidor",
    message: err.message || "Ocurrió un error inesperado al procesar la solicitud",
    statusCode: status,
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log("==================================================");
  console.log(`🚀 TaskFlow Express API ejecutándose en:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`👉 Documentación: http://localhost:${PORT}/`);
  console.log(`👉 Tareas:        http://localhost:${PORT}/api/tasks`);
  console.log("==================================================");
});
