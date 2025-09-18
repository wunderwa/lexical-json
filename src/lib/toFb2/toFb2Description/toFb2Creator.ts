import { Fb2Creator, Fb2Creators } from '../../types'
import { getNewLine } from '../../config'
import { filterString, tag } from '../../utils'
import { tagOfData } from '../utils'

type TagName = 'author' | 'translator' | 'publisher'
export const toFb2Creator = (tagName: TagName, data: Fb2Creator): string => {
  const content: string[] = [
    tagOfData('first-name', data.firstName),
    tagOfData('middle-name', data.middleName),
    tagOfData('last-name', data.lastName),
    tagOfData('nickname', data.nickname),
    tagOfData('home-page', data.homePage),
    tagOfData('email', data.email),
    tagOfData('id', data.id),
  ].filter(filterString)
  return tag(tagName, content.join(getNewLine()))
}

export const toFb2CreatorOf = (tagName: TagName, data?: Fb2Creators): string | null => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map(item => toFb2Creator(tagName, item)).join(getNewLine())
  }
  return toFb2Creator(tagName, data)
}
