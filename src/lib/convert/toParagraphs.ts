import {
  LexicalChordsChild,
  LexicalCodeChild,
  LexicalElem,
  LexicalListItem,
  LexicalListItemChild,
  LexicalParagraph,
  LexicalSimpleChild,
  LexicalText,
} from '../types'
import { createParagraph } from './createParagraph'

export const childrenHasList = (children: LexicalListItemChild[]) =>
  children.reduce((acc, { type }) => acc || type === 'list', false)

const listChildren = (children: LexicalListItem[]): LexicalParagraph[] => {
  return children.reduce((acc: LexicalParagraph[], li) => {
    const hasList = childrenHasList(li.children)
    if (!hasList) {
      const p = createParagraph({
        children: li.children as LexicalSimpleChild[],
        direction: li.direction,
        format: li.format,
        indent: li.indent,
      })
      return [...acc, p]
    } else {
      let paragraphs: LexicalParagraph[] = []
      let simpleChildren: LexicalSimpleChild[] = []
      for (const simpleChild of li.children) {
        if (simpleChild.type !== 'list') {
          simpleChildren.push(simpleChild)
        } else {
          // create Paragraph if there are simple children
          if (simpleChildren.length > 0) {
            paragraphs = [
              ...paragraphs,
              createParagraph({
                children: simpleChildren,
              }),
            ]
            // clear simple children
            simpleChildren = []
          }
          paragraphs = [...paragraphs, ...listChildren(simpleChild.children)]
        }
      }
      return [...acc, ...paragraphs]
    }
  }, [])
}

const codeChildren = (children: LexicalChordsChild[] | LexicalCodeChild[]): LexicalSimpleChild[] => {
  return children.map(ch => {
    if (ch.type === 'code-highlight' || ch.type === 'chords-highlight') {
      const text: LexicalText = {
        text: ch.text,
        type: 'text',
        format: 0,
        detail: 0,
        mode: 'normal',
        style: '',
        version: 1,
      }
      return text
    } else {
      return ch as LexicalSimpleChild
    }
  })
}

export const toParagraphs = (block: LexicalElem): LexicalParagraph[] => {
  switch (block.type) {
    case 'paragraph':
      return [block]
    case 'quote':
    case 'heading':
      return [
        createParagraph({
          children: block.children,
          direction: block.direction,
          format: block.format,
          indent: block.indent,
        }),
      ]
    case 'list':
      return listChildren(block.children)
    case 'code':
    case 'chords':
      return [
        createParagraph({
          children: codeChildren(block.children),
          direction: block.direction,
          format: block.format,
          indent: block.indent,
        }),
      ]

    default:
      return []
  }
}
