import { LexicalCode, LexicalCodeChild, LexicalCodeHighlight } from '../types'
import { $, $p, $tab } from '../utils'

const getHighlight = (item: LexicalCodeHighlight) => {
  return item.text
}

const getCodeHighlightChild = (simpleChild: LexicalCodeChild) => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return getHighlight(simpleChild)
    case 'tab':
      return $tab(simpleChild)
    case 'linebreak':
    default:
      return $('br')
  }
}

export const getCode = (code: LexicalCode) => {
  const content = code.children.map(getCodeHighlightChild).join('')
  return $p($('code', content))
}
