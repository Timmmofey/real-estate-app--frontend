import axiosUser from "@/lib/axiosUser"
import { UserProfile, UserType } from "@/types/user"
import axios from "axios"
import { create } from "zustand"
import { useAuthStore } from "./authStore"

interface UserState {
  user: UserProfile | null
  userLoading: boolean
  fetchProfile: (opts?: { force?: boolean }) => Promise<void> | void
  setUser: (user: UserProfile | null) => void
  deleteAccount: () => void
}

let currentFetchProfile: Promise<void> | null = null



export const useUserStore = create<UserState>((set) => ({
  user: null,
  userLoading: false,
  
  setUser: (user) => {
      set({ user })
  },

  fetchProfile: async (opts?: { force?: boolean }) => {
    console.trace("[fetchProfile] called")

    // если уже идёт запрос и не форсируем — возвращаем текущий промис
    if (currentFetchProfile && !opts?.force) return currentFetchProfile

    currentFetchProfile = (async () => {
        set({ userLoading: true })
        try {
            const res = await axiosUser.get("/Users/get-users-info")
            const data = res.data
            const userType: UserType = 'firstName' in data ? 'person' : 'company'
            set({ user: { ...data, userType }})
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                set({ user: null})
                return
            }
            console.warn("[fetchProfile] error", err)
            throw err
        } finally {
            set({ userLoading: false })
            currentFetchProfile = null
        }
    })()

    return currentFetchProfile
  },

  deleteAccount: async () => {
    try {
        await axiosUser.delete("/Users/delete-account")
        set({ user: null })
        useAuthStore.getState().setIsLoggedIn(false)
    } catch (err) {
        console.warn("Logout failed or already invalidated", err)
    }
  }
}))