import { ExternalHyperlink, ParagraphChild, TextRun } from 'docx'
import { IS_BOLD, IS_CODE, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE } from '../../../lib/constants'
import { LexicalLink, LexicalSimpleChild, LexicalText } from 'lib/types'

const theText = (text: LexicalText) => {
  return new TextRun({
    text: text.text,
    bold: Boolean(text.format & IS_BOLD),
    italics: Boolean(text.format & IS_ITALIC),
    strike: Boolean(text.format & IS_STRIKETHROUGH),
    underline: text.format & IS_UNDERLINE ? { type: 'single' } : {},
    font:
      text.format & IS_CODE
        ? {
            name: 'Monospace',
          }
        : undefined,
  })
}

const theBreakLine = () => new TextRun({ text: '', break: 1 })

const theLink = (link: LexicalLink) => {
  return new ExternalHyperlink({
    children: link.children.map(theText),
    link: link.url ?? '',
  })
}

export const getSimpleChild = (simpleChild: LexicalSimpleChild): ParagraphChild => {
  switch (simpleChild.type) {
    case 'link':
      return theLink(simpleChild)
    case 'text':
      return theText(simpleChild)
    case 'linebreak':
    default:
      return theBreakLine()
  }
}
