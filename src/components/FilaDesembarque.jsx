const ETIQUETAS_ESTADO = {
  procesado: 'Procesado',
  pendiente: 'Pendiente',
  rechazado: 'Rechazado',
}

const formatearFecha = (fechaISO) => {
  if (!fechaISO || typeof fechaISO !== 'string') return '—'
  const partes = fechaISO.split('-')
  if (partes.length !== 3) return fechaISO
  const [anio, mes, dia] = partes
  return `${dia}/${mes}/${anio}`
}

const formatearKilos = (kilos) => {
  if (typeof kilos !== 'number') return '—'
  return kilos.toLocaleString('es-CL')
}

function FilaDesembarque({ lote, esPrioritario, onToggle }) {
  const estadoValido = ETIQUETAS_ESTADO[lote.estado] ? lote.estado : 'desconocido'

  return (
    <tr
      className={`tabla-fila${esPrioritario ? ' tabla-fila--prioritaria' : ''}`}
    >
      <td className="tabla-td tabla-td--centro tabla-td--id">
        #{lote.id}
      </td>

      <td className="tabla-td tabla-td--especie">
        {lote.especie}
      </td>

      <td className="tabla-td">
        {lote.embarcacion}
      </td>

      <td className="tabla-td tabla-td--fecha">
        {formatearFecha(lote.fecha)}
      </td>

      <td className="tabla-td tabla-td--derecha">
        <span className="chip-kilos">
          {formatearKilos(lote.kilos)} kg
        </span>
      </td>

      <td className="tabla-td tabla-td--centro">
        <span className={`badge-estado badge-estado--${estadoValido}`}>
          {ETIQUETAS_ESTADO[estadoValido] ?? 'Desconocido'}
        </span>
      </td>

      <td className="tabla-td tabla-td--centro">
        <button
          className={`boton-estrella${esPrioritario ? ' boton-estrella--activo' : ''}`}
          onClick={() => onToggle(lote.id)}
          aria-label={
            esPrioritario
              ? `Quitar lote ${lote.id} de prioritarios`
              : `Marcar lote ${lote.id} como prioritario`
          }
          title={esPrioritario ? 'Quitar prioridad' : 'Marcar como prioritario'}
        >
          {esPrioritario ? '★' : '☆'}
        </button>
      </td>
    </tr>
  )
}

export default FilaDesembarque
