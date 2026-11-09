
const API_URL = 'http://localhost:8080/api/auth'

async function enviarSolicitud(ruta, usuario, contrasena) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario,
      contrasena,
    }),
  })

  const datos = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'No fue posible completar la solicitud.')
  }

  return datos
}

export function registrarUsuario(usuario, contrasena) {
  return enviarSolicitud('/registro', usuario, contrasena)
}

export function iniciarSesion(usuario, contrasena) {
  return enviarSolicitud('/login', usuario, contrasena)
}
