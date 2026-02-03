#!/usr/bin/env node

import 'dotenv/config'
import { LisApiClient, LIS_BASE_URL, LIVEHEALTH_BASE_URL } from '../src/api'

// Get integration token from .env (TOKEN or INTEGRATION_TOKEN), or command line argument
const integrationToken =
  process.env.INTEGRATION_TOKEN || process.env.TOKEN || process.argv[2]

if (!integrationToken) {
  console.error('Error: Integration token is required')
  console.error('Usage: Put TOKEN or INTEGRATION_TOKEN in .env, or:')
  console.error('   INTEGRATION_TOKEN=your-token npm run test:api')
  console.error('   npm run test:api your-token')
  process.exit(1)
}

// Test data - modify these as needed
const TEST_DATA = {
  contact: '+1234567890', // Replace with actual contact number
  labUserId: 'lab-user-id', // Replace with actual lab user ID
  billId: '156', // Testing with bill ID 156
}

async function testGetPatientByContact(client: LisApiClient) {
  console.log('\n📋 Testing getPatientByContact...')
  try {
    const response = await client.getPatientByContact(TEST_DATA.contact)
    console.log('✅ Success!')
    console.log('Response:', JSON.stringify(response, null, 2))
    return true
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
    return false
  }
}

async function testGetOrders(client: LisApiClient) {
  console.log('\n💰 Testing getOrders...')
  try {
    const response = await client.getOrders(TEST_DATA.labUserId, true)
    console.log('✅ Success!')
    console.log('Response:', JSON.stringify(response, null, 2))
    return true
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
    return false
  }
}

async function testGetReport(client: LisApiClient) {
  console.log('\n📄 Testing getReport...')
  try {
    const response = await client.getReport(TEST_DATA.billId)
    console.log('✅ Success!')
    console.log('Response:', JSON.stringify(response, null, 2))
    return true
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
    return false
  }
}

async function testGetAllTestsAndProfiles(client: LisApiClient) {
  console.log('\n🧪 Testing getAllTestsAndProfiles (test master)...')
  try {
    const response = await client.getAllTestsAndProfiles()
    console.log('✅ Success!')
    const res = response as { profileTestList?: unknown[]; tests?: unknown[]; profiles?: unknown[] }
    const arr = res?.profileTestList ?? res?.tests ?? res?.profiles ?? (Array.isArray(response) ? response : [])
    const count = Array.isArray(arr) ? arr.length : 0
    console.log(`  Items: ${count}`)
    if (count > 0) {
      const sample = arr[0]
      console.log('  Sample:', JSON.stringify(sample, null, 2))
    } else {
      console.log('  Full response:', JSON.stringify(response, null, 2).slice(0, 500) + '...')
    }
    return true
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
    return false
  }
}

async function runTests() {
  console.log('🧪 Starting API Tests')
  console.log('='.repeat(50))
  console.log(`Base URL: ${LIS_BASE_URL}`)
  console.log(`LiveHealth URL: ${LIVEHEALTH_BASE_URL}`)
  console.log(`Token: ${integrationToken.substring(0, 10)}...`)

  const client = new LisApiClient(
    integrationToken,
    {
      log: (msg, ...args) => console.log(`[LOG] ${msg}`, ...args),
      error: (msg, ...args) => console.error(`[ERROR] ${msg}`, ...args),
      warn: (msg, ...args) => console.warn(`[WARN] ${msg}`, ...args),
      debug: (msg, ...args) => console.debug(`[DEBUG] ${msg}`, ...args),
    }
  )

  const results = {
    getPatientByContact: await testGetPatientByContact(client),
    getOrders: await testGetOrders(client),
    getReport: await testGetReport(client),
    getAllTestsAndProfiles: await testGetAllTestsAndProfiles(client),
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Test Results:')
  console.log(`  getPatientByContact: ${results.getPatientByContact ? '✅' : '❌'}`)
  console.log(`  getOrders: ${results.getOrders ? '✅' : '❌'}`)
  console.log(`  getReport: ${results.getReport ? '✅' : '❌'}`)
  console.log(`  getAllTestsAndProfiles: ${results.getAllTestsAndProfiles ? '✅' : '❌'}`)

  const allPassed = Object.values(results).every((r) => r)
  process.exit(allPassed ? 0 : 1)
}

runTests().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
