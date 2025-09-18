import { escapeXml, getShiftedTone, tag, tagP } from '../utils'
import { ChordsTone, ChordToneShift, LexicalChords, LexicalChordsChild, LexicalChordsHighlight } from '../types'
import { getTab } from './getText'

const getHighlight = (item: LexicalChordsHighlight, tonality: ChordToneShift = 0) => {
  switch (item.highlightType) {
    case 'tone': {
      const tone = getShiftedTone(item.text as ChordsTone, tonality) ?? item.text
      return tag('emphasis', tone, { escape: true })
    }
    case 'min':
      return tag('sub', item.text, { escape: true })
    case 'attr':
      return tag('sup', item.text, { escape: true })
    case 'error':
      return tag('strikethrough', item.text, { escape: true })
    default:
      return escapeXml(item.text)
  }
}

const getChordsHighlightChild = (simpleChild: LexicalChordsChild, tonality: ChordToneShift = 0) => {
  switch (simpleChild.type) {
    case 'chords-highlight':
      return getHighlight(simpleChild, tonality)
    case 'tab':
      return getTab(simpleChild)
    case 'linebreak':
    default:
      return ' '
  }
}

export const getChords = (chords: LexicalChords, tonality: ChordToneShift) => {
  const content = chords.children.map(ch => getChordsHighlightChild(ch, tonality)).join('')
  return tagP(tag('code', content))
}
