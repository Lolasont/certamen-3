function FilaDesembarque({ lote, esPrioritario, onToggle }) {
  // Formatear fecha de YYYY-MM-DD a DD/MM/YYYY
  const fecha = lote.fecha.split('-').reverse().join('/')

  // Formatear kilos con separador de miles
  const kilos = lote.kilos.toLocaleString('es-CL')

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
        <span className={`badge badge-${lote.estado}`}>
          {lote.estado}
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

export default FilaDesembarque
