import axiosUser from "@/lib/axiosUser"
import { UserProfile, UserType } from "@/types/user"
import { create } from "zustand"

interface UserState {
  user: UserProfile | null
  userLoading: boolean
  isLoggedIn: boolean
  fetchProfile: () => Promise<void>
  setUser: (user: UserProfile | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    userLoading: false,
    isLoggedIn: false,

    setUser: (user) => {
        set({ user, isLoggedIn: !!user })
    },

    fetchProfile: async () => {
        set({userLoading: true})
        try {
            const res = await axiosUser.get("/Users/get-users-info")
            const data = res.data
            const userType: UserType = 'firstName' in data ? 'person' : 'company'

            set({ user: { ...data, userType }, isLoggedIn: true })
        } finally{
            set({userLoading: false})
        }
    }
}))