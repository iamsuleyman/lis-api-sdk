#!/usr/bin/env node

import { LisOTPApiClient, LIS_PATIENT_BASE_URL } from '../src/otp'

// Get test data from environment variables or command line arguments
// Usage examples:
//   npm run test:otp -- --phone +1234567890 --country-code +1
//   npm run test:otp -- --email test@example.com
//   OTP_CODE=123456 npm run test:otp -- --phone +1234567890 --country-code +1 --verify

interface TestConfig {
  type: 'phone' | 'email'
  identifier: string
  countryCode?: string
  otpCode?: string
  verifyOnly?: boolean
  sendOnly?: boolean
}

function parseArgs(): TestConfig {
  const args = process.argv.slice(2)
  const config: Partial<TestConfig> = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--phone':
        config.type = 'phone'
        config.identifier = args[++i]
        break
      case '--email':
        config.type = 'email'
        config.identifier = args[++i]
        break
      case '--country-code':
        config.countryCode = args[++i]
        break
      case '--otp':
        config.otpCode = args[++i]
        break
      case '--verify-only':
        config.verifyOnly = true
        break
      case '--send-only':
        config.sendOnly = true
        break
    }
  }

  // Fallback to environment variables
  if (!config.type) {
    if (process.env.TEST_PHONE) {
      config.type = 'phone'
      config.identifier = process.env.TEST_PHONE
      config.countryCode = process.env.TEST_COUNTRY_CODE || '+91'
    } else if (process.env.TEST_EMAIL) {
      config.type = 'email'
      config.identifier = process.env.TEST_EMAIL
    }
  }

  if (!config.otpCode) {
    config.otpCode = process.env.OTP_CODE
  }

  return config as TestConfig
}

function printUsage() {
  console.error('Usage:')
  console.error('  npm run test:otp -- --phone <number> --country-code <code> [--otp <code>] [--verify-only] [--send-only]')
  console.error('  npm run test:otp -- --email <email> [--otp <code>] [--verify-only] [--send-only]')
  console.error('')
  console.error('Environment variables:')
  console.error('  TEST_PHONE=<number> TEST_COUNTRY_CODE=<code> npm run test:otp')
  console.error('  TEST_EMAIL=<email> npm run test:otp')
  console.error('  OTP_CODE=<code> npm run test:otp -- --phone <number> --country-code <code>')
  console.error('')
  console.error('Examples:')
  console.error('  npm run test:otp -- --phone +1234567890 --country-code +1')
  console.error('  npm run test:otp -- --email test@example.com')
  console.error('  npm run test:otp -- --phone +1234567890 --country-code +1 --otp 123456')
  console.error('  npm run test:otp -- --phone +1234567890 --country-code +1 --verify-only --otp 123456')
}

async function testSendOtp(client: LisOTPApiClient, config: TestConfig) {
  console.log('\n📤 Testing sendOtp...')
  console.log(`   Type: ${config.type}`)
  console.log(`   Identifier: ${config.identifier}`)
  if (config.type === 'phone' && config.countryCode) {
    console.log(`   Country Code: ${config.countryCode}`)
  }

  try {
    const response = await client.sendOtp(
      config.identifier,
      config.type,
      config.countryCode,
    )

    console.log('✅ OTP sent successfully!')
    console.log('Response:', JSON.stringify(response, null, 2))

    if (response.maskedEmail) {
      console.log(`   Masked Email: ${response.maskedEmail}`)
    }
    if (response.maskedContact) {
      console.log(`   Masked Contact: ${response.maskedContact}`)
    }
    console.log(`   Retry Count: ${response.retry_count}`)
    console.log(`   Message: ${response.message}`)

    return { success: true, response }
  } catch (error) {
    console.error('❌ Failed to send OTP')
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`)
      if (error.stack) {
        console.error(`   Stack: ${error.stack}`)
      }
    } else {
      console.error('   Error:', error)
    }
    return { success: false, error }
  }
}

async function testVerifyOtp(
  client: LisOTPApiClient,
  config: TestConfig,
) {
  console.log('\n🔐 Testing verifyOtp...')
  console.log(`   Type: ${config.type}`)
  console.log(`   Identifier: ${config.identifier}`)
  console.log(`   OTP Code: ${config.otpCode}`)

  if (!config.otpCode) {
    console.error('❌ OTP code is required for verification')
    console.error('   Provide it via --otp flag or OTP_CODE environment variable')
    return { success: false, error: 'OTP code missing' }
  }

  try {
    const response = await client.verifyOtp(
      config.identifier,
      config.type,
      config.otpCode,
    )

    console.log('✅ OTP verified successfully!')
    console.log('Response:', JSON.stringify(response, null, 2))

    console.log(`   Username: ${response.username}`)
    console.log(`   Full Name: ${response.fullName}`)
    console.log(`   Default Profile ID: ${response.defaultProfile.id}`)
    console.log(`   Linked Profiles: ${response.linkedProfiles.length}`)

    if (response.linkedProfiles.length > 0) {
      console.log('   Linked Profiles:')
      response.linkedProfiles.forEach((profile) => {
        console.log(`     - ${profile.fullname} (ID: ${profile.id})`)
      })
    }

    return { success: true, response }
  } catch (error) {
    console.error('❌ Failed to verify OTP')
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`)
      if (error.stack) {
        console.error(`   Stack: ${error.stack}`)
      }
    } else {
      console.error('   Error:', error)
    }
    return { success: false, error }
  }
}

async function runTests() {
  console.log('🧪 Starting OTP API Tests')
  console.log('='.repeat(60))
  console.log(`Base URL: ${LIS_PATIENT_BASE_URL}`)

  const config = parseArgs()

  // Validate configuration
  if (!config.type || !config.identifier) {
    console.error('❌ Error: Missing required parameters')
    printUsage()
    process.exit(1)
  }

  if (config.type === 'phone' && !config.countryCode) {
    console.error('❌ Error: Country code is required for phone type')
    printUsage()
    process.exit(1)
  }

  const client = new LisOTPApiClient({
    log: (msg, ...args) => console.log(`[LOG] ${msg}`, ...args),
    error: (msg, ...args) => console.error(`[ERROR] ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`[WARN] ${msg}`, ...args),
    debug: (msg, ...args) => console.debug(`[DEBUG] ${msg}`, ...args),
  })

  const results: {
    sendOtp?: { success: boolean; response?: any; error?: any }
    verifyOtp?: { success: boolean; response?: any; error?: any }
  } = {}

  // Send OTP (unless verify-only mode)
  if (!config.verifyOnly) {
    results.sendOtp = await testSendOtp(client, config)
  }

  // Verify OTP (unless send-only mode)
  if (!config.sendOnly) {
    // If we just sent OTP, wait a bit and prompt for OTP code if not provided
    if (!config.verifyOnly && !config.otpCode) {
      console.log('\n⏳ Waiting for OTP code...')
      console.log('   Please check your phone/email and provide the OTP code')
      console.log('   You can run the verification separately with:')
      console.log(
        `   npm run test:otp -- --${config.type} ${config.identifier} ${config.type === 'phone' ? `--country-code ${config.countryCode}` : ''} --verify-only --otp <code>`,
      )
      console.log('   Or set OTP_CODE environment variable and run again')
    } else {
      results.verifyOtp = await testVerifyOtp(client, config)
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Test Results Summary:')
  if (results.sendOtp !== undefined) {
    console.log(
      `  sendOtp: ${results.sendOtp.success ? '✅' : '❌'}`,
    )
  }
  if (results.verifyOtp !== undefined) {
    console.log(
      `  verifyOtp: ${results.verifyOtp.success ? '✅' : '❌'}`,
    )
  }

  const allPassed = Object.values(results).every(
    (r) => r?.success !== false,
  )
  process.exit(allPassed ? 0 : 1)
}

runTests().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
