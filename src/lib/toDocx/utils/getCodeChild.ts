import { ParagraphChild, TextRun } from 'docx'
import { LexicalCodeChild, LexicalCodeHighlight, LexicalTab } from '../../types'

const theTab = (tab: LexicalTab) =>
  new TextRun({
    text: '    ',
    font: 'monospace',
  })
const theBreakLine = () => new TextRun({ text: '', break: 1 })

const theHighlights = (item: LexicalCodeHighlight) => {
  switch (item.highlightType) {
    case 'class':
    case 'constant':
    case 'variable':
    case 'function':
      return new TextRun({
        text: item.text,
        font: 'monospace',
        bold: true,
      })
    default:
      return new TextRun({
        text: item.text,
        font: 'monospace',
      })
  }
}

export const getCodeChild = (simpleChild: LexicalCodeChild): ParagraphChild => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return theHighlights(simpleChild)
    case 'tab':
      return theTab(simpleChild)
    case 'linebreak':
    default:
      return theBreakLine()
  }
}
