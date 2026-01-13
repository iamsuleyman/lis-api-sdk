interface User {
  username: string
  first_name: string
  last_name: string
  id: number
  email: string
}

export interface PatientDetails {
  patientType: string
  nationalIdentityNumber: string
  debtorId: number | null
  suffix: string
  weight: string
  allReferral: number[]
  optionCode: string
  address: string
  pincode: string
  sex: string
  appointmentFlag: number
  labUser: number
  labPatientId: string
  wardNo: string
  national_health_id: string
  id: number
  ethnicity: string
  branch_id: number | null
  insuranceNo: string
  countryCode: string
  area: string
  middleName: string
  allergies: string
  labId: number
  ssnNumber: string
  sponsorship: string
  dateOfBirth: string // Consider Date type
  alternateContact: string
  race: string
  firstName: string
  lastOrganisation: number
  fingerPrint1: string | null
  ageInDays: number
  totalAmount: number
  breedId: number | null
  email: string
  areaOfResidence: string
  diseases: string
  city: string
  labUserId: number
  workerCode: string
  medicalSchemeCode: string
  speciesId: number | null
  aadharNumber: string
  landmark: string
  isDependent: number
  lastWardNumber: string
  all_branches: any[] // Specify type if structure is known
  user: User
  recurringFlag: number
  passportNo: string
  nationality: string
  fullName: string
  height: string
  clinicalHistory: string
  isReferral: number
  allOrg: number[]
  lastUpdatedTime: string // Consider Date type
  designation: string
  creditFlag: number
  alternateEmail: string
  lastName: string
  age: string
  panNumber: string
  state: string
  profilepic: string | null
  whatsappConsent: number
  contact: string
  doctorCode: string
  source: string
  patientId_id: number
  petName: string
  advanceFlag: number
  lastKnownBillDate: string // Consider Date type
  userRegistrationDate: string // Consider Date type
  fingerPrint2: string | null
  lastReferral: number
}

export interface PatientResponse {
  code: number
  Result: PatientDetails[]
}
