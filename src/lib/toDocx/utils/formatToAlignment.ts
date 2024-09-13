import { AlignmentType } from 'docx/build/file/paragraph/formatting/alignment'
import { LexicalFormat } from 'lib/types'

export const formatToAlignment = (
  format: LexicalFormat,
): (typeof AlignmentType)[keyof typeof AlignmentType] | undefined => {
  // 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
  // 'left' | 'start' | 'center' | 'right' | 'end' | 'both' | undefined
  // | 'mediumKashida' | 'distribute' | 'numTab' | 'highKashida' | 'lowKashida' | 'thaiDistribute'

  switch (format) {
    case 'justify':
      return 'both'
    case '':
      return undefined
    default:
      return format
  }
}
