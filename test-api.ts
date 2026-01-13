#!/usr/bin/env node

import { LisApiClient, LIS_BASE_URL } from './src/api'

// Get integration token from environment variable or command line argument
const integrationToken = process.env.INTEGRATION_TOKEN || process.argv[2]

if (!integrationToken) {
  console.error('Error: Integration token is required')
  console.error('Usage: INTEGRATION_TOKEN=your-token npm run test:api')
  console.error('   or: npm run test:api your-token')
  process.exit(1)
}

// Test data - modify these as needed
const TEST_DATA = {
  contact: '+1234567890', // Replace with actual contact number
  labUserId: 'lab-user-id', // Replace with actual lab user ID
  billId: 'bill-id', // Replace with actual bill ID
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

async function runTests() {
  console.log('🧪 Starting API Tests')
  console.log('='.repeat(50))
  console.log(`Base URL: ${LIS_BASE_URL}`)
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
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Test Results:')
  console.log(`  getPatientByContact: ${results.getPatientByContact ? '✅' : '❌'}`)
  console.log(`  getOrders: ${results.getOrders ? '✅' : '❌'}`)
  console.log(`  getReport: ${results.getReport ? '✅' : '❌'}`)

  const allPassed = Object.values(results).every((r) => r)
  process.exit(allPassed ? 0 : 1)
}

runTests().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
