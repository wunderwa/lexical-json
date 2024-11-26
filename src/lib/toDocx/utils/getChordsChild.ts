import { ParagraphChild, TextRun } from 'docx'
import { LexicalChordsChild, LexicalChordsHighlight, LexicalTab } from '../../types'

const theTab = (tab: LexicalTab) => new TextRun({ text: tab.text, font: 'monospace' })
const theBreakLine = () => new TextRun({ text: '', break: 1 })

const theHighlights = (item: LexicalChordsHighlight) => {
  switch (item.highlightType) {
    case 'tone':
      return new TextRun({
        text: item.text,
        font: 'monospace',
        bold: true,
      })
    case 'min':
      return new TextRun({
        font: 'monospace',
        text: item.text,
      })
    case 'attr':
      return new TextRun({
        text: item.text,
        font: 'monospace',
        superScript: true,
        size: '12pt',
      })
    case 'error':
      return new TextRun({
        text: item.text,
        font: 'monospace',
        strike: true,
        color: 'red',
      })
    default:
      return new TextRun(item.text)
  }
}

export const getChordsChild = (simpleChild: LexicalChordsChild): ParagraphChild => {
  switch (simpleChild.type) {
    case 'chords-highlight':
      return theHighlights(simpleChild)
    case 'tab':
      return theTab(simpleChild)
    case 'linebreak':
    default:
      return theBreakLine()
  }
}
