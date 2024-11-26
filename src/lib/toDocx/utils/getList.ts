import { Paragraph } from 'docx'
import { FileChild } from 'docx/build/file/file-child'
import { formatToAlignment, getSimpleChild } from '../utils'
import {
  LexicalFormat,
  LexicalList,
  LexicalListItem,
  LexicalListItemChild,
  LexicalListType,
  LexicalSimpleChild,
} from '../../types'

const getListItem = (
  listType: LexicalListType,
  children: LexicalSimpleChild[],
  format: LexicalFormat,
  level: number,
  checked?: boolean,
): Paragraph =>
  new Paragraph({
    numbering: {
      reference: `${listType}-list${listType === 'check' && checked ? '-checked' : ''}`,
      level,
    },
    alignment: formatToAlignment(format),
    children: children.map(getSimpleChild),
  })

export const getList = (list: LexicalList, level = 0): FileChild[] =>
  list.children.reduce((acc: FileChild[], listItem: LexicalListItem): FileChild[] => {
    const typeList = listItem.children.map(({ type }) => type)

    if (typeList.includes('list')) {
      let simpleChildren: LexicalSimpleChild[] = []
      const res = listItem.children.reduce((acc: FileChild[], listItemChild: LexicalListItemChild) => {
        if (listItemChild.type == 'list') {
          const item = simpleChildren.length
            ? [getListItem(list.listType, simpleChildren, listItem.format, level, listItem.checked)]
            : []
          simpleChildren = []
          return [...acc, ...item, ...getList(listItem.children[0] as LexicalList, level + 1)]
        } else {
          simpleChildren.push(listItemChild)
          return acc
        }
      }, [])
      const item = simpleChildren.length
        ? [getListItem(list.listType, simpleChildren, listItem.format, level, listItem.checked)]
        : []
      return [...res, ...item]
    } else {
      return [
        ...acc,
        getListItem(list.listType, listItem.children as LexicalSimpleChild[], listItem.format, level, listItem.checked),
      ]
    }
  }, [])
