/**
 * Single test or profile from the test master (getAllTestsAndProfiles).
 * Use test id or test code when creating orders (e.g. LHREGISTER).
 */
export interface TestMasterItem {
  /** Unique ID - use this or testCode when creating orders */
  id?: string
  /** Test code - use this or id when creating orders */
  testCode?: string
  name?: string
  /** Category of the test */
  category?: string
  /** Price of the test */
  price?: number
  description?: string
  [key: string]: unknown
}

/**
 * Response from getAllTestsAndProfiles API.
 * LiveHealth returns an object with profileTestList (array of profiles, each with testList).
 */
export interface GetAllTestsAndProfilesResponse {
  profileTestList?: Array<{
    testCode?: string
    testAmount?: string
    testDescription?: string
    testCategory?: string
    testList?: TestMasterItem[]
    [key: string]: unknown
  }>
  [key: string]: unknown
}
