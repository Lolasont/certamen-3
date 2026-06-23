import PropTypes from 'prop-types'

function FilaDesembarque({ lote, esPrioritario, onToggle }) {
  // Formatear fecha de YYYY-MM-DD a DD/MM/YYYY
  const fecha = lote.fecha.split('-').reverse().join('/')

  // Formatear kilos con separador de miles
  const kilos = lote.kilos.toLocaleString('es-CL')

  const ESTADOS_VALIDOS = ['procesado', 'pendiente', 'rechazado']
  const estadoSeguro = ESTADOS_VALIDOS.includes(lote.estado) ? lote.estado : 'pendiente'

  return (
    <tr className={esPrioritario ? 'prioritaria' : ''}>
      <td>#{lote.id}</td>
      <td><strong>{lote.especie}</strong></td>
      <td>{lote.embarcacion}</td>
      <td>{fecha}</td>
      <td>
        <span className="chip-kilos">{kilos} kg</span>
      </td>
      <td>
        <span className={`badge badge-${estadoSeguro}`}>
          {estadoSeguro}
        </span>
      </td>
      <td style={{ textAlign: 'center' }}>
        <button
          className={`btn-estrella ${esPrioritario ? 'activa' : ''}`}
          onClick={() => onToggle(lote.id)}
          title={esPrioritario ? 'Quitar prioridad' : 'Marcar como prioritario'}
        >
          {esPrioritario ? '★' : '☆'}
        </button>
      </td>
    </tr>
  )
}

FilaDesembarque.propTypes = {
  lote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    especie: PropTypes.string.isRequired,
    embarcacion: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    kilos: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  esPrioritario: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default FilaDesembarque