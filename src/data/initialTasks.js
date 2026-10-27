/**
 * initialTasks.js
 * Conjunto de datos inicial para alimentar el servicio en memoria.
 */
export const initialTasks = [
  {
    id: 1,
    title: "Comprender la diferencia entre código sincrónico y asincrónico",
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 2,
    title: "Identificar los 3 estados de una Promesa: Pending, Fulfilled y Rejected",
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 3,
    title: "Implementar consumidor frontend con fetch() y sintaxis async/await",
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 4,
    title: "Manejar rechazos de promesas y errores HTTP mediante try/catch",
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 5,
    title: "Coordinar múltiples peticiones en paralelo utilizando Promise.all()",
    completed: false,
    createdAt: new Date().toISOString()
  }
];
