#!/usr/bin/env node
/**
 * Single real request: fetch test master from LiveHealth (getAllTestsAndProfiles).
 * Token from .env: TOKEN or INTEGRATION_TOKEN.
 * Run: npx tsx request-tests.ts
 */
import 'dotenv/config'
import { LisApiClient } from '../src/api'

const token = process.env.INTEGRATION_TOKEN || process.env.TOKEN || process.argv[2]
if (!token) {
  console.error('Set TOKEN or INTEGRATION_TOKEN in .env or pass as argument')
  process.exit(1)
}

async function main() {
  const client = new LisApiClient(token)
  const data = await client.getAllTestsAndProfiles()
  const list = data.profileTestList ?? []
  console.log('getAllTestsAndProfiles response:')
  console.log('  profileTestList length:', list.length)
  if (list.length) {
    const first = list[0] as Record<string, unknown>
    console.log('  first profile keys:', Object.keys(first).join(', '))
    console.log('  first profile sample:', JSON.stringify({ testCode: first.testCode, testAmount: first.testAmount, testDescription: first.testDescription }, null, 2))
  }
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
