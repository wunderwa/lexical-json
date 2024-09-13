import { Paragraph } from 'docx'
import '../../lib/defaultConfig'
import { FileChild } from 'docx/build/file/file-child'
import { LexicalElem, LexicalHeading, LexicalJson, LexicalParagraph, LexicalQuote } from 'lib/types'

import { formatToAlignment, getHeadingValue, getSimpleChild, getList } from './utils'

// TODO styles.direction = node.direction

const theParagraph = (paragraph: LexicalParagraph): Paragraph => {
  return new Paragraph({
    alignment: formatToAlignment(paragraph.format),
    children: paragraph.children.map(getSimpleChild),
  })
}

const theQuote = (quote: LexicalQuote) => {
  return new Paragraph({
    children: quote.children.map(getSimpleChild),
    alignment: formatToAlignment(quote.format),
  })
}

const theHeading = (heading: LexicalHeading) => {
  return new Paragraph({
    children: heading.children.map(getSimpleChild),
    alignment: formatToAlignment(heading.format),
    heading: getHeadingValue(heading.tag),
  })
}

export const toDocxSection = (body: LexicalJson): FileChild[] => {
  return body.root.children.reduce((acc: FileChild[], elem: LexicalElem) => {
    switch (elem.type) {
      case 'list':
        return [...acc, ...getList(elem)]
      case 'heading':
        return [...acc, theHeading(elem)]
      case 'quote':
        return [...acc, theQuote(elem)]
      case 'paragraph':
        return [...acc, theParagraph(elem)]
    }
  }, [])
}
