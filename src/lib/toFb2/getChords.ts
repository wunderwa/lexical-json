import { escapeXml, $br, $tab, getShiftedTone, $, $p } from '../utils'
import { ChordsTone, ChordToneShift, LexicalChords, LexicalChordsChild, LexicalChordsHighlight } from '../types'
import { nbsp } from '../constants'

const getHighlight = (item: LexicalChordsHighlight, tonality: ChordToneShift = 0) => {
  switch (item.highlightType) {
    case 'tone': {
      const tone = getShiftedTone(item.text as ChordsTone, tonality) ?? item.text
      return $('emphasis', tone, { escape: true })
    }
    case 'min':
      return $('sub', item.text, { escape: true })
    case 'attr':
      return $('sup', item.text, { escape: true })
    case 'error':
      return $('strikethrough', item.text, { escape: true })
    default: {
      return item.text.match(/^b+$/) ? nbsp : escapeXml(item.text).replace(/\n/g, $br())
    }
  }
}

const getChordsHighlightChild = (simpleChild: LexicalChordsChild, tonality: ChordToneShift = 0) => {
  switch (simpleChild.type) {
    case 'chords-highlight':
      return getHighlight(simpleChild, tonality)
    case 'tab':
      return $tab(simpleChild)
    case 'linebreak':
      return $br()
    default:
      return ' '
  }
}

export const getChords = (chords: LexicalChords, tonality: ChordToneShift) => {
  const content = chords.children.map(ch => getChordsHighlightChild(ch, tonality)).join('')
  return $p($('code', content))
}
