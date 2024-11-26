import { getBaseStyle } from './getBaseStyle'
import { getSimpleChild } from './getSimpleChild'
import { LexicalList, LexicalListItem, LexicalListItemChild } from '../types'
import { getAttr } from '../config'

export const getList = (list: LexicalList): string => {
  const items = list.children
    .map((listItem: LexicalListItem) => {
      const listItemChildren = listItem.children.map((itemChild: LexicalListItemChild) => {
        if (itemChild.type == 'list') {
          return getList(itemChild)
        } else {
          return getSimpleChild(itemChild)
        }
      })
      let bullet = ''
      const styles = getBaseStyle(listItem) ?? {}
      if (list.listType === 'check') {
        bullet = `<span> ${listItem.checked ? '🗹' : '🗆'} </span>`
        if (listItem.checked) {
          styles.textDecoration = 'line-through'
        }
      }
      const configAttr = getAttr('listitem', styles)

      return `<li ${configAttr}>${bullet}${listItemChildren}</li>`
    })
    .join('\n')
  const listStyle = getBaseStyle(list) ?? {}
  if (list.listType === 'check') {
    listStyle.listStyle = 'none'
  }
  const configAttr = getAttr('list', listStyle)
  return `<${list.tag} ${configAttr}>${items}</${list.tag}>`
}
