import * as agents from '../agents'
import { strings } from '../user-agents'

test('getRandom() return a string', () => {
  const value = agents.getRandom()
  expect(strings).toEqual(expect.arrayContaining([value]))
})
