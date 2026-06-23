import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado'
import FiltrosBusqueda from './components/FiltrosBusqueda'
import ListaDesembarques from './components/ListaDesembarques'

function App() {
  const [desembarques, setDesembarques] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [filtroEspecie, setFiltroEspecie] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem('prioritarios')
    return guardados ? new Set(JSON.parse(guardados)) : new Set()
  })

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setCargando(true)
        const res = await fetch(import.meta.env.VITE_API_URL)

        if (!res.ok) throw new Error('Error al obtener datos')

        const data = await res.json()
        setDesembarques(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  const togglePrioritario = (id) => {
    const nuevos = new Set(prioritarios)

    if (nuevos.has(id)) {
      nuevos.delete(id)
    } else {
      nuevos.add(id)
    }

    setPrioritarios(nuevos)
    localStorage.setItem('prioritarios', JSON.stringify([...nuevos]))
  }

  const datosFiltrados = desembarques.filter((lote) => {
    const coincideEspecie = lote.especie
      .toLowerCase()
      .includes(filtroEspecie.toLowerCase().trim())

    const coincideEstado =
      filtroEstado === '' || lote.estado === filtroEstado

    return coincideEspecie && coincideEstado
  })
  
  return (
    <div className="app">
      <Encabezado />

      <main className="contenedor">
        <div className="card">
          <FiltrosBusqueda
            filtroEspecie={filtroEspecie}
            filtroEstado={filtroEstado}
            onCambioEspecie={setFiltroEspecie}
            onCambioEstado={setFiltroEstado}
          />
        </div>

        <div className="card">
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
