import {
  SendOtpResponse,
  OTPVerificationResponse,
} from './interfaces'
import type { Logger } from './api'

export const LIS_PATIENT_BASE_URL = 'https://patient-in.creliohealth.com'

const OTP_ENDPOINTS = {
  SEND_OTP: '/api-v3/mobile/patient/login',
  VERIFY_OTP: '/api-v3/mobile/patient/verify-otp',
} as const

const DEFAULT_HEADERS = {
  Cookie: 'DEPLOYMENT_MODE=prod; DEPLOYMENT_ZONE=IN',
} as const

export class LisOTPApiClient {
  private readonly patientBaseUrl: string
  public readonly logger?: Logger

  constructor(logger?: Logger) {
    this.patientBaseUrl = LIS_PATIENT_BASE_URL.replace(/\/$/, '') // Remove trailing slash
    this.logger = logger
  }

  private async request<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        // Try to get error details from response body
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorBody = await response.text()
          if (errorBody) {
            try {
              const errorJson = JSON.parse(errorBody)
              errorMessage += ` - ${JSON.stringify(errorJson)}`
            } catch {
              errorMessage += ` - ${errorBody}`
            }
          }
        } catch {
          // If we can't read the error body, just use the status
        }
        const error = new Error(errorMessage)
        ;(error as any).status = response.status
        ;(error as any).statusText = response.statusText
        throw error
      }

      return await response.json()
    } catch (error) {
      this.logger?.error(`Error fetching ${url}:`, error)
      throw error
    }
  }

  /**
   * Send OTP to patient
   * Sends an OTP to the patient's phone number or email address
   * @param identifier - Phone number or email address
   * @param type - 'phone' or 'email'
   * @param country_code - Country code (required when type is 'phone')
   */
  async sendOtp(
    identifier: string,
    type: 'phone' | 'email',
    country_code?: string,
  ): Promise<SendOtpResponse> {
    const url = `${this.patientBaseUrl}${OTP_ENDPOINTS.SEND_OTP}`

    const payload =
      type === 'phone'
        ? {
            contact: identifier,
            country_code: country_code,
          }
        : { email: identifier }

    this.logger?.log(`Sending OTP request to: ${url}`)
    this.logger?.debug(`OTP payload: ${JSON.stringify(payload)}`)

    return this.request<SendOtpResponse>(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: DEFAULT_HEADERS,
    })
  }

  /**
   * Verify OTP
   * Verifies the OTP sent to the patient's phone number or email address
   * @param identifier - Phone number or email address
   * @param type - 'phone' or 'email'
   * @param otp - The OTP code to verify
   */
  async verifyOtp(
    identifier: string,
    type: 'phone' | 'email',
    otp: string,
  ): Promise<OTPVerificationResponse> {
    const url = `${this.patientBaseUrl}${OTP_ENDPOINTS.VERIFY_OTP}`

    const payload = {
      otp,
      [type === 'phone' ? 'contact' : 'email']: identifier,
    }

    this.logger?.log(
      `Verifying OTP with LIS API. Payload: ${JSON.stringify(payload)}`,
    )
    this.logger?.debug(`Full request URL: ${url}`)

    return this.request<OTPVerificationResponse>(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: DEFAULT_HEADERS,
    })
  }
}
