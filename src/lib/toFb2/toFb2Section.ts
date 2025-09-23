import '../defaultConfig'
import { LexicalElem, LexicalHeading, LexicalNonListElem, LexicalParagraph, LexicalQuote, ToFb2Section } from '../types'

import { getCode } from './getCode'
import { getChords } from './getChords'
import { getSimpleChild } from './getSimpleChild'
import { getList } from './getList'
import { getTable } from './getTable'
import { $, $p } from '../utils'

const getNodeProps = (node: LexicalNonListElem) => ({
  content: node.children.map(getSimpleChild).join(''),
})

const getParagraph = (paragraph: LexicalParagraph) => {
  const { content } = getNodeProps(paragraph)
  return $p(content)
}

const getQuote = (quote: LexicalQuote) => {
  const { content } = getNodeProps(quote)
  return $('annotation', $p(content))
}

const getHeading = (heading: LexicalHeading) => {
  const { content } = getNodeProps(heading)
  return $('title', $p(content))
}

export const toFb2Section: ToFb2Section = (body, { chordsTonality = 0 } = {}) => {
  const children = body.root.children
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

  return $('section', `\n${children}\n`)
}
