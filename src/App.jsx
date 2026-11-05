
import { useState } from 'react'

// Importación de los componentes de Carnecol.
import Header from './components/Header.jsx'
import ProductCard from './components/ProductCard.jsx'
import Cart from './components/Cart.jsx'
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

  return (
    <div className="aplicacion">
      <Header cantidadCarrito={cantidadCarrito} />

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
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
