import { useState } from 'react'

interface LoginProps {
	onLogin: (username: string, password: string) => void
}

export function Login({ onLogin }: LoginProps) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (username && password) {
			onLogin(username, password)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
			<div className="w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">LogTracker</h1>
						<p className="text-slate-300">Admin Panel</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-slate-200 mb-2">
								Usuario
							</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
								placeholder="Ingresa tu usuario"
								autoFocus
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-200 mb-2">
								Contraseña
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
								placeholder="Ingresa tu contraseña"
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
						>
							Iniciar Sesión
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
