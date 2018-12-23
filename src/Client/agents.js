import { strings } from './user-agents'

export const getRandom = () => {
  return strings[Math.floor(Math.random() * strings.length)]
}
