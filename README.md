# API Sencilla de Tareas (Express) — Computación en Internet I

Servidor backend básico diseñado como soporte para el **Taller Formativo de Promesas y Consumo de APIs en el Frontend**.

Su único propósito es suministrar una lista predefinida de tareas en formato JSON para que los estudiantes aprendan a consumir APIs desde el navegador utilizando la función nativa `fetch()` y el concepto de **Promesas** (`Promise`, `.then()`, `.catch()`, `async / await`).

---

## 🚀 Puesta en Marcha en 2 Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor
npm start
```

El servidor quedará escuchando en: **`http://localhost:3001`**.

---

## 📡 Endpoint Provisto

* **URL:** `http://localhost:3001/api/tasks`
* **Método:** `GET`
* **Respuesta de Ejemplo:**
  ```json
  [
    { "id": 1, "title": "Comprender la estructura básica de HTML y CSS", "completed": true },
    { "id": 2, "title": "Aprender a seleccionar y modificar elementos del DOM", "completed": true },
    { "id": 3, "title": "Entender qué es una Promesa y sus tres estados en JS", "completed": false },
    { "id": 4, "title": "Consumir una API externa usando fetch y async/await", "completed": false },
    { "id": 5, "title": "Renderizar dinámicamente los datos en la interfaz web", "completed": false }
  ]
  ```

---

## 🏛️ Créditos
Universidad Icesi — Departamento de Computación y Sistemas Inteligentes (DCSI).
