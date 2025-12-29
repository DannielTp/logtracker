import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuthStore } from '../store/auth'

type ErrorEvent = {
	id: string
	timestamp: string
	environment: string
	service: string
	payload: {
		error: {
			type: string
			message: string
		}
		service: string
		projectKey: string
		environment: string
	}
	createdAt: string
}

export function ErrorEvents({
	groupId,
	projectKey,
	onBack,
}: {
	groupId: string
	projectKey: string
	onBack: () => void
}) {
	const [events, setEvents] = useState<ErrorEvent[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedEvent, setSelectedEvent] = useState<ErrorEvent | null>(null)
	const { username, password, logout } = useAuthStore()

	useEffect(() => {
		if (!username || !password) return

		api<ErrorEvent[]>(`/errors/groups/${groupId}/events`, projectKey, { username, password })
			.then(setEvents)
			.catch((err) => {
				if (err.message === 'Unauthorized') {
					logout()
				}
			})
			.finally(() => setLoading(false))
	}, [groupId, projectKey, username, password, logout])

	const formatDateTime = (dateString: string) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('es-ES', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}).format(date)
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onBack}
					className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
				>
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					Back to Groups
				</button>
			</div>

			<div className="mb-6">
				<h2 className="text-2xl font-bold text-slate-900">Error Events</h2>
				<p className="text-slate-600 mt-1">{events.length} events in this group</p>
			</div>

			<div className="grid gap-4">
				{events.map(e => (
					<div
						key={e.id}
						className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
					>
						<div className="p-6">
							<div className="flex items-start justify-between gap-4 mb-4">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-800">
											{e.payload.error.type}
										</span>
										<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
											{e.environment}
										</span>
										<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
											{e.service}
										</span>
									</div>
									<h3 className="text-lg font-semibold text-slate-900">
										{e.payload.error.message}
									</h3>
								</div>
								<button
									onClick={() => setSelectedEvent(selectedEvent?.id === e.id ? null : e)}
									className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
								>
									<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</button>
							</div>

							<div className="flex items-center gap-6 text-sm text-slate-600">
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<span>{formatDateTime(e.timestamp)}</span>
								</div>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
									</svg>
									<span className="font-mono text-xs">{e.id.substring(0, 8)}</span>
								</div>
							</div>

							{selectedEvent?.id === e.id && (
								<div className="mt-4 pt-4 border-t border-slate-200">
									<h4 className="text-sm font-semibold text-slate-900 mb-2">Full Payload</h4>
									<pre className="bg-slate-50 rounded-lg p-4 text-xs overflow-x-auto">
										<code className="text-slate-800">{JSON.stringify(e, null, 2)}</code>
									</pre>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
