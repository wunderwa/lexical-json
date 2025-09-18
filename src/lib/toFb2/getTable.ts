import { getSimpleChild } from './getSimpleChild'
import { getNewLine } from '../config'
import { LexicalTable, LexicalTableCell, LexicalTableRow } from '../types'
import { tag } from '../utils'

export const getTable = (table: LexicalTable): string => {
  const rows = table.children.map((row: LexicalTableRow) => {
    const rowChildren = row.children.map((cell: LexicalTableCell) => {
      const tdContent = cell.children.map(p => p.children.map(getSimpleChild).join(''))
      return tag('td', tdContent.join(''))
    })

    return tag('tr', rowChildren.join(getNewLine()) + getNewLine())
  })

  return tag('table', rows.join(getNewLine())) + getNewLine() + tag('empty-line')
}
