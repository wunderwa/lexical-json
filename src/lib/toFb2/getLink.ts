import { LexicalLink } from '../types'
import { getText } from './getText'
import { tag } from '../utils'

const attrs = {
  'xmlns:fb': 'https://www.gribuser.ru/xml/fictionbook/2.0',
  'xmlns:fo': 'https://www.w3.org/1999/XSL/Format',
  'xmlns:xlink': 'https://www.w3.org/1999/xlink',
}

export const getLink = (link: LexicalLink) => {
  const content = link.children.map(getText).join('')

  return tag('a', content, {
    attrs: {
      ...attrs,
      href: link.url ?? '',
    },
  })
}
