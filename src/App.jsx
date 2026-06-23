import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado'
import FiltrosBusqueda from './components/FiltrosBusqueda'
import ListaDesembarques from './components/ListaDesembarques'

function App() {
  // Estado donde se guardan los datos obtenidos de la API
  const [desembarques, setDesembarques] = useState([])

  // Estado para indicar si los datos están cargando
  const [cargando, setCargando] = useState(true)

  // Estado para guardar errores si ocurren
  const [error, setError] = useState(null)

  // Filtro por especie (texto que escribe el usuario)
  const [filtroEspecie, setFiltroEspecie] = useState('')

  // Filtro por estado (ej: aprobado, pendiente, etc)
  const [filtroEstado, setFiltroEstado] = useState('')

  // Estado de prioritarios, se inicializa leyendo localStorage una sola vez
  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem('prioritarios')
    // Si hay datos guardados, los convierte a Set, si no, crea uno vacío
    return guardados ? new Set(JSON.parse(guardados)) : new Set()
  })

  // useEffect que se ejecuta una vez al montar el componente
  // Sirve para obtener los datos desde la API
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setCargando(true)

        // Petición a la API usando la variable de entorno
        const res = await fetch(import.meta.env.VITE_API_URL)

        // Si la respuesta falla, lanza error
        if (!res.ok) throw new Error('Error al obtener datos')

        // Convierte la respuesta a JSON
        const data = await res.json()

        // Guarda los datos en el estado
        setDesembarques(data)
      } catch (err) {
        // Guarda el mensaje de error
        setError(err.message)
      } finally {
        // Finaliza el estado de carga
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  // Función para marcar o desmarcar un lote como prioritario
  const togglePrioritario = (id) => {
    // Crea una copia del Set actual
    const nuevos = new Set(prioritarios)

    if (nuevos.has(id)) {
      // Si ya es prioritario, lo elimina
      nuevos.delete(id)
    } else {
      // Si no lo es, lo agrega
      nuevos.add(id)
    }

    // Actualiza el estado
    setPrioritarios(nuevos)

    // Guarda los datos actualizados en localStorage
    localStorage.setItem('prioritarios', JSON.stringify([...nuevos]))
  }

  // Filtra los datos según los filtros aplicados
  const datosFiltrados = desembarques.filter((lote) => {
    // Verifica si la especie coincide con el texto ingresado
    const coincideEspecie = lote.especie
      .toLowerCase()
      .includes(filtroEspecie.toLowerCase().trim())

    // Verifica si el estado coincide o si no hay filtro aplicado
    const coincideEstado =
      filtroEstado === '' || lote.estado === filtroEstado

    // Retorna solo los que cumplen ambas condiciones
    return coincideEspecie && coincideEstado
  })
  
  return (
    <div className="app">
      {/* Componente de encabezado */}
      <Encabezado />

      <main className="contenedor">
        <div className="card">
          {/* Componente de filtros */}
          <FiltrosBusqueda
            filtroEspecie={filtroEspecie}
            filtroEstado={filtroEstado}
            onCambioEspecie={setFiltroEspecie}
            onCambioEstado={setFiltroEstado}
          />
        </div>

        <div className="card">
          {/* Componente que muestra la lista de desembarques */}
          <ListaDesembarques
            desembarques={datosFiltrados}
            prioritarios={prioritarios}
            onTogglePrioritario={togglePrioritario}
            cargando={cargando}
            error={error}
          />
        </div>
      </main>
    </div>
  )
}

export default App
