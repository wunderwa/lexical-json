import { ChordToneShift, ChordsTone } from './types'
import { getNewLine } from './config'

export const tones: ChordsTone[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

export const getShiftedTone = (tone: ChordsTone, shift: ChordToneShift): ChordsTone | null => {
  const _tone = tone.toUpperCase()
  const _shift = ((shift % 12) + 12) % 12
  const i = tones.indexOf(_tone as ChordsTone)
  if (i === -1) {
    return null
  }
  return [...tones, ...tones][i + _shift]
}

export const escapeXml = (unsafe: string) =>
  unsafe.replace(/[<>&"']/g, s => {
    const replacement: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    }
    return replacement[s] ?? ''
  })

export type Opts = {
  attrs?: Record<string, string | number>
  escape?: boolean
}

const objectToHtmlAttributesString = (obj: Opts['attrs']) => {
  const attributes = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      const escapedValue = String(value).replace(/"/g, '&quot;')
      attributes.push(`${key}="${escapedValue}"`)
    }
  }
  return attributes.join(' ')
}

export type Tags = (tag: string, contents?: string | null, opts?: Opts) => string

export const tag: Tags = (tag, contents = null, opts = {}) => {
  const _content = opts?.escape && contents ? escapeXml(contents) : contents

  const attrs = opts.attrs ? ` ${objectToHtmlAttributesString(opts.attrs)} ` : ''
  return contents ? `<${tag}${attrs}>${_content}</${tag}>` : `<${tag}${attrs}/>`
}

export const tagP = (content: string, escape = false): string => tag('p', escape ? escapeXml(content) : content)

export const filterString = (s: string | null) => typeof s === 'string'
export const filterNotEmpty = (s: unknown) => Boolean(s)

export const compactXml = (data: (string | null)[]): string => data.filter(filterString).join(getNewLine())
