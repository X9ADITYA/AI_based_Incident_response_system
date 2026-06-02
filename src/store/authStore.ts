import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { sleep } from '@/lib/utils'
import { MOCK_CREDENTIALS } from '@/lib/constants'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

const MOCK_USER: User = {
  id: 'user-001',
  name: 'Alex Morgan',
  email: 'admin@skillmatrix.pro',
  avatar: null,
  role: 'admin',
  organization: 'SkillMatrix Pro',
  department: 'Engineering',
  joinedAt: '2023-06-01',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        await sleep(800)
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          const token = 'mock_jwt_token_' + Date.now()
          localStorage.setItem('auth_token', token)
          set({ user: MOCK_USER, token, isLoading: false })
        } else {
          set({ error: 'Invalid email or password. Try admin@skillmatrix.pro / Admin123!', isLoading: false })
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token')
        set({ user: null, token: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)
