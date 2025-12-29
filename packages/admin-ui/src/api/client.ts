const API_URL = import.meta.env.VITE_ADMIN_API_URL ?? 'http://localhost:4003'

export async function api<T>(
    path: string,
    projectKey: string,
    auth?: { username: string; password: string },
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-project-key': projectKey,
    }

    if (auth) {
        headers.Authorization =
            'Basic ' + btoa(`${auth.username}:${auth.password}`)
    }

    const res = await fetch(`${API_URL}${path}`, { headers })

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Unauthorized')
        }
        throw new Error(`API error: ${res.status}`)
    }

    return res.json()
}
