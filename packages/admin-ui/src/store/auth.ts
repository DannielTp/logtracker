import { create } from 'zustand'

interface AuthState {
    username: string | null
    password: string | null
    isAuthenticated: boolean
    login: (username: string, password: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    username:
        typeof window !== 'undefined'
            ? localStorage.getItem('auth-username')
            : null,
    password:
        typeof window !== 'undefined'
            ? localStorage.getItem('auth-password')
            : null,
    isAuthenticated:
        typeof window !== 'undefined'
            ? localStorage.getItem('auth-isAuthenticated') === 'true'
            : false,
    login: (username, password) => {
        localStorage.setItem('auth-username', username)
        localStorage.setItem('auth-password', password)
        localStorage.setItem('auth-isAuthenticated', 'true')
        set({
            username,
            password,
            isAuthenticated: true,
        })
    },
    logout: () => {
        localStorage.removeItem('auth-username')
        localStorage.removeItem('auth-password')
        localStorage.removeItem('auth-isAuthenticated')
        set({
            username: null,
            password: null,
            isAuthenticated: false,
        })
    },
}))
