import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE } from '../constants'
import { LexicalTab, LexicalText } from '../types'
import { escapeXml, tag } from '../utils'

export const getText = (text: LexicalText) => {
  let CONTENT = escapeXml(text.text)

  if (text.format & IS_BOLD) {
    CONTENT = tag('strong', CONTENT)
  }
  if (text.format & IS_ITALIC) {
    CONTENT = tag('emphasis', CONTENT)
  }
  if (text.format & IS_STRIKETHROUGH) {
    CONTENT = tag('strikethrough', CONTENT)
  }
  if (text.format & IS_UNDERLINE) {
    CONTENT = tag('u', CONTENT)
  }

  return CONTENT
}

export const getTab = (tab: LexicalTab) => `${tab.text}`
