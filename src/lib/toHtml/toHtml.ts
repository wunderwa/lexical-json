import { getAttr } from '../config'
import '../defaultConfig'
import { LexicalElem, LexicalHeading, LexicalJson, LexicalNonListElem, LexicalParagraph, LexicalQuote } from '../types'

import { getBaseStyle } from './getBaseStyle'
import { getCode } from './getCode'
import { getChords } from './getChords'
import { getSimpleChild } from './getSimpleChild'
import { getList } from './getList'

const getNodeProps = (node: LexicalNonListElem) => ({
  content: node.children.map(getSimpleChild).join(''),
  styles: getBaseStyle(node),
})

const getParagraph = (paragraph: LexicalParagraph) => {
  const { content, styles } = getNodeProps(paragraph)
  const configAttr = getAttr('paragraph', styles)
  return `<p ${configAttr}>${content}</p>`
}

const getQuote = (quote: LexicalQuote) => {
  const { content, styles } = getNodeProps(quote)
  const configAttr = getAttr('quote', styles)
  return `<blockquote ${configAttr}> ${content}</blockquote>`
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
        case 'heading':
          return getHeading(elem)
        case 'quote':
          return getQuote(elem)
        case 'paragraph':
          return getParagraph(elem)
        case 'list':
          return getList(elem)
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
