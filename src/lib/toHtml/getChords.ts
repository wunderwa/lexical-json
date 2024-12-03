import { getAttr } from '../config'
import { getShiftedTone } from '../utils'
import { getBaseStyle } from './getBaseStyle'
import {
  ChordsTone,
  ChordToneShift,
  LexicalChords,
  LexicalChordsChild,
  LexicalChordsHighlight,
  LexicalTab,
} from '../types'

const getTab = (tab: LexicalTab) => `<span>${tab.text}</span>`

const getHighlight = (item: LexicalChordsHighlight, tonality: ChordToneShift = 0) => {
  switch (item.highlightType) {
    // TODO NEED STYLES!!!!
    case 'tone':
      const tone = getShiftedTone(item.text as ChordsTone, tonality) ?? item.text

      return `<span style="font-weight: bold">${tone}</span>`
    case 'min':
      return `<span style="font-size: 90%">${item.text}</span>`
    case 'attr':
      return `<span style="font-size: 80%;vertical-align: super">${item.text}</span>`
    case 'error':
      return `<span style="text-decoration: line-through;color: red">${item.text}</span>`
    default:
      return `<span>${item.text}</span>`
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
      return '<br>'
  }
}

export const getChords = (chords: LexicalChords, tonality: ChordToneShift) => {
  const content = chords.children.map(ch => getChordsHighlightChild(ch, tonality)).join('')
  const styles = getBaseStyle(chords) ?? {}
  styles.fontFamily = 'monospace'
  const configAttr = getAttr('chords', styles)
  return `<code ${configAttr}>${content}</code>`
}
