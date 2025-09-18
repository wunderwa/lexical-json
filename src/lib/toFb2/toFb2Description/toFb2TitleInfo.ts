import { getNewLine } from '../../config'
import { Fb2TitleInfo } from '../../typesFb2'
import { filterString, tag } from '../../utils'
import { tagAnnotation, tagOfData, tagSequence } from '../utils'
import { toFb2CreatorOf } from './toFb2Creator'

export const toFb2TitleInfo = (data: Fb2TitleInfo): string => {
  const content: string = [
    tagOfData('genre', data.genre),
    toFb2CreatorOf('author', data.author),
    tagOfData('book-title', data.bookTitle),
    tagAnnotation(data.annotation),
    tagOfData('keywords', data.keywords),
    tagOfData('date', data.date),
    // 'coverpage',
    tagOfData('lang', data.lang),
    tagOfData('src-lang', data.srcLang),
    toFb2CreatorOf('translator', data.author),
    tagSequence(data.sequence),
  ]
    .filter(filterString)
    .join(getNewLine())

  return tag('title-info', content)
}
