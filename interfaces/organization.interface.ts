import { BinaryFlag } from './common-types.interface'

export interface Organization {
  orgId: number
  orgFullName: string
  orgContact: string
  orgAddress: string
  orgCity: string
  orgArea: string
  orgEmail: string
  orgType: string
  remark: string
  isCollectionCenter: BinaryFlag
  creditLimit: number
  currentDue: number
  countryCode: string
  paymentMode: string
  orgCode: string | null
  orgPaymentType: number
  pinCode: string
  stopPrepaidCreditBilling: BinaryFlag
  alternateContact: string
  notes: string
  restrictPaymentMode: boolean
  patient_contact_mandatory: boolean
  labForId: number
}
