/**
 * taskService.js
 * Servicio de datos que encapsula operaciones CRUD simulando acceso a base de datos
 * mediante la construcción explícita y resolución/rechazo de Promesas (Promise).
 */

import { initialTasks } from '../data/initialTasks.js';

// Repositorio en memoria
let tasksDb = [...initialTasks];

/**
 * Función auxiliar para simular latencia asíncrona de I/O o red.
 * Retorna una Promesa que se resuelve tras el tiempo especificado.
 * @param {number} ms - Milisegundos de espera
 * @returns {Promise<void>}
 */
export function delay(ms = 300) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Obtener todas las tareas.
 * Demuestra la resolución exitosa (resolve) de una Promesa tras una espera simulada.
 * @param {string} [filter] - Filtro opcional ('all', 'pending', 'completed')
 * @returns {Promise<Array>}
 */
export function getAllTasks(filter = 'all') {
  return new Promise((resolve, reject) => {
    delay(250).then(() => {
      try {
        let results = [...tasksDb];
        if (filter === 'pending') {
          results = results.filter((t) => !t.completed);
        } else if (filter === 'completed') {
          results = results.filter((t) => t.completed);
        }
        resolve(results);
      } catch (err) {
        reject(new Error(`Fallo al recuperar tareas: ${err.message}`));
      }
    });
  });
}

/**
 * Obtener una tarea por su ID.
 * Demuestra la bifurcación lógica entre resolve (éxito) y reject (error / no encontrado).
 * @param {number} id
 * @returns {Promise<Object>}
 */
export function getTaskById(id) {
  return new Promise((resolve, reject) => {
    delay(150).then(() => {
      const task = tasksDb.find((t) => t.id === Number(id));
      if (!task) {
        const error = new Error(`No se encontró ninguna tarea con ID: ${id}`);
        error.statusCode = 404;
        return reject(error);
      }
      resolve(task);
    });
  });
}

/**
 * Crear una nueva tarea.
 * Demuestra validación sincrónica con rechazo asincrónico inmediato de Promesa.
 * @param {Object} data - { title: string }
 * @returns {Promise<Object>}
 */
export function createTask(data) {
  return new Promise((resolve, reject) => {
    if (!data || !data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      const error = new Error("El campo 'title' es obligatorio y debe ser una cadena no vacía");
      error.statusCode = 400;
      return reject(error);
    }

    delay(200).then(() => {
      const nextId = tasksDb.length > 0 ? Math.max(...tasksDb.map((t) => t.id)) + 1 : 1;
      const newTask = {
        id: nextId,
        title: data.title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };

      tasksDb.push(newTask);
      resolve(newTask);
    });
  });
}

/**
 * Conmutar el estado de completado de una tarea (toggle).
 * @param {number} id
 * @returns {Promise<Object>}
 */
export function toggleTask(id) {
  return new Promise((resolve, reject) => {
    delay(180).then(() => {
      const taskIndex = tasksDb.findIndex((t) => t.id === Number(id));
      if (taskIndex === -1) {
        const error = new Error(`Imposible conmutar estado: Tarea con ID ${id} no existe`);
        error.statusCode = 404;
        return reject(error);
      }

      tasksDb[taskIndex].completed = !tasksDb[taskIndex].completed;
      tasksDb[taskIndex].updatedAt = new Date().toISOString();

      resolve(tasksDb[taskIndex]);
    });
  });
}

/**
 * Eliminar una tarea por ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export function deleteTask(id) {
  return new Promise((resolve, reject) => {
    delay(200).then(() => {
      const numericId = Number(id);
      const exists = tasksDb.some((t) => t.id === numericId);

      if (!exists) {
        const error = new Error(`Imposible eliminar: Tarea con ID ${id} no existe`);
        error.statusCode = 404;
        return reject(error);
      }

      tasksDb = tasksDb.filter((t) => t.id !== numericId);
      resolve({ success: true, deletedId: numericId, message: "Tarea eliminada exitosamente" });
    });
  });
}

/**
 * Métricas y analítica del sistema.
 * Demuestra el uso de Promise.all() para ejecutar y coordinar múltiples
 * operaciones asíncronas concurrentes sin bloquear en cascada (waterfall).
 * @returns {Promise<Object>}
 */
export function getAnalyticsSummary() {
  // Tres promesas independientes que se ejecutan en paralelo:
  const totalCountPromise = getAllTasks('all').then((list) => list.length);
  const pendingCountPromise = getAllTasks('pending').then((list) => list.length);
  const completedCountPromise = getAllTasks('completed').then((list) => list.length);

  return Promise.all([totalCountPromise, pendingCountPromise, completedCountPromise]).then(
    ([total, pending, completed]) => {
      const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
      return {
        total,
        pending,
        completed,
        completionRate: `${completionRate}%`,
        evaluatedAt: new Date().toISOString(),
        promiseExecutionMode: "Promise.all concurrent"
      };
    }
  );
}

/**
 * Reiniciar la base de datos a los valores iniciales (utilidad para pruebas de laboratorio).
 * @returns {Promise<Object>}
 */
export function resetDatabase() {
  return new Promise((resolve) => {
    tasksDb = [...initialTasks];
    resolve({ success: true, count: tasksDb.length, message: "Base de datos restaurada" });
  });
}
