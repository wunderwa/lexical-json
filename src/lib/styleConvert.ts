import { LexicalStyle } from './types'

const keyToStyleName = <T>(key: T): T =>
  (key as string)
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase() as T

export const toCssString = (style: LexicalStyle): string => {
  if (!style) return ''
  const cleaned: LexicalStyle = Object.keys(style).reduce(
    (acc, key) => ({ ...acc, [keyToStyleName(key)]: style[key] }),
    {},
  )
  return Object.keys(cleaned)
    .reduce((acc: string[], key) => [...acc, `${key}:${cleaned[key]}`], [])
    .join(';')
}

export const toCssJson = (str: string) =>
  str.split(';').reduce((acc: LexicalStyle, key: string) => {
    const parts = key.split(':', 2)
    if (parts.length > 1) {
      return { ...acc, [parts[0]]: parts[1] }
    } else {
      return acc
    }
  }, {})
