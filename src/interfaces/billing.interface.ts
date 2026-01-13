import { BinaryFlag, PaymentMethod } from './common-types.interface'
import { Organization } from './organization.interface'
import { Doctor } from './doctor.interface'
import { LabUser } from './lab-user.interface'
import { UserDetails } from './user-details.interface'

export interface BillingInfo {
  id: number
  billForId_id: number
  testId_id: number
  testname: string
  testAmount: number
  testConsc: number
  outsourceId_id: number
  outsourceAmount: number
  referralId_id: number | null
  doctorAmount: number
  isTestofProfile: BinaryFlag
  testProfileId_id: number | null
  dismissed: BinaryFlag
  testQuantity: number
  docRevenueFlag: BinaryFlag
  revenueDispatchedTime: string | null
  orgAmount: number
  orgPaymentFlag: BinaryFlag
  testRefundFlag: BinaryFlag
  refundTime: string | null
  icdCodeId_id: number | null
  costOfTest: number
  co_pay_amount: number
  deductible_amount: number
  service_integration_id: string
}

export interface TestSampleIdDetails {
  manualSampleID: string
  test_id: number
  test_name: string
  test_code: string
}

export interface BillDetail {
  billing_info: BillingInfo[]
  test_sample_id_details: TestSampleIdDetails[]
  appointment: Record<string, unknown>
  home_collection: Record<string, unknown>
  Id: number
  orgId: Organization
  docId: Doctor
  labUserId: LabUser
  billService: string
  billTime: string
  billTotalAmount: number
  billAdvance: number
  billReferal: string
  billCompany: string
  billPaymentType: PaymentMethod
  billAdditionalCategory: string
  billAdditionalAmount: number
  labBillId: number
  billComments: string
  billConcession: number
  isRefund: BinaryFlag
  isTDSFlag: BinaryFlag
  TDSAmount: number
  isCancel: BinaryFlag
  isWriteOff: BinaryFlag
  isComplete: BinaryFlag
  lastUpdatedTime: string
  formUpload: string
  copaymentBillFlag: BinaryFlag
  patientPayableAmount: number
  billRemark: string
  onlinePaymentBillFlag: BinaryFlag
  appointmentBillFlag: BinaryFlag
  collectedSampleType: string
  outsourceBillFlag: BinaryFlag
  trfPrintDone: BinaryFlag
  offlineBillId: string
  billLocked: BinaryFlag
  pndtCustomForm: string
  collectingPerson: string
  patientType: string
  isBillTestRefund: BinaryFlag
  orderNumber: string
  billingAttachment: string
  practiceNo: string | null
  source: string
  goodxReferralDocId: string
  VisitLevelTags: string
  proposalNumber: string
  agentReferenceNumber: string
  agentName: string
  agentCode: string
  ward_number: string
  lmp_date: string | null
  vat: string
  co_pay_amount: number
  deductible_amount: number
  pre_auth_amount: number
  pre_auth_id: string | null
  vat_percent: number
  userForId: number
  userDetailsId: number
  labId: number
  branch: string | null
  cardUserRelationId: number | null
  invoiceId: number | null
  lastEditedBy: number | null
}

export interface TestReference {
  testId: number
  testName: string
  testCode: string
  sampleId: string
  amount: number
}

export interface BillingSummary {
  billId: number
  patientName: string
  totalAmount: number
  advancePaid: number
  pendingAmount: number
  billDate: string
  isComplete: boolean
  tests: TestReference[]
}

export interface BillingDetailsResponse {
  billing_details: BillDetail[]
  user_details: UserDetails
}
