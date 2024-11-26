import { getAttr, getConfig } from '../config'
import { IS_BOLD, IS_CODE, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE } from '../constants'
import { LexicalStyle, LexicalText } from '../types'

export const getText = (text: LexicalText) => {
  let styles: LexicalStyle = {}
  const decoration = []
  if (text.format & IS_BOLD) {
    styles.fontWeight = 'bold'
  }
  if (text.format & IS_ITALIC) {
    styles.fontStyle = 'italic'
  }
  if (text.format & IS_STRIKETHROUGH) {
    decoration.push('line-through')
  }
  if (text.format & IS_UNDERLINE) {
    decoration.push('underline')
  }
  if (decoration.length) {
    styles.textDecoration = decoration.join(' ')
  }
  if (text.format & IS_CODE) {
    // code
    styles.fontFamily = 'monospace'
    styles = { ...styles, ...(getConfig('code')?.style ?? {}) }
  }
  const configAttr = getAttr('text', styles)
  return `<span ${configAttr}>${text.text}</span>`
}
