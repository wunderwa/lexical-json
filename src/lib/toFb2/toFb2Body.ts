import { Fb2Creator, Fb2Creators, Fb2TitleInfo } from '../typesFb2'
import { filterNotEmpty, tag, tagP } from '../utils'
import { getNewLine } from '../config'

const getAuthors = (author: Fb2Creators): string[] => {
  if (Array.isArray(author)) {
    return author.map((c: Fb2Creator) =>
      [c.firstName ?? null, c.middleName ?? null, c.lastName ?? null].filter(filterNotEmpty).join(' '),
    )
  }
  const { firstName, middleName, lastName } = author
  return [[firstName, middleName, lastName].filter(filterNotEmpty).join(' ')]
}

type toFb2BodyParams = {
  sections: string[]
  titleInfo: Fb2TitleInfo
}

export const toFb2Body = ({ sections, titleInfo }: toFb2BodyParams): string => {
  const { author, bookTitle } = titleInfo
  const titleContent = [...getAuthors(author), bookTitle]
    .filter(filterNotEmpty)
    .map((s: string) => tagP(s))
    .join(getNewLine())

  const fbTitle = tag('title', titleContent)

  return tag('body', [fbTitle, ...sections].join(getNewLine()))
}
