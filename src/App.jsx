
import { useEffect, useState } from 'react'

// Importación de los componentes de Carnecol.
import Header from './components/Header.jsx'
import ProductCard from './components/ProductCard.jsx'
import Cart from './components/Cart.jsx'
import Auth from './components/Auth.jsx'
import Footer from './components/Footer.jsx'

import './App.css'

// Productos iniciales del catálogo.
const productosIniciales = [
  {
    id: 1,
    nombre: 'Pechuga de pollo',
    categoria: 'Pollo',
    precio: 18000,
    descripcion: 'Pechuga de pollo fresca y de excelente calidad.',
  },
  {
    id: 2,
    nombre: 'Carne de res',
    categoria: 'Carnes frescas',
    precio: 25000,
    descripcion: 'Carne de res seleccionada para sus comidas.',
  },
  {
    id: 3,
    nombre: 'Carne de cerdo',
    categoria: 'Cerdo',
    precio: 22000,
    descripcion: 'Carne de cerdo fresca y lista para preparar.',
  },
  {
    id: 4,
    nombre: 'Chorizo',
    categoria: 'Embutidos',
    precio: 15000,
    descripcion: 'Chorizos con excelente sabor y calidad.',
  },
]

function App() {
  // Estado que almacena los productos del carrito.
  const [carrito, setCarrito] = useState([])
  const [usuarioSesion, setUsuarioSesion] = useState(null)
  const [modalAuth, setModalAuth] = useState(null)
  const [checkoutAbierto, setCheckoutAbierto] = useState(false)
  const [perfilAbierto, setPerfilAbierto] = useState(false)

  // Agrega productos o aumenta su cantidad si ya existen.
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExiste = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  // Elimina un producto del carrito.
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.id !== idProducto)
    )
  }

  // Calcula la cantidad total de unidades seleccionadas.
  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  const abrirAutenticacion = (modo, aviso = '', continuarCheckout = false) => {
    setModalAuth({ modo, aviso, continuarCheckout })
  }

  const manejarLoginExitoso = (usuario) => {
    const continuarCheckout = modalAuth?.continuarCheckout
    setUsuarioSesion(usuario)
    setModalAuth(null)

    if (continuarCheckout) {
      setCheckoutAbierto(true)
    }
  }

  const manejarCheckout = () => {
    if (!usuarioSesion) {
      abrirAutenticacion(
        'login',
        'Inicia sesión o regístrate para continuar con tu compra.',
        true
      )
      return
    }

    setCheckoutAbierto(true)
  }

  useEffect(() => {
    if (!checkoutAbierto && !perfilAbierto) return undefined

    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') {
        setCheckoutAbierto(false)
        setPerfilAbierto(false)
      }
    }

    window.addEventListener('keydown', manejarTecla)
    return () => window.removeEventListener('keydown', manejarTecla)
  }, [checkoutAbierto, perfilAbierto])

  return (
    <div className="aplicacion">
      <Header
        cantidadCarrito={cantidadCarrito}
        usuarioSesion={usuarioSesion}
        onAbrirAutenticacion={abrirAutenticacion}
        onCerrarSesion={() => setUsuarioSesion(null)}
        onAbrirPerfil={() => setPerfilAbierto(true)}
      />

      <main>
        <section className="presentacion" id="inicio">
          <div>
            <p className="etiqueta">CALIDAD Y FRESCURA</p>

            <h1>Bienvenido a Carnecol</h1>

            <p>
              Encuentra productos cárnicos frescos y embutidos
              de excelente calidad para tu hogar.
            </p>

            <a className="boton-principal" href="#catalogo">
              Explorar productos
            </a>
          </div>
        </section>

        <section className="catalogo" id="catalogo">
          <h2>Nuestros productos</h2>

          <p className="subtitulo">
            Seleccionamos productos de calidad para ti.
          </p>

          <div className="productos">
            {productosIniciales.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
          </div>
        </section>

        <section className="nosotros" id="nosotros">
          <h2>Sobre Carnecol</h2>
          <p>
            Somos una propuesta enfocada en ofrecer productos
            cárnicos frescos y embutidos de calidad.
          </p>
        </section>

        <Cart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
          onCheckout={manejarCheckout}
        />
      </main>

      {modalAuth && (
        <Auth
          modoInicial={modalAuth.modo}
          aviso={modalAuth.aviso}
          onClose={() => setModalAuth(null)}
          onAuthenticated={manejarLoginExitoso}
        />
      )}

      {checkoutAbierto && (
        <div
          className="capa-modal"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) setCheckoutAbierto(false)
          }}
        >
          <section className="dialogo-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-titulo">
            <button
              className="boton-cerrar-modal"
              type="button"
              aria-label="Cerrar revisión de compra"
              onClick={() => setCheckoutAbierto(false)}
            >
              ×
            </button>
            <p className="etiqueta-modal">COMPRA</p>
            <h2 id="checkout-titulo">Revisión de compra</h2>
            <p>Sesión iniciada como <strong>{usuarioSesion}</strong>.</p>
            <ul className="resumen-compra">
              {carrito.map((producto) => (
                <li key={producto.id}>
                  <span>{producto.nombre} × {producto.cantidad}</span>
                  <strong>${(producto.precio * producto.cantidad).toLocaleString('es-CO')}</strong>
                </li>
              ))}
            </ul>
            <p className="total-modal">
              Total: ${carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toLocaleString('es-CO')}
            </p>
            <p className="aviso-checkout" role="status">
              El backend actual no ofrece una ruta para registrar pedidos. Esta revisión no envía ni confirma una compra.
            </p>
            <button type="button" onClick={() => setCheckoutAbierto(false)}>
              Volver al carrito
            </button>
          </section>
        </div>
      )}

      {perfilAbierto && (
        <div
          className="capa-modal"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) setPerfilAbierto(false)
          }}
        >
          <section className="dialogo-modal" role="dialog" aria-modal="true" aria-labelledby="perfil-titulo">
            <button
              className="boton-cerrar-modal"
              type="button"
              aria-label="Cerrar perfil"
              onClick={() => setPerfilAbierto(false)}
            >
              ×
            </button>
            <p className="etiqueta-modal">CUENTA</p>
            <h2 id="perfil-titulo">Mi perfil</h2>
            <p>Usuario: <strong>{usuarioSesion}</strong></p>
            <p className="aviso-checkout">
              El backend no proporciona datos adicionales de perfil; se muestra el usuario de esta sesión.
            </p>
            <button type="button" onClick={() => setPerfilAbierto(false)}>
              Cerrar
            </button>
          </section>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
