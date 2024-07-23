import { IS_BOLD, IS_CODE, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE } from './constants'
import { getAttr, getConfig } from './config'
import './defaultConfig'
import {
  LexicalBase,
  LexicalStyle,
  LexicalElem,
  LexicalHeading,
  LexicalJson,
  LexicalLink,
  LexicalList,
  LexicalListItem,
  LexicalListItemChild,
  LexicalNonListElem,
  LexicalParagraph,
  LexicalQuote,
  LexicalSimpleChild,
  LexicalText,
} from './types'

const getBaseStyle = (node: LexicalBase): LexicalStyle => {
  const styles: LexicalStyle = {}
  if (node.direction) styles.direction = node.direction
  if (node.format) styles.textAlign = node.format
  return styles
}

const getText = (text: LexicalText) => {
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
    styles = {...styles, ...(getConfig('code')?.style ?? {})}
  }
  const configAttr = getAttr('text', styles)
  return `<span ${configAttr}>${text.text}</span>`
}

const getLink = (link: LexicalLink) => {
  const content = link.children.map(getText).join('')
  const keys: (keyof LexicalLink)[] = Object.keys(link) as (keyof LexicalLink)[]
  const attr = keys
    .map(key => {
      if (['children', 'version'].includes(key)) return ''
      if (key == 'url') {
        return link[key] ? `href="${link[key]}"` : ''
      } else {
        return link[key] ? `${key}="${link[key]}"` : ''
      }
    })
    .join(' ')
  const configAttr = getAttr('link')
  return `<a ${attr} ${configAttr}>${content}</a>`
}

const getSimpleChild = (simpleChild: LexicalSimpleChild) => {
  switch (simpleChild.type) {
    case 'link':
      return getLink(simpleChild)
    case 'text':
      return getText(simpleChild)
    case 'linebreak':
    default:
      return '<br>'
  }
}

const getNodeProps = (node: LexicalNonListElem) => ({
  content: node.children.map(getSimpleChild).join(''),
  styles: getBaseStyle(node),
})

const getList = (list: LexicalList): string => {
  const items = list.children
    .map((listItem: LexicalListItem) => {
      const listItemChildren = listItem.children.map((itemChild: LexicalListItemChild) => {
        if (itemChild.type == 'list') {
          return getList(itemChild)
        } else {
          return getSimpleChild(itemChild)
        }
      })
      const styles = getBaseStyle(listItem)
      const configAttr = getAttr('listitem', styles)

      return `<li ${configAttr}>${listItemChildren}</li>`
    })
    .join('\n')
  const configAttr = getAttr('list', getBaseStyle(list))
  return `<${list.tag} ${configAttr}>${items}</${list.tag}>`
}

const getParagraph = (paragraph: LexicalParagraph) => {
  const { content, styles } = getNodeProps(paragraph)
  const configAttr = getAttr('paragraph', styles)
  return `<p ${configAttr}>${content}</p>`
}

const getQuote = (quote: LexicalQuote) => {
  const { content, styles } = getNodeProps(quote)
  const configAttr = getAttr('quote', styles)
  return `<blockquote ${configAttr}> ++++ ${content}</blockquote>`
}

const getHeading = (heading: LexicalHeading) => {
  const { content, styles } = getNodeProps(heading)
  const configAttr = getAttr(heading.tag, styles)
  return `<${heading.tag} ${configAttr}>${content}</${heading.tag}>`
}

export const toHtml = (body: LexicalJson) => {
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
