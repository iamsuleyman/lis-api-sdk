export interface SigningDoctor {
  'Signing Doctor 1': string | null
  'Signing Doctor 2': string | null
  'Signing Doctor 3': string | null
  'Signing Doctor 4': string | null
}

export interface ReportFormat {
  testName: string
  testUnit: string
  descriptionFlag: number
  lowerBoundMale: string
  upperBoundMale: string
  lowerBoundFemale: string
  upperBoundFemale: string
  otherMale: string
  otherFemale: string
  otherFlag: number
  isImage: number
  listField: number
  integrationCode: string
  method: string
  fileInput: number
  highlightFlag: number
  dictionaryId: number | null
  criticalLowerMale: string
  criticalUpperMale: string
  criticalLowerFemale: string
  criticalUpperFemale: string
  dictionaryTestUnit: string
  order: number
  emailFlag: number
  index: number
  linked_model: string
  id: number
}

export interface ReportFormatAndValue {
  highlight: number
  value: string
  reportFormat: ReportFormat
}

export interface ReportDetail {
  'Signing Doctor': SigningDoctor[]
  'Patient Name': string
  'Patient Id': number
  Gender: string
  Age: string
  'Patient dob': string
  'Contact No': string
  patientEmail: string
  patientAddress: string
  'Test Name': string
  testCode: string
  testID: number
  profileID: number | null
  sampleId: string
  accessionNo: string
  'sample Type': string
  'sample Name': string
  'Order Date': string
  'Sample Date': string
  'Report Date': string
  'Accession Date': string
  'Approval Date': string | null
  lastUpdated: string
  status: string
  billId: number
  labName: string
  labReportId: number
  'Report Id': number
  CentreReportId: number
  organisationName: string
  organisationId: number
  organizationAddress: string
  organizationPincode: string
  orderNumber: string
  billReferral: string
  integrationCode: string
  fileAttachments: string[]
  fileInputReport: number
  bill_attachment: string
  bill_attachment_form: string
  reportFormatAndValues?: ReportFormatAndValue[]
}

export interface ReportResponse {
  reportsData: string
  code: number
  reportDetails: ReportDetail[]
}
