# TaskFlow API — Demostración Práctica del Concepto de Promesas en Express

Bienvenido al repositorio oficial del backend **TaskFlow API**, diseñado para el curso **Computación en Internet I (`09810 - TIC`)** de la **Universidad Icesi** (Departamento de Computación y Sistemas Inteligentes - DCSI).

Este proyecto implementa una API REST modular construida sobre **Node.js** y **Express (ES Modules)** cuyo objetivo pedagógico central es ilustrar el ciclo de vida, la resolución y el rechazo de **Promesas (`Promise`)** en JavaScript, sirviendo como servidor de datos para el taller formativo de integración frontend.

---

## 🎯 Objetivos Pedagógicos

1. **Ciclo de Vida de las Promesas:** Comprender experimentalmente los tres estados de una Promesa (`pending`, `fulfilled` y `rejected`).
2. **Comparativa de Consumo:** Contrastar el encadenamiento tradicional con `.then()` y `.catch()` frente a la sintaxis moderna y declarativa con `async` / `await` y bloques `try / catch`.
3. **Manejo de Concurrencia:** Aplicar `Promise.all()` para coordinar múltiples operaciones asíncronas concurrentes sin crear cascadas bloqueantes (*waterfall*).
4. **Habilitación de CORS:** Comprender el rol de los encabezados de *Cross-Origin Resource Sharing* para permitir el consumo seguro desde aplicaciones frontend desacopladas (ejecutándose en `http://localhost:3000`).

---

## 📂 Estructura del Proyecto

```
api-express-promesas-taskflow/
├── package.json              # Configuración del proyecto, dependencias y scripts
├── .gitignore                # Reglas de exclusión de Git (node_modules, logs)
├── README.md                 # Guía pedagógica y documentación de endpoints
└── src/
    ├── server.js             # Entrada del servidor HTTP, middlewares y error handling
    ├── data/
    │   └── initialTasks.js   # Datos semilla para pruebas
    ├── routes/
    │   └── taskRoutes.js     # Enrutador REST con async/await y .then()/.catch()
    └── services/
        └── taskService.js    # Lógica de negocio con construcción explícita de Promesas
```

---

## 🚀 Puesta en Marcha Rápida

### Requisitos Previos
* **Node.js** v18.0 o superior instalado.
* **NPM** v9.0 o superior.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Compu-1/api-express-promesas-taskflow.git
cd api-express-promesas-taskflow
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Iniciar el Servidor
```bash
# Modo producción estándar:
npm start

# O modo desarrollo con recarga automática ante cambios (Node 18+):
npm run dev
```

El servidor quedará disponible en: **`http://localhost:3001`**.

---

## 📡 Catálogo de Endpoints de la API

| Método | Endpoint | Descripción | Demostración de Promesas |
| :---: | :--- | :--- | :--- |
| `GET` | `/` | Documentación viva y estado del API | Resolución directa |
| `GET` | `/api/health` | Chequeo de disponibilidad del servicio | Sincronización inmediata |
| `GET` | `/api/tasks` | Lista todas las tareas (filtro: `?filter=all\|pending\|completed`) | `delay()` con `resolve()` en promesa |
| `GET` | `/api/tasks/:id` | Retorna una tarea específica por su ID | Bifurcación `resolve()` vs `reject()` con `.then()/.catch()` |
| `POST` | `/api/tasks` | Crea una nueva tarea (`Body: { "title": "..." }`) | Validación sincrónica y resolución asíncrona |
| `PATCH`| `/api/tasks/:id/toggle` | Conmuta el estado `completed` de la tarea | Actualización atómica en memoria |
| `DELETE`| `/api/tasks/:id` | Elimina una tarea existente por su ID | Rechazo si no existe (HTTP 404) |
| `GET` | `/api/tasks/analytics/summary` | Estadísticas agregadas del sistema | **`Promise.all([p1, p2, p3])`** en paralelo |
| `POST`| `/api/tasks/reset` | Restaura los datos semilla originales | Utilidad para pruebas de laboratorio |

---

## 🧪 Pruebas Rápidas con `curl`

### 1. Consultar listado de tareas:
```bash
curl -X GET http://localhost:3001/api/tasks
```

### 2. Crear una nueva tarea:
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Validar integración de API con Frontend TaskFlow"}'
```

### 3. Conmutar estado de completado:
```bash
curl -X PATCH http://localhost:3001/api/tasks/1/toggle
```

### 4. Consultar métricas con `Promise.all`:
```bash
curl -X GET http://localhost:3001/api/tasks/analytics/summary
```

---

## 💡 Cómo Consumir desde el Frontend (`fetch` + `async/await`)

Ejemplo de servicio cliente en JavaScript moderno:

```javascript
const API_URL = "http://localhost:3001/api/tasks";

// Consumo con async/await y manejo de errores
export async function getTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    const tasks = await response.json(); // response.json() también retorna una Promesa
    return tasks;
  } catch (error) {
    console.error("Fallo de conexión o red:", error);
    throw error;
  }
}
```

---

## 🏛️ Créditos y Licencia
Desarrollado para la asignatura **Computación en Internet I** por el equipo docente de la **Universidad Icesi**. Licencia MIT.
