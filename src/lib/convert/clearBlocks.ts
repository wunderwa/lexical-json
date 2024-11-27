import { toParagraphs } from './toParagraphs'
import { LexicalElem, LexicalParagraph } from '../types'

export const clearBlocks = (children: LexicalElem[]): LexicalElem[] => {
  return children.reduce((acc: LexicalParagraph[], elem) => [...acc, ...toParagraphs(elem)], [])
}
