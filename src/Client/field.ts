import { Schema } from '../../schemas/schema';

export type Field = {
  [field: string]: string;
};

const defaultSet: string =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+[{]}|;:",<.>?';

const getMin = (field: Schema): number => {
  let min = 0;

  if (field.hasOwnProperty('min') && field.min >= min) {
    min = field.min;
  }

  if (field.hasOwnProperty('max') && min > field.max) {
    min = 0;
  }

  return min;
};

const getMax = (field: Schema): number => {
  let max = 128;

  if (field.hasOwnProperty('max') && field.max <= max) {
    max = field.max;
  }

  if (field.hasOwnProperty('min') && max < field.min) {
    max = 128;
  }

  return max;
};

const getRandomStringLength = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomChar = (set: string): string => {
  const min = 0;
  const max = set.length - 1;

  return set[getRandomStringLength(min, max)];
};

const getStringValue = (field: Schema): string => {
  const maxValueLength = getRandomStringLength(getMin(field), getMax(field));
  let set: string = defaultSet;
  let value: string = '';

  if (field.hasOwnProperty('set')) {
    set = field.set;
  }

  for (let i = 0; i <= maxValueLength; i++) {
    value += getRandomChar(set);
  }

  return value;
};

export const getValue = (field: Schema): Field => {
  let value: string = '';

  if (field.hasOwnProperty('value')) {
    value = field.value;
  } else if (field.type === 'string') {
    value = getStringValue(field);
  }

  return { [field.name]: value };
};
