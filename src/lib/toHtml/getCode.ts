import { getAttrs } from '../config'
import { getBaseStyle } from './getBaseStyle'
import { LexicalCode, LexicalCodeChild, LexicalCodeHighlight } from '../types'
import { $, $tab, $br } from '../utils'

const getHighlight = (item: LexicalCodeHighlight) => {
  switch (item.highlightType) {
    // TODO NEED STYLES!!!!
    case 'class':
    case 'constant':
    case 'variable':
    case 'function':
      return $('span', item.text, {
        escape: true,
        attrs: {
          style: 'font-weight: bold',
        },
      })
    default:
      return $('span', item.text, { escape: true })
  }
}

const getCodeHighlightChild = (simpleChild: LexicalCodeChild) => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return getHighlight(simpleChild)
    case 'tab':
      return $tab(simpleChild)
    case 'linebreak':
    default:
      return $br()
  }
}

export const getCode = (code: LexicalCode) => {
  const content = code.children.map(getCodeHighlightChild).join('')
  const styles = getBaseStyle(code) ?? {}
  styles.fontFamily = 'monospace'
  return $('code', content, { attrs: getAttrs('code', styles) })
}
