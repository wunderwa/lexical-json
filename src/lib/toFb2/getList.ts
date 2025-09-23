import { getSimpleChild } from './getSimpleChild'
import { LexicalList, LexicalListItem, LexicalListItemChild } from '../types'
import { $p } from '../utils'
import { nbsp } from '../constants'

export const getList = (list: LexicalList, level = 0): string => {
  const items = list.children
    .map((listItem: LexicalListItem) => {
      const listItemChildren = listItem.children
        .map((itemChild: LexicalListItemChild) => {
          if (itemChild.type == 'list') {
            return getList(itemChild, level + 1)
          } else {
            return getSimpleChild(itemChild)
          }
        })
        .join('')

      let bullet = ''

      if (list.listType === 'check') {
        bullet = ` ${listItem.checked ? '🗹' : '🗆'} `
      } else if (list.listType === 'bullet') {
        bullet = '•'
      } else if (list.listType === 'number') {
        bullet = `${listItem.value}. `
      }

      return $p(`${nbsp.repeat(level)}${bullet}${nbsp}${listItemChildren}`)
    })
    .join('\n')

  return items
}
