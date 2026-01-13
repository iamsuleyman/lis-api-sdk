# LIS API SDK

TypeScript SDK for integrating with the LIS API. Framework-agnostic client for healthcare and laboratory management APIs.

## Installation
1.
```bash
npm install lis-api-sdk
# or: yarn add lis-api-sdk | pnpm add lis-api-sdk
```

**Requirements:** Node.js >= 20.0.0

## Quick Start

```typescript
import { LisApiClient, LisOTPApiClient } from 'lis-api-sdk'

const client = new LisApiClient('your-integration-token')
const otpApiClient = new LisOTPApiClient()

// Usage
const patient = await client.getPatientByContact('+1234567890')
const orders = await client.getOrders('lab-user-id', true)
const report = await client.getReport('bill-id')
const otpResponse = await otpApiClient.sendOtp('1234567890', 'phone', '+91')
const verification = await otpApiClient.verifyOtp('1234567890', 'phone', '123456')
```

## With Custom Logger

```typescript
import { LisApiClient, LisOTPApiClient, Logger } from 'lis-api-sdk'

const logger: Logger = {
  log: (msg, ...args) => console.log(msg, ...args),
  error: (msg, ...args) => console.error(msg, ...args),
  warn: (msg, ...args) => console.warn(msg, ...args),
  debug: (msg, ...args) => console.debug(msg, ...args),
}

const client = new LisApiClient('token', logger)
const otpApiClient = new LisOTPApiClient(logger)
```

## API Methods

### Main API

- **`getPatientByContact(contact: string): Promise<PatientResponse>`** - Get patient details by contact number
- **`getOrders(labUserId: string, iscomplete?: boolean): Promise<BillingDetailsResponse>`** - Get orders/billing details
- **`getReport(billId: string): Promise<ReportResponse>`** - Get report by bill ID

### OTP API

- **`sendOtp(identifier: string, type: 'phone' | 'email', country_code?: string): Promise<SendOtpResponse>`** - Send OTP
- **`verifyOtp(identifier: string, type: 'phone' | 'email', otp: string): Promise<OTPVerificationResponse>`** - Verify OTP

## TypeScript Support

All types are exported:

```typescript
import type {
  PatientResponse, BillingDetailsResponse, ReportResponse,
  SendOtpResponse, OTPVerificationResponse,
  PatientDetails, BillDetail, ReportDetail
} from 'lis-api-sdk'
```

## License

ISC
