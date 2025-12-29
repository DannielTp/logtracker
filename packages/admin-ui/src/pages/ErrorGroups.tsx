import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuthStore } from '../store/auth'

type ErrorGroup = {
	id: string
	message: string
	type: string
	count: number
	firstSeen: string
	lastSeen: string
}

export function ErrorGroups({
	projectKey,
	onSelect,
}: {
	projectKey: string
	onSelect: (groupId: string) => void
}) {
	const [groups, setGroups] = useState<ErrorGroup[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { username, password, logout } = useAuthStore()

	useEffect(() => {
		if (!username || !password) return

		api<ErrorGroup[]>(`/errors/projects/${projectKey}`, projectKey, { username, password })
			.then(setGroups)
			.catch((err) => {
				if (err.message === 'Unauthorized') {
					logout()
				} else {
					setError(err.message)
				}
			})
			.finally(() => setLoading(false))
	}, [projectKey, username, password, logout])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const now = new Date()
		const diff = now.getTime() - date.getTime()
		const minutes = Math.floor(diff / 60000)
		const hours = Math.floor(minutes / 60)
		const days = Math.floor(hours / 24)

		if (days > 0) return `${days}d ago`
		if (hours > 0) return `${hours}h ago`
		if (minutes > 0) return `${minutes}m ago`
		return 'Just now'
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="bg-red-50 border border-red-200 rounded-lg p-4">
				<p className="text-red-800 font-medium">Error: {error}</p>
			</div>
		)
	}

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-slate-900">Error Groups</h2>
				<p className="text-slate-600 mt-1">{groups.length} error groups found</p>
			</div>

			{groups.length === 0 ? (
				<div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
					<p className="text-slate-500">No error groups found</p>
				</div>
			) : (
				<div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
					<div className="divide-y divide-slate-200">
						{groups.map(g => (
							<button
								key={g.id}
								onClick={() => onSelect(g.id)}
								className="w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors group"
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
												{g.type}
											</span>
											<span className="text-xs text-slate-500">
												Last seen {formatDate(g.lastSeen)}
											</span>
										</div>
										<p className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors truncate">
											{g.message}
										</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="text-right">
											<div className="text-2xl font-bold text-slate-900">{g.count}</div>
											<div className="text-xs text-slate-500">events</div>
										</div>
										<svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
