import { getBaseStyle } from './getBaseStyle'
import { getSimpleChild } from './getSimpleChild'
import { LexicalList, LexicalListItem, LexicalListItemChild } from '../types'
import { getAttrs } from '../config'
import { $ } from '../utils'

export const getList = (list: LexicalList): string => {
  const items = list.children
    .map((listItem: LexicalListItem) => {
      const listItemChildren = listItem.children
        .map((itemChild: LexicalListItemChild) => {
          if (itemChild.type == 'list') {
            return getList(itemChild)
          } else {
            return getSimpleChild(itemChild)
          }
        })
        .join('')
      let bullet = ''
      const styles = getBaseStyle(listItem) ?? {}
      if (list.listType === 'check') {
        bullet = $('span', ` ${listItem.checked ? '🗹' : '🗆'} `)
        if (listItem.checked) {
          styles.textDecoration = 'line-through'
        }
      }
      return $('li', `${bullet}${listItemChildren}`, {
        attrs: getAttrs('listitem', styles),
      })
    })
    .join('\n')
  const listStyle = getBaseStyle(list) ?? {}
  if (list.listType === 'check') {
    listStyle.listStyle = 'none'
  }

  return $(list.tag, items, {
    attrs: getAttrs('list', listStyle),
  })
}
