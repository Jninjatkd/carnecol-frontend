
import { useEffect, useRef, useState } from 'react'

function Header({
  cantidadCarrito,
  usuarioSesion,
  onAbrirAutenticacion,
  onCerrarSesion,
  onAbrirPerfil,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const contenedorPerfil = useRef(null)

  useEffect(() => {
    const cerrarMenuExterno = (evento) => {
      if (!contenedorPerfil.current?.contains(evento.target)) {
        setMenuAbierto(false)
      }
    }

    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') {
        setMenuAbierto(false)
      }
    }

    document.addEventListener('pointerdown', cerrarMenuExterno)
    document.addEventListener('keydown', cerrarConEscape)
    return () => {
      document.removeEventListener('pointerdown', cerrarMenuExterno)
      document.removeEventListener('keydown', cerrarConEscape)
    }
  }, [])

  const abrirAuth = (modo) => {
    setMenuAbierto(false)
    onAbrirAutenticacion(modo)
  }

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

      <div className="perfil-contenedor" ref={contenedorPerfil}>
        <button
          className="boton-perfil"
          type="button"
          aria-label="Abrir menú de usuario"
          aria-expanded={menuAbierto}
          aria-haspopup="menu"
          onClick={() => {
            setMenuAbierto((abierto) => !abierto)
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 12a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm0 2c-4.1 0-7.5 2.1-7.5 4.7V21h15v-2.3c0-2.6-3.4-4.7-7.5-4.7Z" />
          </svg>
        </button>

        {menuAbierto && (
          <div className="menu-perfil" role="menu">
            {usuarioSesion ? (
              <>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuAbierto(false)
                    onAbrirPerfil()
                  }}
                >
                  Mi perfil
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuAbierto(false)
                    onCerrarSesion()
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button type="button" role="menuitem" onClick={() => abrirAuth('login')}>
                  Iniciar sesión
                </button>
                <button type="button" role="menuitem" onClick={() => abrirAuth('registro')}>
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header


