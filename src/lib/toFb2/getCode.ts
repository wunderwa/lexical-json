import { LexicalCode, LexicalCodeChild, LexicalCodeHighlight } from '../types'
import { tag, tagP } from '../utils'
import { getTab } from './getText'

const getHighlight = (item: LexicalCodeHighlight) => {
  return item.text
}

const getCodeHighlightChild = (simpleChild: LexicalCodeChild) => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return getHighlight(simpleChild)
    case 'tab':
      return getTab(simpleChild)
    case 'linebreak':
    default:
      return tag('br')
  }
}

export const getCode = (code: LexicalCode) => {
  const content = code.children.map(getCodeHighlightChild).join('')
  return tagP(tag('code', content))
}
