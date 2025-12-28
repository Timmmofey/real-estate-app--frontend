export interface UserCommonDto {
  email: string;
  phoneNumber: string;
  mainPhoto?: FileList; 
}

export interface AddressDto {
  country?: string | null;
  region?: string | null;
  settlement?: string | null;
  zipCode?: string | null;
}

export interface PersonProfileDto {
  firstName: string;
  lastName: string;
  address: AddressDto;
}

export interface CreatePersonUserDto {
  common: UserCommonDto;
  password: string;
  profile: PersonProfileDto;
}

export interface CompanyProfileDto {
  name: string;
  address: AddressDto;
  registrationAdress: string;
  companyRegistrationNumber: string;
  estimatedAt: string; 
  description?: string | null;
}

export interface CreateCompanyUserDto {
  common: UserCommonDto;
  password: string;
  profile: CompanyProfileDto;
}

export interface CreatePersonUserOAuthDto {
  common: UserCommonDto;
  password?: string | null;
  profile: PersonProfileDto;
}

export interface CreateCompanyUserOAuthDto {
  common: UserCommonDto;
  password?: string | null;
  profile: CompanyProfileDto;
}