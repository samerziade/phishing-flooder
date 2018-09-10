import { strings } from './user-agents'

export const getRandom = (): string => {
  return strings[Math.floor(Math.random() * strings.length)]
}
