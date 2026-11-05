
function ProductCard({ producto, agregarAlCarrito }) {
  const imagenes = {
    Pollo: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600",
    Cerdo: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
    Res: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
    Pescado: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600"
  }

  return (
    <article className="tarjeta">
      <img
        className="imagen-producto"
        src={imagenes[producto.categoria] || imagenes.Pollo}
        alt={producto.nombre}
      />

      <div className="informacion-producto">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <strong>${producto.precio.toLocaleString('es-CO')}</strong>

        <button onClick={() => agregarAlCarrito(producto)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default ProductCard
