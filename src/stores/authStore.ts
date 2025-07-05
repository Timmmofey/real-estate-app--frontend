import { create } from 'zustand'
import axiosAuth from '@/lib/axiosAuth'
import axiosUser from '@/lib/axiosUser'

type UserType = "person" | "company"

interface PersonProfile {
  userType: "person"
  firstName: string
  lastName: string
  mainPhotoUrl?: string
  country?: string
  region?: string
  settlement?: string
  zipCode?: string
}

interface CompanyProfile {
  userType: "company"
  name: string
  country: string
  region: string
  settlement: string
  zipCode: string
  registrationAdress: string
  сompanyRegistrationNumber: string
  estimatedAt: string
  mainPhotoUrl?: string
  description?: string
}

type UserProfile = PersonProfile | CompanyProfile

interface AuthStore {
  user: UserProfile | null
  isLoggedIn: boolean
  login: (emailOrPhone: string, password: string) => Promise<void>
  fetchProfile: () => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

// const API_USER_SERVICE_URL = process.env.NEXT_PUBLIC_API_USER_SERVICE_URL!
// const API_AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_API_AUTH_SERVICE_URL!

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  
  

  login: async (emailOrPhone, password) => {
    try {
      await axiosAuth.post("/Auth/login", {
        phoneOrEmail: emailOrPhone,
        password,
      })

      await useAuthStore.getState().fetchProfile()
      set({ isLoggedIn: true })

    } catch (err) {
      console.error("Login error:", err)
      throw err
    }
  },

  fetchProfile: async () => {
    try {
      const res = await axiosUser.get("/Users/get-personal-info")
      const data = res.data
      const userType: UserType = 'firstName' in data ? 'person' : 'company'

      set({ user: { ...data, userType }, isLoggedIn: true })
    } catch (err) {
      console.error("Not authorized", err)
      set({ user: null, isLoggedIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosAuth.post("/Auth/logout")
    } catch (err) {
      console.warn("Logout failed or already invalidated", err)
    }

    set({ user: null, isLoggedIn: false })
  },

  checkAuth: async () => {
    try {
      await useAuthStore.getState().fetchProfile()
    } catch {
      set({ user: null, isLoggedIn: false })
    }
  }
}))
