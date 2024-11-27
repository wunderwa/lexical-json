import { LexicalParagraph } from '../types'

export const createParagraph = (item: Partial<LexicalParagraph>): LexicalParagraph => ({
  children: [],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  //textStyle: ''
  ...item,
})
