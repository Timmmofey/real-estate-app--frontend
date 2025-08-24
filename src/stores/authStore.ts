import { create } from 'zustand'
import axiosAuth from '@/lib/axiosAuth'
import { useUserStore } from './userStore'

interface AuthStore {
  isLoggedIn: boolean
  authLoading: boolean
  login: (emailOrPhone: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  authLoading: true,

  login: async (emailOrPhone, password) => {
    set({authLoading: true})
    try {
      await axiosAuth.post("/Auth/login", {
        phoneOrEmail: emailOrPhone,
        password,
      })

      await useUserStore.getState().fetchProfile()
      set({ isLoggedIn: true })

    } catch (err) {
      console.error("Login error:", err)
      throw err
    } finally{
      set({authLoading: false})
    }
  },

  logout: async () => {
    try {
      await axiosAuth.post("/Auth/logout")
    } catch (err) {
      console.warn("Logout failed or already invalidated", err)
    }

    set({ isLoggedIn: false })
    useUserStore.getState().setUser(null)
  },

  checkAuth: async () => {
    set({authLoading: true})
    try {
      await useUserStore.getState().fetchProfile()
      set({ isLoggedIn: true })
    } catch {
      set({ isLoggedIn: false })
      useUserStore.getState().setUser(null)
    } finally{
      set({authLoading: false})
    }
  }
}))
