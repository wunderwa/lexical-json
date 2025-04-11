import { Paragraph, FileChild } from 'docx'
import '../../lib/defaultConfig'
import { getChordsChild } from './utils/getChordsChild'
import { formatToAlignment, getHeadingValue, getSimpleChild, getList, getCodeChild } from './utils'

import {
  LexicalChords,
  LexicalCode,
  LexicalElem,
  LexicalHeading,
  LexicalJson,
  LexicalParagraph,
  LexicalQuote,
} from '../types'

// TODO styles.direction = node.direction

const theParagraph = (paragraph: LexicalParagraph): Paragraph => {
  return new Paragraph({
    alignment: formatToAlignment(paragraph.format),
    children: paragraph.children.map(getSimpleChild),
  })
}

const theChords = (paragraph: LexicalChords): Paragraph => {
  return new Paragraph({
    alignment: formatToAlignment(paragraph.format),
    children: paragraph.children.map(getChordsChild),
  })
}

const theCode = (paragraph: LexicalCode): Paragraph => {
  return new Paragraph({
    alignment: formatToAlignment(paragraph.format),
    children: paragraph.children.map(getCodeChild),
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
      case 'chords':
        return [...acc, theChords(elem)]
      case 'code':
        return [...acc, theCode(elem)]
    }
  }, [])
}
