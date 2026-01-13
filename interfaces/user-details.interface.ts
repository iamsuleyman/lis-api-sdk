import { BinaryFlag, Gender } from './common-types.interface'

export interface UserDetails {
  id: number
  fullName: string
  sex: Gender
  age: string
  totalAmount: number
  labUserId: number
  designation: string
  userRegistrationDate: string
  isReferral: BinaryFlag
  area: string
  city: string
  user: number
  creditFlag: BinaryFlag
  patientType: string
  patientId_id: number
  labPatientId: string
  email: string
  dateOfBirth: string
  pincode: string
  height: string
  weight: string
  address: string
  nationalIdentityNumber: string
  contact: string
  alternateContact: string
  passportNo: string
  nationality: string
  optionCode: string
  state: string
  wardNo: string
  areaOfResidence: string
  insuranceNo: string
  medicalSchemeCode: string
  suffix: string
}
