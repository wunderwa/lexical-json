import { getAttrs } from '../config'
import { $br, getShiftedTone, $tab, $ } from '../utils'
import { getBaseStyle } from './getBaseStyle'
import { ChordsTone, ChordToneShift, LexicalChords, LexicalChordsChild, LexicalChordsHighlight } from '../types'

const getHighlight = (item: LexicalChordsHighlight, tonality: ChordToneShift = 0) => {
  switch (item.highlightType) {
    // TODO NEED STYLES!!!!
    case 'tone': {
      const tone = getShiftedTone(item.text as ChordsTone, tonality) ?? item.text
      return $('span', tone, {
        escape: true,
        attrs: {
          style: 'font-weight: bold',
        },
      })
    }
    case 'min':
      return $('span', item.text, {
        escape: true,
        attrs: {
          style: 'font-size: 90%',
        },
      })
    case 'attr':
      return $('span', item.text, {
        escape: true,
        attrs: {
          style: 'font-size: 80%;vertical-align: super',
        },
      })
    case 'error':
      return $('span', item.text, {
        escape: true,
        attrs: {
          style: 'text-decoration: line-through;color: red',
        },
      })
    default:
      return $('span', item.text, { escape: true })
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
      return $tab()
  }
}

export const getChords = (chords: LexicalChords, tonality: ChordToneShift) => {
  const content = chords.children.map(ch => getChordsHighlightChild(ch, tonality)).join('')
  const styles = getBaseStyle(chords) ?? {}
  styles.fontFamily = 'monospace'
  return $('code', content, {
    attrs: getAttrs('chords', { ...styles, display: 'block' }),
  })
}
