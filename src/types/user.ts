export type UserType = "person" | "company"

export interface BaseProfile {
  email: string,
  phoneNumer: string,
  isVerified: boolean
  country?: string
  region?: string
  settlement?: string
  zipCode?: string
  mainPhotoUrl?: string
}

export interface PersonProfile extends BaseProfile {
  userType: "person"
  firstName: string
  lastName: string
}

export interface CompanyProfile extends BaseProfile {
  userType: "company"
  name: string
  registrationAdress?: string
  сompanyRegistrationNumber?: string
  estimatedAt?: string
  description?: string
}

export type UserProfile = PersonProfile | CompanyProfile