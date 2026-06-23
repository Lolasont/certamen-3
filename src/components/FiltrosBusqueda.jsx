import PropTypes from 'prop-types'

function FiltrosBusqueda({ filtroEspecie, filtroEstado, onCambioEspecie, onCambioEstado }) {
  return (
    <div className="filtros">

      <div className="filtro-grupo">
        <label className="filtro-etiqueta" htmlFor="filtro-especie">Especie</label>
        <input
          id="filtro-especie"
          type="text"
          className="filtro-input"
          value={filtroEspecie}
          onChange={(e) => onCambioEspecie(e.target.value)}
          placeholder="Ej: Jurel, Merluza…"
          maxLength={100}
          autoComplete="off"
        />
      </div>

      <div className="filtro-grupo">
        <label className="filtro-etiqueta" htmlFor="filtro-estado">Estado</label>
        <select
          id="filtro-estado"
          className="filtro-select"
          value={filtroEstado}
          onChange={(e) => onCambioEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="procesado">Procesado</option>
          <option value="pendiente">Pendiente</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>

    </div>
  )
}

FiltrosBusqueda.propTypes = {
  filtroEspecie: PropTypes.string.isRequired,
  filtroEstado: PropTypes.string.isRequired,
  onCambioEspecie: PropTypes.func.isRequired,
  onCambioEstado: PropTypes.func.isRequired,
}

export default FiltrosBusqueda