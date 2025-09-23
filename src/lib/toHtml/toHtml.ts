import { getAttrs } from '../config'
import '../defaultConfig'
import { LexicalElem, LexicalHeading, LexicalNonListElem, LexicalParagraph, LexicalQuote, ToHtml } from '../types'

import { getBaseStyle } from './getBaseStyle'
import { getCode } from './getCode'
import { getChords } from './getChords'
import { getSimpleChild } from './getSimpleChild'
import { getList } from './getList'
import { getTable } from './getTable'
import { $br, $ } from '../utils'

const getNodeProps = (node: LexicalNonListElem) => ({
  //content: node.children.map(getSimpleChild).join(''),
  content: node.children.length ? node.children.map(getSimpleChild).join('') : $br(),
  styles: getBaseStyle(node),
})

const getParagraph = (paragraph: LexicalParagraph) => {
  const { content, styles } = getNodeProps(paragraph)
  return $('p', content, { attrs: getAttrs('paragraph', styles) })
}

const getQuote = (quote: LexicalQuote) => {
  const { content, styles } = getNodeProps(quote)
  return $('blockquote', content, {
    attrs: getAttrs('quote', styles),
  })
}

const getHeading = (heading: LexicalHeading) => {
  const { content, styles } = getNodeProps(heading)
  return $(heading.tag, content, { attrs: getAttrs(heading.tag, styles) })
}

export const toHtml: ToHtml = (body, { chordsTonality = 0 } = {}) => {
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
