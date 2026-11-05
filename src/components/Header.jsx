
function Header({ cantidadCarrito }) {
  return (
    <header className="encabezado">
      <a href="#inicio" className="logo">
        CARNECOL<span>.</span>
      </a>

      <nav className="navegacion">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Productos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#carrito" className="enlace-carrito">
          Mi carrito
          <span className="contador-carrito">{cantidadCarrito}</span>
        </a>
      </nav>
    </header>
  )
}

export default Header


