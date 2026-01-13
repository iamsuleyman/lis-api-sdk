import {
  BillingDetailsResponse,
  PatientResponse,
  ReportResponse,
} from './interfaces'

export const LIS_BASE_URL = 'https://crelio.solutions'

export interface Logger {
  log(message: string, ...optionalParams: any[]): void
  error(message: string, ...optionalParams: any[]): void
  warn(message: string, ...optionalParams: any[]): void
  debug(message: string, ...optionalParams: any[]): void
}

export class LisApiClient {
  public readonly logger?: Logger
  public readonly baseUrl: string
  private readonly integrationToken: string

  constructor(
    integrationToken: string,
    logger?: Logger,
  ) {
    this.baseUrl = LIS_BASE_URL.replace(/\/$/, '') // Remove trailing slash
    this.integrationToken = integrationToken
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
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      this.logger?.error(`Error fetching ${url}:`, error)
      throw error
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    return url.toString()
  }

  /**
   * Get Patient Details by Contact Number
   * Retrieves all patient details (both direct and indirect) registered under a contact number
   */
  async getPatientByContact(contact: string): Promise<PatientResponse> {
    const url = this.buildUrl('/getPatientDetailsByContactNumberAPI/', {
      token: this.integrationToken,
      contact,
    })

    return this.request<PatientResponse>(url)
  }

  async getBillDetails(
    labUserId: string,
    iscomplete?: boolean,
  ): Promise<BillingDetailsResponse> {
    const params: Record<string, any> = {
      lab_user_id: labUserId,
    }
    if (iscomplete !== undefined) {
      params.iscomplete = iscomplete
    }

    const url = this.buildUrl('/api-v3/integration/patient/bill-details/', params)

    return this.request<BillingDetailsResponse>(url, {
      headers: {
        'x-Integration-token': this.integrationToken,
      },
    })
  }

  /**
   * Get Report by Bill ID
   * Fetches report details using the Lab Bill ID
   */
  async getReport(billId: string): Promise<ReportResponse> {
    const url = this.buildUrl('/getOrderStatusAPI/', {
      token: this.integrationToken,
      billId,
    })

    return this.request<ReportResponse>(url)
  }
}
