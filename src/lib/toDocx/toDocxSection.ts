import { Paragraph, FileChild, Table, TableRow, TableCell, WidthType, ITableCellOptions } from 'docx'
import '../../lib/defaultConfig'
import { getChordsChild } from './utils/getChordsChild'
import { formatToAlignment, getHeadingValue, getSimpleChild, getList, getCodeChild, widthToPercent } from './utils'

import {
  LexicalChords,
  LexicalCode,
  LexicalElem,
  LexicalHeading,
  LexicalJson,
  LexicalParagraph,
  LexicalQuote,
  LexicalTable,
  LexicalTableCell,
  LexicalTableRow,
} from '../types'

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

const theTable = (table: LexicalTable) => {
  const { colWidths, children } = table
  const percentWidths = widthToPercent(colWidths)

  return new Table({
    rows: children.map((row: LexicalTableRow) => {
      return new TableRow({
        children: row.children.map((cell: LexicalTableCell, index: number) => {
          const { rowSpan, colSpan: columnSpan } = cell
          const cellParams: Partial<ITableCellOptions> = {
            rowSpan,
            columnSpan,
            // textDirection: direction === 'rtl' ? TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM : ...
          }
          return new TableCell({
            ...cellParams,
            children: cell.children.map((p: LexicalParagraph) => theParagraph(p)),
            width: { size: percentWidths[index] ?? 10, type: WidthType.PERCENTAGE },
          })
        }),
      })
    }),
    width: { size: 100, type: WidthType.PERCENTAGE },
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
      case 'table':
        return [...acc, theTable(elem)]
    }
  }, [])
}
