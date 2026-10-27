import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Habilitar CORS para permitir peticiones desde cualquier origen (ej. frontend en localhost:3000)
app.use(cors());

// Lista definida de tareas de ejemplo
const tareas = [
  { id: 1, title: "Comprender la estructura básica de HTML y CSS", completed: true },
  { id: 2, title: "Aprender a seleccionar y modificar elementos del DOM", completed: true },
  { id: 3, title: "Entender qué es una Promesa y sus tres estados en JS", completed: false },
  { id: 4, title: "Consumir una API externa usando fetch y async/await", completed: false },
  { id: 5, title: "Renderizar dinámicamente los datos en la interfaz web", completed: false }
];

// Endpoint que entrega la lista de tareas
app.get('/api/tasks', (req, res) => {
  res.json(tareas);
});

// Endpoint raíz informativo
app.get('/', (req, res) => {
  res.json({
    mensaje: "API sencilla de tareas para Computación en Internet I",
    endpoint: "http://localhost:3001/api/tasks"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor de tareas iniciado en: http://localhost:${PORT}`);
  console.log(`👉 Endpoint disponible: http://localhost:${PORT}/api/tasks`);
});
