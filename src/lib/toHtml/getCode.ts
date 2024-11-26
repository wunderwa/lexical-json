import { getAttr } from '../config'
import { getBaseStyle } from './getBaseStyle'
import { LexicalCode, LexicalCodeChild, LexicalCodeHighlight, LexicalTab } from '../types'

const getTab = (tab: LexicalTab) => `<span>${tab.text}&nbsp;&nbsp;</span>`

const getHighlight = (item: LexicalCodeHighlight) => {
  switch (item.highlightType) {
    // TODO NEED STYLES!!!!
    case 'class':
    case 'constant':
    case 'variable':
    case 'function':
      return `<span style="font-weight: bold">${item.text}</span>`
    default:
      return `<span>${item.text}</span>`
  }
}

const getCodeHighlightChild = (simpleChild: LexicalCodeChild) => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return getHighlight(simpleChild)
    case 'tab':
      return getTab(simpleChild)
    case 'linebreak':
    default:
      return '<br>'
  }
}

export const getCode = (code: LexicalCode) => {
  const content = code.children.map(getCodeHighlightChild).join('')
  const styles = getBaseStyle(code) ?? {}
  styles.fontFamily = 'monospace'
  const configAttr = getAttr('code', styles)
  return `<code ${configAttr}>${content}</code>`
}
