import { useEffect, useState } from 'react'
import {
	registrarUsuario,
	iniciarSesion,
} from '../services/authService'

function Auth({ modoInicial, aviso, onClose, onAuthenticated }) {
	const [modo, setModo] = useState(modoInicial)
	const [usuario, setUsuario] = useState('')
	const [contrasena, setContrasena] = useState('')
	const [mensaje, setMensaje] = useState('')
	const [cargando, setCargando] = useState(false)

	useEffect(() => {
		const manejarTecla = (evento) => {
			if (evento.key === 'Escape' && !cargando) onClose()
		}

		const overflowAnterior = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', manejarTecla)
		return () => {
			document.body.style.overflow = overflowAnterior
			window.removeEventListener('keydown', manejarTecla)
		}
	}, [cargando, onClose])

	const manejarEnvio = async (e) => {
		e.preventDefault()
		setMensaje('')
		setCargando(true)

		try {
			const respuesta =
				modo === 'registro'
					? await registrarUsuario(usuario, contrasena)
					: await iniciarSesion(usuario, contrasena)

			setMensaje(respuesta.mensaje || 'Solicitud completada.')
			if (modo === 'login') onAuthenticated(usuario)
		} catch (error) {
			setMensaje(
				error instanceof TypeError
					? 'No fue posible conectar con el servidor.'
					: error.message || 'No fue posible completar la solicitud.'
			)
		} finally {
			setCargando(false)
		}
	}

	return (
		<div
			className="capa-modal"
			onMouseDown={(evento) => {
				if (evento.target === evento.currentTarget && !cargando) onClose()
			}}
		>
			<section className="dialogo-modal autenticacion" role="dialog" aria-modal="true" aria-labelledby="auth-titulo">
				<button className="boton-cerrar-modal" type="button" aria-label="Cerrar formulario" onClick={onClose} disabled={cargando}>
					×
				</button>
				<p className="etiqueta-modal">CUENTA CARNECOL</p>
				<h2 id="auth-titulo">
					{modo === 'registro' ? 'Crear cuenta' : 'Iniciar sesión'}
				</h2>

				{aviso && <p className="aviso-autenticacion">{aviso}</p>}
				<p>
					{modo === 'registro'
						? 'Regístrate para utilizar Carnecol.'
						: 'Ingresa a tu cuenta de Carnecol.'}
				</p>

			<form onSubmit={manejarEnvio}>
				<label htmlFor="usuario">Usuario</label>
				<input
					id="usuario"
					type="text"
					value={usuario}
					onChange={(e) => setUsuario(e.target.value)}
					placeholder="Escribe tu usuario"
					required
				/>

				<label htmlFor="contrasena">Contraseña</label>
				<input
					id="contrasena"
					type="password"
					value={contrasena}
					onChange={(e) => setContrasena(e.target.value)}
					placeholder="Escribe tu contraseña"
					required
				/>

				<button type="submit" disabled={cargando}>
					{cargando
						? 'Procesando...'
						: modo === 'registro'
							? 'Registrarme'
							: 'Ingresar'}
				</button>
			</form>

			{mensaje && <p role="status">{mensaje}</p>}

			<button
				type="button"
				onClick={() => {
					setModo(modo === 'registro' ? 'login' : 'registro')
					setMensaje('')
				}}
			>
				{modo === 'registro'
					? '¿Ya tienes cuenta? Inicia sesión'
					: '¿No tienes cuenta? Regístrate'}
			</button>
			</section>
		</div>
	)
}

export default Auth
