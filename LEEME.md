# Panel de Desembarques – Pesquera Talcahuano Sur SpA
TI3031 – Programación Front End | Evaluación N°3 | Inacap San Pedro de la Paz

---

## Cómo ejecutar el proyecto

**Terminal 1 – Levantar la API:**
```
npx json-server --watch db.json --port 3001
```

**Terminal 2 – Levantar la app:**
```
npm install
npm run dev
```

La app queda disponible en: http://localhost:5173

---

## R1 – Elementos de React utilizados

### Componentes
El proyecto tiene 5 componentes, cada uno con una función clara:

- **App** – Componente principal. Maneja todo el estado, hace el fetch a la API y le pasa los datos a los demás.
- **Encabezado** – Muestra el nombre de la empresa y la barra superior. No tiene estado propio.
- **FiltrosBusqueda** – Contiene el campo de texto y el dropdown para filtrar los lotes.
- **ListaDesembarques** – Muestra la tabla de lotes. Si hay error o está cargando, muestra un mensaje.
- **FilaDesembarque** – Representa una sola fila de la tabla con el badge de estado, los kilos y la estrella.

### Props
Las props permiten pasar datos de un componente padre a uno hijo. Por ejemplo, App le pasa el arreglo de lotes a ListaDesembarques, y este le pasa cada lote individual a FilaDesembarque.

### Estado con useState
| Variable | Para qué sirve |
|---|---|
| `desembarques` | Guarda los lotes que llegan de la API |
| `cargando` | Muestra el spinner mientras llegan los datos |
| `error` | Guarda el mensaje si la API falla |
| `filtroEspecie` | Guarda el texto del campo de búsqueda |
| `filtroEstado` | Guarda el estado seleccionado en el dropdown |
| `prioritarios` | Guarda los IDs marcados con estrella (se carga desde localStorage) |

### useEffect
Se usa para hacer el fetch a la API una sola vez cuando la página carga. Tiene el arreglo de dependencias vacío `[]` para que no se repita.

### JSX
Toda la interfaz está escrita en JSX, que es HTML dentro de JavaScript. Los componentes retornan JSX con el contenido que se va a mostrar en pantalla.

### Manejo de eventos
- `onChange` en el filtro de texto y el dropdown actualiza el estado del filtro en App.
- `onClick` en el botón de estrella llama a `togglePrioritario`, que marca o desmarca el lote y guarda el cambio en localStorage.

---

## Sugerencia de GitHub Copilot

Al escribir la función `togglePrioritario`, Copilot sugirió envolverla en `useCallback`:

```js
const togglePrioritario = useCallback((id) => {
  const nuevos = new Set(prioritarios)
  nuevos.has(id) ? nuevos.delete(id) : nuevos.add(id)
  setPrioritarios(nuevos)
  localStorage.setItem('prioritarios', JSON.stringify([...nuevos]))
}, [prioritarios])
```

**Decisión: modificada.**
Se mantuvo la lógica interna pero se eliminó el `useCallback`. Ningún componente hijo usa `React.memo`, así que memorizar la función no mejora el rendimiento. Se dejó como función normal para que el código sea más simple y fácil de entender.

---

## R7 – Análisis con SonarLint

### Hallazgo 1 – Llamar setState dentro de useEffect para inicializar estado

**Problema:** La primera versión cargaba el localStorage con un `useEffect` separado, lo que provocaba un render extra innecesario al inicio.

```js
// Versión con problema
useEffect(() => {
  const guardados = localStorage.getItem('prioritarios')
  if (guardados) setPrioritarios(new Set(JSON.parse(guardados)))
}, [])
```

**Corrección:** Se reemplazó por un lazy initializer en el propio `useState`, que solo se ejecuta una vez y no genera render extra:

```js
// Versión corregida
const [prioritarios, setPrioritarios] = useState(() => {
  const guardados = localStorage.getItem('prioritarios')
  return guardados ? new Set(JSON.parse(guardados)) : new Set()
})
```

---

### Hallazgo 2 – URL de la API escrita directamente en el código

**Problema:** La URL `http://localhost:3001/desembarques` estaba hardcodeada en el fetch, lo que hace difícil cambiarla si el servidor cambia de puerto o dirección.

```js
// Versión con problema
const res = await fetch('http://localhost:3001/desembarques')
```

**Corrección:** Se movió la URL a una variable de entorno en el archivo `.env` y se accede con `import.meta.env.VITE_API_URL`:

```js
// Versión corregida
const res = await fetch(import.meta.env.VITE_API_URL)
```

Así, si cambia la URL del servidor, solo hay que editar el `.env` sin tocar el código.