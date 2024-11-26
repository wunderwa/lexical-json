import { getAttr } from '../config'
import { getBaseStyle } from './getBaseStyle'
import { LexicalChords, LexicalChordsChild, LexicalChordsHighlight, LexicalTab } from '../types'

const getTab = (tab: LexicalTab) => `<span>${tab.text}</span>`

const getHighlight = (item: LexicalChordsHighlight) => {
  switch (item.highlightType) {
    // TODO NEED STYLES!!!!
    case 'tone':
      return `<span style="font-weight: bold">${item.text}</span>`
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

const getChordsHighlightChild = (simpleChild: LexicalChordsChild) => {
  switch (simpleChild.type) {
    case 'chords-highlight':
      return getHighlight(simpleChild)
    case 'tab':
      return getTab(simpleChild)
    case 'linebreak':
    default:
      return '<br>'
  }
}

export const getChords = (chords: LexicalChords) => {
  const content = chords.children.map(getChordsHighlightChild).join('')
  const styles = getBaseStyle(chords) ?? {}
  styles.fontFamily = 'monospace'
  const configAttr = getAttr('chords', styles)
  return `<code ${configAttr}>${content}</code>`
}
