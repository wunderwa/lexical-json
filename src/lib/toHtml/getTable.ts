import { getBaseStyle } from './getBaseStyle'
import { getSimpleChild } from './getSimpleChild'
import { LexicalTable, LexicalTableCell, LexicalTableRow } from '../types'
import { getAttr } from '../config'
import { widthToPercent } from '../toDocx/utils'

export const getTable = (table: LexicalTable): string => {
  const percentWidths = widthToPercent(table.colWidths)
  const rows = table.children.map((row: LexicalTableRow) => {
    const rowChildren = row.children
      .map((cell: LexicalTableCell, i: number) => {
        const tdStyle = {
          width: `${percentWidths[i]}%`,
        }
        const tableCellAttr = getAttr('tablecell', tdStyle)

        return `<td ${tableCellAttr}>${cell.children
          .map(p => {
            return `<p>${p.children.map(getSimpleChild)}</p>`
          })
          .join('')}</td>`
      })
      .join('\n')
    return `<tr>${rowChildren}</tr>`
  })

  const tableStyle = getBaseStyle(table)
  const tableAttr = getAttr('table', { width: '100%', ...tableStyle })
  return `<table ${tableAttr}><tbody>${rows}</tbody></table>`
}
