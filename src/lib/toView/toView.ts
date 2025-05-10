import { getShiftedTone } from '../utils'
import {
  ChordsTone,
  ChordToneShift,
  LexicalChords,
  LexicalChordsChild,
  LexicalCode,
  LexicalCodeChild,
  LexicalElem,
  LexicalHeading,
  LexicalLink,
  LexicalList,
  LexicalListItem,
  LexicalListItemChild,
  LexicalParagraph,
  LexicalQuote,
  LexicalSimpleChild,
  LexicalTable,
  LexicalTableCell,
  LexicalTableRow,
  LexicalText,
  ToView,
} from '../types'

const getText = (text: LexicalText) => text.text
const getLink = (link: LexicalLink) => link.children.map(getText).join('')
const getSimpleChild = (simpleChild: LexicalSimpleChild) => {
  switch (simpleChild.type) {
    case 'link':
    case 'autolink':
      return getLink(simpleChild)
    case 'text':
      return getText(simpleChild)
    case 'linebreak':
    default:
      return '\n'
  }
}

const getChordsChild = (simpleChild: LexicalChordsChild, tonality: ChordToneShift) => {
  switch (simpleChild.type) {
    case 'chords-highlight':
      if (simpleChild.highlightType === 'tone') {
        return getShiftedTone(simpleChild.text as ChordsTone, tonality)
      }
      return simpleChild.text
    case 'tab':
      return '    '
    case 'linebreak':
    default:
      return '\n'
  }
}

const getCodeChild = (simpleChild: LexicalCodeChild) => {
  switch (simpleChild.type) {
    case 'code-highlight':
      return simpleChild.text
    case 'tab':
      return '    '
    case 'linebreak':
    default:
      return '\n'
  }
}

const getList = (list: LexicalList, pad = ''): string => {
  const getPrefix = (index: number, check: boolean) => {
    switch (list.listType) {
      case 'number':
        return `${index + 1}. `
      // ☐ - (U+2610)
      // ☑ - (U+2611)
      // ☒ - (U+2612)
      case 'check':
        return check ? '☒ ' : '☐'
      default:
        return '• '
    }
  }

  return list.children
    .map((listItem: LexicalListItem, i) => {
      const prefix = pad + getPrefix(i, listItem.checked ?? false)
      return (
        pad +
        prefix +
        listItem.children.map((itemChild: LexicalListItemChild) => {
          if (itemChild.type == 'list') {
            return getList(itemChild, '  ')
          } else {
            return getSimpleChild(itemChild)
          }
        })
      )
    })
    .join('\n')
}

const getQuote = (quote: LexicalQuote) => quote.children.map(getSimpleChild).join('')
const getParagraph = (quote: LexicalParagraph) => quote.children.map(getSimpleChild).join('')
const getHeading = (quote: LexicalHeading) => quote.children.map(getSimpleChild).join('')

const getChords = (chords: LexicalChords, tonality: ChordToneShift) =>
  chords.children.map(ch => getChordsChild(ch, tonality)).join('')

const getCode = (code: LexicalCode) => code.children.map(getCodeChild).join('')

export const getTable = (table: LexicalTable): string => {
  return table.children
    .map((row: LexicalTableRow) => {
      const rowChildren = row.children
        .map((cell: LexicalTableCell) => {
          return `${cell.children
            .map(p => {
              return `${p.children.map(getSimpleChild)}`
            })
            .join(' ')}`
        })
        .join('\t')
      return `${rowChildren}`
    })
    .join('\n')
}

export const toView: ToView = (body, { chordsTonality = 0 } = {}) => {
  return body.root.children
    .map((elem: LexicalElem) => {
      switch (elem.type) {
        case 'list':
          return getList(elem)
        case 'heading':
          return getHeading(elem)
        case 'quote':
          return getQuote(elem)
        case 'paragraph':
          return getParagraph(elem)
        case 'chords':
          return getChords(elem, chordsTonality)
        case 'code':
          return getCode(elem)
        case 'table':
          return getTable(elem)
        default:
          return ''
      }
    })
    .join(`\n`)
}
