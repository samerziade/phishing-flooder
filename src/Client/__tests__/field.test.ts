import * as field from '../field'
import { Schema } from '../../Config'

export type Schema = {
  name: string
  type?: string
  min?: number
  max?: number
  set?: string
  value?: string
}

const NAME = 'Test Field'
const MIN = 8
const MAX = 128
const MOCK_MIN = 8
const MOCK_MAX = 64
const MOCK_MIN_UNDER = -1
const MOCK_MAX_OVER = 256

const defaultSet: string =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+[{]}|;:",<.>?'

const mockNameOnlyData: Schema = { name: NAME }

test(`getMin() should return ${MIN} with no min or max passed`, () => {
  const value = field.getMin(mockNameOnlyData)

  expect(value).toEqual(MIN)
})

test('getMin() should return supplied value with only min passed', () => {
  const data: Schema = { name: NAME, min: MOCK_MIN }
  const value = field.getMin(data)

  expect(value).toEqual(MOCK_MIN)
})

test(`getMin() should return ${MIN} with negative min supplied`, () => {
  const data: Schema = { name: NAME, min: MOCK_MIN_UNDER }
  const value = field.getMin(data)

  expect(value).toEqual(MIN)
})

test('getMin() should return supplied value with min and max passed', () => {
  const data: Schema = { name: NAME, min: MOCK_MIN, max: MOCK_MAX }
  const value = field.getMin(data)

  expect(value).toEqual(MOCK_MIN)
})

test(`getMin() should return ${MIN} value with min being bigger than max`, () => {
  const data: Schema = { name: NAME, min: MOCK_MAX, max: MOCK_MIN }
  const value = field.getMin(data)

  expect(value).toEqual(MIN)
})

test(`getMax() should return ${MAX} with no min or max passed`, () => {
  const value = field.getMax(mockNameOnlyData)

  expect(value).toEqual(MAX)
})

test('getMax() should return supplied value with only max supplied', () => {
  const data: Schema = { name: NAME, max: MOCK_MAX }
  const value = field.getMax(data)

  expect(value).toEqual(MOCK_MAX)
})

test(`getMax() should return ${MAX} max supplied being over 128`, () => {
  const data: Schema = { name: NAME, max: MOCK_MAX_OVER }
  const value = field.getMax(data)

  expect(value).toEqual(MAX)
})

test(`getMax() should return ${MAX} max supplied being smaller than min`, () => {
  const data: Schema = { name: NAME, min: MOCK_MAX, max: MOCK_MIN }
  const value = field.getMax(data)

  expect(value).toEqual(MAX)
})

test('getRandomStringLength() should return a value between min and max', () => {
  const value = field.getRandomStringLength(MOCK_MIN, MOCK_MAX)

  expect(value).toBeGreaterThanOrEqual(MOCK_MIN)
  expect(value).toBeLessThanOrEqual(MOCK_MAX)
})

test('getRandomChar() should return a random character from the supplied set', () => {
  const data: Schema = { name: NAME, set: 'abcdefghijklmnopqrstuvwxyz' }
  const value = field.getRandomChar(data.set)

  expect(data.set).toEqual(expect.stringContaining(value))
})

test('getRandomChar() should return a random character from the default set', () => {
  const value = field.getRandomChar(defaultSet)

  expect(defaultSet).toEqual(expect.stringContaining(value))
})

test(`getStringValue() should return a string between ${MIN} and ${MAX} inclusive with no min/max supplied`, () => {
  const data: Schema = { name: NAME }
  const value = field.getStringValue(data).length - 1

  expect(value).toBeGreaterThanOrEqual(MIN)
  expect(value).toBeLessThanOrEqual(MAX)
})

test(`getStringValue() should return a string larger or equal to ${MOCK_MIN}`, () => {
  const data: Schema = { name: NAME, min: MOCK_MIN }
  const value = field.getStringValue(data).length - 1

  expect(value).toBeGreaterThanOrEqual(MOCK_MIN)
})

test(`getStringValue() should return a string between ${MOCK_MIN} and ${MOCK_MAX} inclusive`, () => {
  const data: Schema = { name: NAME, min: MOCK_MIN, max: MOCK_MAX }
  const value = field.getStringValue(data).length - 1

  expect(value).toBeGreaterThanOrEqual(MOCK_MIN)
  expect(value).toBeLessThanOrEqual(MOCK_MAX)
})

test(`getStringValue() should return a string less than or equal to ${MOCK_MAX}`, () => {
  const data: Schema = { name: NAME, max: MOCK_MAX }
  const value = field.getStringValue(data).length - 1

  expect(value).toBeLessThanOrEqual(MOCK_MAX)
})

test('getValue() should return expected object with only name supplied', () => {
  const data: Schema = { name: NAME }
  const expected = { [NAME]: '' }
  const value = field.getValue(data)

  expect(value).toEqual(expected)
})

test('getValue() should return expected object with name and value supplied', () => {
  const data: Schema = { name: NAME, value: 'Test Value' }
  const expected = { [NAME]: 'Test Value' }
  const value = field.getValue(data)

  expect(value).toEqual(expected)
})
