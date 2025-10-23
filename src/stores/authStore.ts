import { create } from 'zustand'
import axiosAuth from '@/lib/axiosAuth'
import { useUserStore } from './userStore'
import axios from 'axios'

interface AuthStore {
  isLoggedIn: boolean
  authLoading: boolean
  login: (emailOrPhone: string, password: string) => Promise<{restore: boolean} | { twoFactorAuth: boolean} |  { success: true }  | { error: unknown } >
  logout: () => void
  logoutAll: () => void
  checkAuth: () => Promise<void>
  setIsLoggedIn: (state: boolean) => void
}



export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  authLoading: true,

  login: async (emailOrPhone, password) => {
    console.log("[authStore] login called", { emailOrPhone })
    set({ authLoading: true })

    try {
      const res = await axiosAuth.post("/Auth/login", {
        phoneOrEmail: emailOrPhone,
        password,
      })

      console.log("[authStore] axios res:", res?.status, res?.data)

      if (res.data?.restore === true) {
        console.log("[authStore] restore true")
        return { restore: true }
      }

      if (res.data?.isTwoFactorAuth === true) {
        console.log("[authStore] two factor")
        return { twoFactorAuth: true }
      }

      await useUserStore.getState().fetchProfile()
      set({ isLoggedIn: true })

      console.log("[authStore] login success")
      return { success: true }
    } catch (err) {
      console.warn("[authStore] login catch", err)

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message ?? err.message ?? "Login failed"
        console.log("[authStore] returning error object:", message)
        return { error: message }
      }

      return { error: "Unexpected error" }
    } finally {
      set({ authLoading: false })
      console.log("[authStore] authLoading false (finally)")
    }
  },

  logout: async () => {
    try {
      await axiosAuth.post("/Auth/logout")
      set({ isLoggedIn: false })
      useUserStore.getState().setUser(null)
    } catch (err) {
      console.warn("Logout failed or already invalidated", err)
    }

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
      const user = useUserStore.getState().user
      if(user){
        set({ isLoggedIn: true })
      }
      console.log("[checkAuth ok]")
    } 
    catch {
      set({ isLoggedIn: false })
      useUserStore.getState().setUser(null)
      console.log("[checkAuth not ok]")
    } 
    finally{
      set({authLoading: false})
    }
  },

  setIsLoggedIn: (state: boolean) => {
    set({isLoggedIn: state})
  }
}))
