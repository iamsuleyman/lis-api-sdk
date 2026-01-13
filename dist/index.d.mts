interface Profile {
    id: number;
    gender: string;
    email: string;
    lab_id: number;
    dob: string;
    fullname: string;
    address: string;
    contact: string;
}
interface LinkedProfile {
    id: number;
    fullname: string;
}
interface OTPVerificationResponse {
    message: string;
    username: string;
    fullName: string;
    defaultProfile: Profile;
    linkedProfiles: LinkedProfile[];
}
interface SendOtpResponse {
    message: string;
    retry_count: number;
    maskedEmail?: string;
    maskedContact?: string;
}

interface User {
    username: string;
    first_name: string;
    last_name: string;
    id: number;
    email: string;
}
interface PatientDetails {
    patientType: string;
    nationalIdentityNumber: string;
    debtorId: number | null;
    suffix: string;
    weight: string;
    allReferral: number[];
    optionCode: string;
    address: string;
    pincode: string;
    sex: string;
    appointmentFlag: number;
    labUser: number;
    labPatientId: string;
    wardNo: string;
    national_health_id: string;
    id: number;
    ethnicity: string;
    branch_id: number | null;
    insuranceNo: string;
    countryCode: string;
    area: string;
    middleName: string;
    allergies: string;
    labId: number;
    ssnNumber: string;
    sponsorship: string;
    dateOfBirth: string;
    alternateContact: string;
    race: string;
    firstName: string;
    lastOrganisation: number;
    fingerPrint1: string | null;
    ageInDays: number;
    totalAmount: number;
    breedId: number | null;
    email: string;
    areaOfResidence: string;
    diseases: string;
    city: string;
    labUserId: number;
    workerCode: string;
    medicalSchemeCode: string;
    speciesId: number | null;
    aadharNumber: string;
    landmark: string;
    isDependent: number;
    lastWardNumber: string;
    all_branches: any[];
    user: User;
    recurringFlag: number;
    passportNo: string;
    nationality: string;
    fullName: string;
    height: string;
    clinicalHistory: string;
    isReferral: number;
    allOrg: number[];
    lastUpdatedTime: string;
    designation: string;
    creditFlag: number;
    alternateEmail: string;
    lastName: string;
    age: string;
    panNumber: string;
    state: string;
    profilepic: string | null;
    whatsappConsent: number;
    contact: string;
    doctorCode: string;
    source: string;
    patientId_id: number;
    petName: string;
    advanceFlag: number;
    lastKnownBillDate: string;
    userRegistrationDate: string;
    fingerPrint2: string | null;
    lastReferral: number;
}
interface PatientResponse {
    code: number;
    Result: PatientDetails[];
}

type BinaryFlag = 0 | 1;
type PaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'CREDIT' | 'ONLINE';
type Gender = 'Male' | 'Female' | 'Other';

interface Organization {
    orgId: number;
    orgFullName: string;
    orgContact: string;
    orgAddress: string;
    orgCity: string;
    orgArea: string;
    orgEmail: string;
    orgType: string;
    remark: string;
    isCollectionCenter: BinaryFlag;
    creditLimit: number;
    currentDue: number;
    countryCode: string;
    paymentMode: string;
    orgCode: string | null;
    orgPaymentType: number;
    pinCode: string;
    stopPrepaidCreditBilling: BinaryFlag;
    alternateContact: string;
    notes: string;
    restrictPaymentMode: boolean;
    patient_contact_mandatory: boolean;
    labForId: number;
}

interface Doctor {
    docId: number;
    docFullName: string;
    docSignature: string;
    docContact: string;
    docEmail: string;
    docSpeciality: string;
}

interface LabUser {
    labUserId: number;
    name: string;
}

interface UserDetails {
    id: number;
    fullName: string;
    sex: Gender;
    age: string;
    totalAmount: number;
    labUserId: number;
    designation: string;
    userRegistrationDate: string;
    isReferral: BinaryFlag;
    area: string;
    city: string;
    user: number;
    creditFlag: BinaryFlag;
    patientType: string;
    patientId_id: number;
    labPatientId: string;
    email: string;
    dateOfBirth: string;
    pincode: string;
    height: string;
    weight: string;
    address: string;
    nationalIdentityNumber: string;
    contact: string;
    alternateContact: string;
    passportNo: string;
    nationality: string;
    optionCode: string;
    state: string;
    wardNo: string;
    areaOfResidence: string;
    insuranceNo: string;
    medicalSchemeCode: string;
    suffix: string;
}

interface BillingInfo {
    id: number;
    billForId_id: number;
    testId_id: number;
    testname: string;
    testAmount: number;
    testConsc: number;
    outsourceId_id: number;
    outsourceAmount: number;
    referralId_id: number | null;
    doctorAmount: number;
    isTestofProfile: BinaryFlag;
    testProfileId_id: number | null;
    dismissed: BinaryFlag;
    testQuantity: number;
    docRevenueFlag: BinaryFlag;
    revenueDispatchedTime: string | null;
    orgAmount: number;
    orgPaymentFlag: BinaryFlag;
    testRefundFlag: BinaryFlag;
    refundTime: string | null;
    icdCodeId_id: number | null;
    costOfTest: number;
    co_pay_amount: number;
    deductible_amount: number;
    service_integration_id: string;
}
interface TestSampleIdDetails {
    manualSampleID: string;
    test_id: number;
    test_name: string;
    test_code: string;
}
interface BillDetail {
    billing_info: BillingInfo[];
    test_sample_id_details: TestSampleIdDetails[];
    appointment: Record<string, unknown>;
    home_collection: Record<string, unknown>;
    Id: number;
    orgId: Organization;
    docId: Doctor;
    labUserId: LabUser;
    billService: string;
    billTime: string;
    billTotalAmount: number;
    billAdvance: number;
    billReferal: string;
    billCompany: string;
    billPaymentType: PaymentMethod;
    billAdditionalCategory: string;
    billAdditionalAmount: number;
    labBillId: number;
    billComments: string;
    billConcession: number;
    isRefund: BinaryFlag;
    isTDSFlag: BinaryFlag;
    TDSAmount: number;
    isCancel: BinaryFlag;
    isWriteOff: BinaryFlag;
    isComplete: BinaryFlag;
    lastUpdatedTime: string;
    formUpload: string;
    copaymentBillFlag: BinaryFlag;
    patientPayableAmount: number;
    billRemark: string;
    onlinePaymentBillFlag: BinaryFlag;
    appointmentBillFlag: BinaryFlag;
    collectedSampleType: string;
    outsourceBillFlag: BinaryFlag;
    trfPrintDone: BinaryFlag;
    offlineBillId: string;
    billLocked: BinaryFlag;
    pndtCustomForm: string;
    collectingPerson: string;
    patientType: string;
    isBillTestRefund: BinaryFlag;
    orderNumber: string;
    billingAttachment: string;
    practiceNo: string | null;
    source: string;
    goodxReferralDocId: string;
    VisitLevelTags: string;
    proposalNumber: string;
    agentReferenceNumber: string;
    agentName: string;
    agentCode: string;
    ward_number: string;
    lmp_date: string | null;
    vat: string;
    co_pay_amount: number;
    deductible_amount: number;
    pre_auth_amount: number;
    pre_auth_id: string | null;
    vat_percent: number;
    userForId: number;
    userDetailsId: number;
    labId: number;
    branch: string | null;
    cardUserRelationId: number | null;
    invoiceId: number | null;
    lastEditedBy: number | null;
}
interface TestReference {
    testId: number;
    testName: string;
    testCode: string;
    sampleId: string;
    amount: number;
}
interface BillingSummary {
    billId: number;
    patientName: string;
    totalAmount: number;
    advancePaid: number;
    pendingAmount: number;
    billDate: string;
    isComplete: boolean;
    tests: TestReference[];
}
interface BillingDetailsResponse {
    billing_details: BillDetail[];
    user_details: UserDetails;
}

interface SigningDoctor {
    'Signing Doctor 1': string | null;
    'Signing Doctor 2': string | null;
    'Signing Doctor 3': string | null;
    'Signing Doctor 4': string | null;
}
interface ReportFormat {
    testName: string;
    testUnit: string;
    descriptionFlag: number;
    lowerBoundMale: string;
    upperBoundMale: string;
    lowerBoundFemale: string;
    upperBoundFemale: string;
    otherMale: string;
    otherFemale: string;
    otherFlag: number;
    isImage: number;
    listField: number;
    integrationCode: string;
    method: string;
    fileInput: number;
    highlightFlag: number;
    dictionaryId: number | null;
    criticalLowerMale: string;
    criticalUpperMale: string;
    criticalLowerFemale: string;
    criticalUpperFemale: string;
    dictionaryTestUnit: string;
    order: number;
    emailFlag: number;
    index: number;
    linked_model: string;
    id: number;
}
interface ReportFormatAndValue {
    highlight: number;
    value: string;
    reportFormat: ReportFormat;
}
interface ReportDetail {
    'Signing Doctor': SigningDoctor[];
    'Patient Name': string;
    'Patient Id': number;
    Gender: string;
    Age: string;
    'Patient dob': string;
    'Contact No': string;
    patientEmail: string;
    patientAddress: string;
    'Test Name': string;
    testCode: string;
    testID: number;
    profileID: number | null;
    sampleId: string;
    accessionNo: string;
    'sample Type': string;
    'sample Name': string;
    'Order Date': string;
    'Sample Date': string;
    'Report Date': string;
    'Accession Date': string;
    'Approval Date': string | null;
    lastUpdated: string;
    status: string;
    billId: number;
    labName: string;
    labReportId: number;
    'Report Id': number;
    CentreReportId: number;
    organisationName: string;
    organisationId: number;
    organizationAddress: string;
    organizationPincode: string;
    orderNumber: string;
    billReferral: string;
    integrationCode: string;
    fileAttachments: string[];
    fileInputReport: number;
    bill_attachment: string;
    bill_attachment_form: string;
    reportFormatAndValues?: ReportFormatAndValue[];
}
interface ReportResponse {
    reportsData: string;
    code: number;
    reportDetails: ReportDetail[];
}

declare const LIS_BASE_URL = "https://crelio.solutions";
interface Logger {
    log(message: string, ...optionalParams: any[]): void;
    error(message: string, ...optionalParams: any[]): void;
    warn(message: string, ...optionalParams: any[]): void;
    debug(message: string, ...optionalParams: any[]): void;
}
declare class LisApiClient {
    readonly logger?: Logger;
    readonly baseUrl: string;
    private readonly integrationToken;
    constructor(integrationToken: string, logger?: Logger);
    private request;
    private buildUrl;
    /**
     * Get Patient Details by Contact Number
     * Retrieves all patient details (both direct and indirect) registered under a contact number
     */
    getPatientByContact(contact: string): Promise<PatientResponse>;
    getOrders(labUserId: string, iscomplete?: boolean): Promise<BillingDetailsResponse>;
    /**
     * Get Report by Bill ID
     * Fetches report details using the Lab Bill ID
     */
    getReport(billId: string): Promise<ReportResponse>;
}

declare const LIS_PATIENT_BASE_URL = "https://patient-in.creliohealth.com";
declare class LisOTPApiClient {
    private readonly patientBaseUrl;
    readonly logger?: Logger;
    constructor(logger?: Logger);
    private request;
    /**
     * Send OTP to patient
     * Sends an OTP to the patient's phone number or email address
     * @param identifier - Phone number or email address
     * @param type - 'phone' or 'email'
     * @param country_code - Country code (required when type is 'phone')
     */
    sendOtp(identifier: string, type: 'phone' | 'email', country_code?: string): Promise<SendOtpResponse>;
    /**
     * Verify OTP
     * Verifies the OTP sent to the patient's phone number or email address
     * @param identifier - Phone number or email address
     * @param type - 'phone' or 'email'
     * @param otp - The OTP code to verify
     */
    verifyOtp(identifier: string, type: 'phone' | 'email', otp: string): Promise<OTPVerificationResponse>;
}

export { type BillDetail, type BillingDetailsResponse, type BillingInfo, type BillingSummary, type BinaryFlag, type Doctor, type Gender, LIS_BASE_URL, LIS_PATIENT_BASE_URL, type LabUser, type LinkedProfile, LisApiClient, LisOTPApiClient, type Logger, type OTPVerificationResponse, type Organization, type PatientDetails, type PatientResponse, type PaymentMethod, type Profile, type ReportDetail, type ReportFormat, type ReportFormatAndValue, type ReportResponse, type SendOtpResponse, type SigningDoctor, type TestReference, type TestSampleIdDetails, type UserDetails };
