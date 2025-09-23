import { getBaseStyle } from './getBaseStyle'
import { getSimpleChild } from './getSimpleChild'
import { LexicalTable, LexicalTableCell, LexicalTableRow } from '../types'
import { getAttrs, getNewLine } from '../config'
import { widthToPercent } from '../toDocx/utils'
import { $, $p } from '../utils'

export const getTable = (table: LexicalTable): string => {
  const percentWidths = widthToPercent(table.colWidths)
  const rows = table.children.map((row: LexicalTableRow) => {
    const rowChildren = row.children
      .map((cell: LexicalTableCell, i: number) => {
        const tdStyle = {
          width: `${percentWidths[i]}%`,
        }
        const tableCellContent = cell.children
          .map(p => {
            return $p(p.children.map(getSimpleChild).join(''))
          })
          .join('')

        return $('td', tableCellContent, { attrs: getAttrs('tablecell', tdStyle) })
      })
      .join(getNewLine())
    return $('tr', rowChildren)
  })

  const tableStyle = getBaseStyle(table)
  const tbody = $('tbody', rows.join(getNewLine()))
  return $('table', tbody, {
    attrs: getAttrs('table', { width: '100%', ...tableStyle }),
  })
}
