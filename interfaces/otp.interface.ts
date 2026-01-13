export interface Profile {
  id: number
  gender: string
  email: string
  lab_id: number
  dob: string // Consider using Date type if you'll parse this
  fullname: string
  address: string
  contact: string
}

export interface LinkedProfile {
  id: number
  fullname: string
}

export interface OTPVerificationResponse {
  message: string
  username: string
  fullName: string
  defaultProfile: Profile
  linkedProfiles: LinkedProfile[]
}

export interface SendOtpResponse {
  message: string
  retry_count: number
  maskedEmail?: string
  maskedContact?: string
}
