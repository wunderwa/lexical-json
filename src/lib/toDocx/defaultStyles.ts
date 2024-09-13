import { AlignmentType, LevelFormat, UnderlineType } from 'docx'

type Index = 1 | 2 | 3 | 4 | 5
type HeadingMap = Record<Index, number>

const headingSize: HeadingMap = { 1: 28, 2: 26, 3: 23, 4: 20, 5: 17 }
const headingSpacingBefore: HeadingMap = { 1: 60, 2: 50, 3: 40, 4: 30, 5: 20 }
const headingSpacingAfter: HeadingMap = { 1: 400, 2: 35, 3: 30, 4: 25, 5: 20 }

const heading = (level: Index) => ({
  run: {
    bold: true,
    italics: false,
    color: '000000',
    size: headingSize[level],
  },
  paragraph: {
    spacing: {
      after: headingSpacingAfter[level],
      before: headingSpacingBefore[level],
    },
  },
})

export const styles = {
  default: {
    heading1: heading(1),
    heading2: heading(2),
    heading3: heading(3),
    heading4: heading(4),
    listParagraph: {
      run: {
        color: '#FF0000',
      },
    },
    document: {
      run: {
        size: '14pt',
        font: 'Calibri',
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
      },
    },
  },
  paragraphStyles: [
    {
      id: 'quote',
      name: 'Quote',
      basedOn: 'Normal',
      quickFormat: true,
      run: {
        size: '90%',
      },
      paragraph: {
        spacing: { before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
      },
    },
    {
      id: 'strikeUnderline',
      name: 'Strike Underline',
      basedOn: 'Normal',
      quickFormat: true,
      run: {
        strike: true,
        underline: {
          type: UnderlineType.SINGLE,
        },
      },
    },
  ],
  characterStyles: [
    {
      id: 'strikeUnderlineCharacter',
      name: 'Strike Underline',
      basedOn: 'Normal',
      quickFormat: true,
      run: {
        strike: true,
        underline: {
          type: UnderlineType.SINGLE,
        },
      },
    },
  ],
}

export const numbering = {
  config: [
    {
      reference: 'number-list',
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: '%1)',
          alignment: AlignmentType.LEFT,
        },
      ],
    },
    {
      reference: 'bullet-list',
      levels: [
        {
          level: 0,
          // format: LevelFormat.BULLET,
          text: '•)',
          // alignment: AlignmentType.LEFT,
        },
      ],
    },
  ],
}
