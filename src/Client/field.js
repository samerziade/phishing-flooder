const defaultSet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+[{]}|;:",<.>?'

export const getMin = field => {
  let min = 8

  if (field.hasOwnProperty('min') && field.min >= min) {
    min = field.min
  }

  if (field.hasOwnProperty('max') && min > field.max) {
    min = 8
  }

  return min
}

export const getMax = field => {
  let max = 128

  if (field.hasOwnProperty('max') && field.max <= max) {
    max = field.max
  }

  if (field.hasOwnProperty('min') && max < field.min) {
    max = 128
  }

  return max
}

export const getRandomStringLength = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomChar = set => {
  const min = 0
  const max = set.length - 1

  return set[getRandomStringLength(min, max)]
}

export const getStringValue = field => {
  const maxValueLength = getRandomStringLength(getMin(field), getMax(field))
  let set = defaultSet
  let value = ''

  if (field.hasOwnProperty('set')) {
    set = field.set
  }

  for (let i = 0; i <= maxValueLength; i++) {
    value += getRandomChar(set)
  }

  return value
}

export const getValue = field => {
  let value = ''

  if (field.hasOwnProperty('value')) {
    value = field.value
  } else if (field.type === 'string') {
    value = getStringValue(field)
  }

  return { [field.name]: value }
}
