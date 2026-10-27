/**
 * taskRoutes.js
 * Enrutador Express que expone las rutas REST de tareas.
 * Combina patrones con async/await y .then()/.catch() para ilustrar
 * el consumo de Promesas en controladores backend.
 */

import { Router } from 'express';
import * as taskService from '../services/taskService.js';

const router = Router();

/**
 * GET /api/tasks/analytics/summary
 * Demuestra el consumo de una Promesa compuesta (generada con Promise.all).
 */
router.get('/analytics/summary', async (req, res, next) => {
  try {
    const summary = await taskService.getAnalyticsSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/tasks
 * Lista todas las tareas o filtra por estado (?filter=pending|completed).
 * Manejo clásico con async / await.
 */
router.get('/', async (req, res, next) => {
  try {
    const { filter } = req.query;
    const tasks = await taskService.getAllTasks(filter);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/tasks/:id
 * Consulta una tarea por identificador.
 * Implementado deliberadamente con .then() y .catch() para contrastar
 * la sintaxis nativa de encadenamiento de Promesas con async/await.
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  taskService.getTaskById(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      // Delegamos al middleware de manejo de errores
      next(err);
    });
});

/**
 * POST /api/tasks
 * Crea una nueva tarea en el sistema.
 */
router.post('/', async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/tasks/:id/toggle
 * Conmuta el estado de completado de una tarea.
 */
router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await taskService.toggleTask(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/tasks/:id
 * Elimina una tarea existente.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/tasks/reset
 * Restaura la base de datos a su estado semilla (para pruebas repetibles).
 */
router.post('/reset', async (req, res, next) => {
  try {
    const result = await taskService.resetDatabase();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
