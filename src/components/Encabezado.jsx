function Encabezado() {
  return (
    <header className="encabezado">
      <div className="encabezado-contenido">

        <div className="encabezado-marca">
          <span className="encabezado-icono" aria-hidden="true">⚓</span>
          <div className="encabezado-textos">
            <span className="encabezado-empresa">
              Pesquera Talcahuano Sur SpA
            </span>
            <span className="encabezado-slogan">
              Bahía de Talcahuano · Región del Biobío
            </span>
          </div>
        </div>

        <nav className="encabezado-nav" aria-label="Navegación principal">
          <span className="nav-item nav-item--activo">
            Panel de Desembarques
          </span>
        </nav>

      </div>
    </header>
  )
}

export default Encabezado
