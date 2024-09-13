import { HeadingLevel } from 'docx'
import { LexicalHeadingTag } from '../../types'

const headings: Record<LexicalHeadingTag, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  h1: HeadingLevel.HEADING_1,
  h2: HeadingLevel.HEADING_2,
  h3: HeadingLevel.HEADING_3,
  h4: HeadingLevel.HEADING_4,
  h5: HeadingLevel.HEADING_5,
  h6: HeadingLevel.HEADING_6,
}

export const getHeadingValue = (h: LexicalHeadingTag) => headings[h]
