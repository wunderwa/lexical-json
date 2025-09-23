import { getAttrs } from '../config'
import { LexicalLink } from '../types'
import { getText } from './getText'
import { $ } from '../utils'

type Attr = Record<string, string>
type AttrName = keyof LexicalLink
const availableKeys: AttrName[] = ['url', 'rel', 'target', 'title']

export const getLink = (link: LexicalLink) => {
  const content = link.children.map(getText).join('')
  const keys: AttrName[] = Object.keys(link) as AttrName[]

  const attr: Attr = keys.reduce((acc: Attr, key: AttrName) => {
    if (!availableKeys.includes(key)) return acc
    if (link[key]) {
      const _key: string = key === 'url' ? 'href' : key
      return {
        ...acc,
        [_key]: (link[key] ?? '') as string,
      }
    }
    return acc
  }, {})
  return $('a', content, {
    attrs: {
      ...getAttrs('link'),
      ...attr,
    },
  })
}
