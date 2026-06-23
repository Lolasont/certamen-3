import PropTypes from 'prop-types'
import FilaDesembarque from './FilaDesembarque'

function ListaDesembarques({ desembarques, prioritarios, onTogglePrioritario, cargando, error }) {

  if (cargando) {
    return (
      <div className="estado">
        <div className="spinner" />
        <p>Cargando lotes de desembarque…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="estado error">
        <span className="estado-icono">⚠️</span>
        <p>No se pudo cargar la información.</p>
        <p>{error}</p>
      </div>
    )
  }

  if (desembarques.length === 0) {
    return (
      <div className="estado">
        <span className="estado-icono">🔍</span>
        <p>No hay lotes que coincidan con los filtros.</p>
      </div>
    )
  }

  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Especie</th>
            <th>Embarcación</th>
            <th>Fecha</th>
            <th>Kilos</th>
            <th>Estado</th>
            <th>Prioritario</th>
          </tr>
        </thead>
        <tbody>
          {desembarques.map((lote) => (
            <FilaDesembarque
              key={lote.id}
              lote={lote}
              esPrioritario={prioritarios.has(lote.id)}
              onToggle={onTogglePrioritario}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

ListaDesembarques.propTypes = {
  desembarques: PropTypes.arrayOf(PropTypes.object).isRequired,
  prioritarios: PropTypes.instanceOf(Set).isRequired,
  onTogglePrioritario: PropTypes.func.isRequired,
  cargando: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

ListaDesembarques.defaultProps = {
  error: null,
}

export default ListaDesembarques