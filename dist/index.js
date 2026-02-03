"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LIS_BASE_URL: () => LIS_BASE_URL,
  LIS_PATIENT_BASE_URL: () => LIS_PATIENT_BASE_URL,
  LIVEHEALTH_BASE_URL: () => LIVEHEALTH_BASE_URL,
  LisApiClient: () => LisApiClient,
  LisOTPApiClient: () => LisOTPApiClient
});
module.exports = __toCommonJS(index_exports);

// src/api.ts
var LIS_BASE_URL = "https://crelio.solutions";
var LIVEHEALTH_BASE_URL = "https://livehealth.solutions";
var LisApiClient = class {
  logger;
  baseUrl;
  integrationToken;
  constructor(integrationToken, logger) {
    this.baseUrl = LIS_BASE_URL.replace(/\/$/, "");
    this.integrationToken = integrationToken;
    this.logger = logger;
  }
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.logger?.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }
  buildUrl(endpoint, params) {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }
  /**
   * Get Patient Details by Contact Number
   * Retrieves all patient details (both direct and indirect) registered under a contact number
   */
  async getPatientByContact(contact) {
    const url = this.buildUrl("/getPatientDetailsByContactNumberAPI/", {
      token: this.integrationToken,
      contact
    });
    return this.request(url);
  }
  async getOrders(labUserId, iscomplete) {
    const params = {
      lab_user_id: labUserId
    };
    if (iscomplete !== void 0) {
      params.iscomplete = iscomplete;
    }
    const url = this.buildUrl("/api-v3/integration/patient/bill-details/", params);
    return this.request(url, {
      headers: {
        "x-Integration-token": this.integrationToken
      }
    });
  }
  /**
   * Get Report by Bill ID
   * Fetches report details using the Lab Bill ID
   */
  async getReport(billId) {
    const url = this.buildUrl("/getOrderStatusAPI/", {
      token: this.integrationToken,
      billId
    });
    return this.request(url);
  }
  /**
   * Get all tests and profiles (test master).
   * Returns test price, name, test code, category, unique ID and description.
   * Use test id or test code when creating orders (e.g. LHREGISTER).
   * API: GET https://livehealth.solutions/getAllTestsAndProfiles/?token=<Token>
   * Status codes: 200 Success, 401 Wrong request type, 404 Invalid token/Bad request
   */
  async getAllTestsAndProfiles() {
    const base = LIVEHEALTH_BASE_URL.replace(/\/$/, "");
    const url = `${base}/getAllTestsAndProfiles/?token=${encodeURIComponent(this.integrationToken)}`;
    return this.request(url);
  }
};

// src/otp.ts
var LIS_PATIENT_BASE_URL = "https://patient-in.creliohealth.com";
var OTP_ENDPOINTS = {
  SEND_OTP: "/api-v3/mobile/patient/login",
  VERIFY_OTP: "/api-v3/mobile/patient/verify-otp"
};
var DEFAULT_HEADERS = {
  Cookie: "DEPLOYMENT_MODE=prod; DEPLOYMENT_ZONE=IN"
};
var LisOTPApiClient = class {
  patientBaseUrl;
  logger;
  constructor(logger) {
    this.patientBaseUrl = LIS_PATIENT_BASE_URL.replace(/\/$/, "");
    this.logger = logger;
  }
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      });
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorBody = await response.text();
          if (errorBody) {
            try {
              const errorJson = JSON.parse(errorBody);
              errorMessage += ` - ${JSON.stringify(errorJson)}`;
            } catch {
              errorMessage += ` - ${errorBody}`;
            }
          }
        } catch {
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }
      return await response.json();
    } catch (error) {
      this.logger?.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }
  /**
   * Send OTP to patient
   * Sends an OTP to the patient's phone number or email address
   * @param identifier - Phone number or email address
   * @param type - 'phone' or 'email'
   * @param country_code - Country code (required when type is 'phone')
   */
  async sendOtp(identifier, type, country_code) {
    const url = `${this.patientBaseUrl}${OTP_ENDPOINTS.SEND_OTP}`;
    const payload = type === "phone" ? {
      contact: identifier,
      country_code
    } : { email: identifier };
    this.logger?.log(`Sending OTP request to: ${url}`);
    this.logger?.debug(`OTP payload: ${JSON.stringify(payload)}`);
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: DEFAULT_HEADERS
    });
  }
  /**
   * Verify OTP
   * Verifies the OTP sent to the patient's phone number or email address
   * @param identifier - Phone number or email address
   * @param type - 'phone' or 'email'
   * @param otp - The OTP code to verify
   */
  async verifyOtp(identifier, type, otp) {
    const url = `${this.patientBaseUrl}${OTP_ENDPOINTS.VERIFY_OTP}`;
    const payload = {
      otp,
      [type === "phone" ? "contact" : "email"]: identifier
    };
    this.logger?.log(
      `Verifying OTP with LIS API. Payload: ${JSON.stringify(payload)}`
    );
    this.logger?.debug(`Full request URL: ${url}`);
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: DEFAULT_HEADERS
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LIS_BASE_URL,
  LIS_PATIENT_BASE_URL,
  LIVEHEALTH_BASE_URL,
  LisApiClient,
  LisOTPApiClient
});
