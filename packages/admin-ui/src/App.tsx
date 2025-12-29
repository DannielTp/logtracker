import { useState } from 'react'
import { ErrorGroups } from './pages/ErrorGroups'
import { ErrorEvents } from './pages/ErrorEvents'
import { Login } from './pages/Login'
import { useAuthStore } from './store/auth'

export default function App() {
  const [groupId, setGroupId] = useState<string | null>(null)
  const projectKey = '1234'
  const { isAuthenticated, login, logout, username } = useAuthStore()

  if (!isAuthenticated) {
    return <Login onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">LT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">LogTracker</h1>
                <p className="text-sm text-slate-500">Error Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{username}</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!groupId ? (
          <ErrorGroups
            projectKey={projectKey}
            onSelect={setGroupId}
          />
        ) : (
          <ErrorEvents
            groupId={groupId}
            projectKey={projectKey}
            onBack={() => setGroupId(null)}
          />
        )}
      </main>
    </div>
  )
}
