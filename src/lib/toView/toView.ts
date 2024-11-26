import {
  LexicalChords,
  LexicalChordsChild,
  LexicalCode,
  LexicalCodeChild,
  LexicalElem,
  LexicalHeading,
  LexicalJson,
  LexicalLink,
  LexicalList,
  LexicalListItem,
  LexicalListItemChild,
  LexicalParagraph,
  LexicalQuote,
  LexicalSimpleChild,
  LexicalText,
} from '../types'

const getText = (text: LexicalText) => text.text
const getLink = (link: LexicalLink) => link.children.map(getText).join('')
const getSimpleChild = (simpleChild: LexicalSimpleChild) => {
  switch (simpleChild.type) {
    case 'link':
      return getLink(simpleChild)
    case 'text':
      return getText(simpleChild)
    case 'linebreak':
    default:
      return '\n'
  }
}

const getChordsChild = (simpleChild: LexicalChordsChild) => {
  switch (simpleChild.type) {
    case 'chords-highlight':
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
      case 'check':
        return check ? '🗹 ' : '🗆 '
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

const getChords = (quote: LexicalChords) => quote.children.map(getChordsChild).join('')

const getCode = (quote: LexicalCode) => quote.children.map(getCodeChild).join('')

export const toView = (body: LexicalJson) => {
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
          return getChords(elem)
        case 'code':
          return getCode(elem)
        default:
          return ''
      }
    })
    .join(`\n`)
}
