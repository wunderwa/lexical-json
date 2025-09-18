import { tag, tagP } from '../utils'
import { getNewLine } from '../config'
import { Fb2Sequence } from '../typesFb2'

export const tagOfData = (tagName: string, data?: string | string[]): string | null => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map(item => tag(tagName, item, { escape: true })).join(getNewLine())
  }
  return tag(tagName, data, { escape: true })
}

const tagSequenceItem = (data: Fb2Sequence): string => tag('sequence', null, { attrs: data })

export const tagSequence = (data?: Fb2Sequence | Fb2Sequence[]): string | null => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map(item => tagSequenceItem(item)).join(getNewLine())
  }
  return tagSequenceItem(data)
}

export const tagAnnotation = (data?: string): string | null => {
  if (data) {
    return data
      .split('\n')
      .map(line => tagP(line, true))
      .join(getNewLine())
  }
  return null
}
