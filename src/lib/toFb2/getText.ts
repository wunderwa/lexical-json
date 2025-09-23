import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE, nbsp } from '../constants'
import { LexicalTab, LexicalText } from '../types'
import { escapeXml, $ } from '../utils'

export const getText = (text: LexicalText) => {
  let CONTENT = escapeXml(text.text)

  if (text.format & IS_BOLD) {
    CONTENT = $('strong', CONTENT)
  }
  if (text.format & IS_ITALIC) {
    CONTENT = $('emphasis', CONTENT)
  }
  if (text.format & IS_STRIKETHROUGH) {
    CONTENT = $('strikethrough', CONTENT)
  }
  if (text.format & IS_UNDERLINE) {
    CONTENT = $('u', CONTENT)
  }

  return CONTENT
}
