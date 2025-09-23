import { getSimpleChild } from './getSimpleChild'
import { getNewLine } from '../config'
import { LexicalTable, LexicalTableCell, LexicalTableRow } from '../types'
import { $ } from '../utils'

export const getTable = (table: LexicalTable): string => {
  const rows = table.children.map((row: LexicalTableRow) => {
    const rowChildren = row.children.map((cell: LexicalTableCell) => {
      const tdContent = cell.children.map(p => p.children.map(getSimpleChild).join(''))
      return $('td', tdContent.join(''))
    })

    return $('tr', rowChildren.join(getNewLine()) + getNewLine())
  })

  return $('table', rows.join(getNewLine())) + getNewLine() + $('empty-line')
}
