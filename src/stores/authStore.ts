import { create } from 'zustand'
import axiosAuth from '@/lib/axiosAuth'
import { useUserStore } from './userStore'

interface AuthStore {
  isLoggedIn: boolean
  authLoading: boolean
  login: (emailOrPhone: string, password: string) => Promise<{restore: boolean}>
  logout: () => void
  logoutAll: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  authLoading: true,

  login: async (emailOrPhone, password) => {
    set({authLoading: true})
    try {
      const res = await axiosAuth.post("/Auth/login", {
        phoneOrEmail: emailOrPhone,
        password,
      })

      if(res.data?.restore === true) return { restore: true }

      await useUserStore.getState().fetchProfile()
      set({ isLoggedIn: true })

      return { restore: false }
    } catch (err) {
      console.error("Login error:", err)
      return { restore: false }
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

  logoutAll: async () => {
    try {
      await axiosAuth.post("/Auth/logout-all")
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
      // set({ isLoggedIn: false })
      // useUserStore.getState().setUser(null)
      try {
        await useUserStore.getState().fetchProfile()
        set({ isLoggedIn: true })
      } catch {
        set({ isLoggedIn: false })
        useUserStore.getState().setUser(null)
      } 
    } 
    finally{
      set({authLoading: false})
    }
  }
}))
