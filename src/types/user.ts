export type UserRole = "Person" | "Company"

export interface BaseProfile {
  email: string
  phoneNumer: string
  isVerified: boolean
  isTwoFactorEnabled: boolean
  isOAuthOnly: boolean
  country?: string
  region?: string
  settlement?: string
  zipCode?: string
  mainPhotoUrl?: string
}

export interface PersonProfile extends BaseProfile {
  userRole: "Person"
  firstName: string
  lastName: string
}

export interface CompanyProfile extends BaseProfile {
  userRole: "Company"
  name: string
  registrationAdress?: string
  сompanyRegistrationNumber?: string
  estimatedAt?: string
  description?: string
}

export type UserProfile = PersonProfile | CompanyProfile