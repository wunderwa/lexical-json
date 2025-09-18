import { tag } from '../utils'
import { fbTagAttrs, xmlHead } from './constants'
import { getNewLine } from '../config'
import { Fb2Description } from '../typesFb2'
import { toFb2Description } from './toFb2Description'
import { toFb2Body } from './toFb2Body'

type ToFb2Params = {
  sections: string[]
  description: Fb2Description
}

export const toFb2 = ({ sections, description }: ToFb2Params): string => {
  const opts = {
    attrs: fbTagAttrs,
  }
  const { titleInfo } = description

  const fbList = [
    toFb2Description(description),
    toFb2Body({ sections, titleInfo }),
    // titleInfo.coverpage = 'binary data:image/jpeg;base64,...'
  ]

  return `${xmlHead}\n${tag('FictionBook', fbList.join(getNewLine()), opts)}`
}
