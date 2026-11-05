
function Cart({ carrito, eliminarDelCarrito }) {
  // Calcula el valor total de los productos seleccionados.
  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  )

  return (
    <section className="carrito" id="carrito">
      <h2>Mi carrito de compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">
          Todavía no has agregado productos.
        </p>
      ) : (
        <>
          <div className="lista-carrito">
            {carrito.map((producto) => (
              <article className="producto-carrito" key={producto.id}>
                <div>
                  <h3>{producto.nombre}</h3>
                  <p>Cantidad: {producto.cantidad}</p>
                  <strong>
                    ${(producto.precio * producto.cantidad).toLocaleString('es-CO')}
                  </strong>
                </div>

                <button
                  className="boton-eliminar"
                  onClick={() => eliminarDelCarrito(producto.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <h3 className="total-carrito">
            Total: ${total.toLocaleString('es-CO')}
          </h3>
        </>
      )}
    </section>
  )
}

export default Cart


