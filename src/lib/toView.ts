import {
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
} from 'lib/types'

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

const getList = (list: LexicalList, pad = ''): string => {
  const isNum = list.listType === 'number'
  return list.children
    .map((listItem: LexicalListItem, i) => {
      const prefix = pad + (isNum ? `${i + 1}. ` : '• ')
      return (
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
        default:
          return ''
      }
    })
    .join(`\n`)
}
