import { getAttr } from '../config'
import { LexicalLink } from '../types'
import { getText } from './getText'

export const getLink = (link: LexicalLink) => {
  const content = link.children.map(getText).join('')
  const keys: (keyof LexicalLink)[] = Object.keys(link) as (keyof LexicalLink)[]
  const attr = keys
    .map(key => {
      if (['children', 'version'].includes(key)) return ''
      if (key == 'url') {
        return link[key] ? `href="${link[key]}"` : ''
      } else {
        return link[key] ? `${key}="${link[key]}"` : ''
      }
    })
    .join(' ')
  const configAttr = getAttr('link')
  return `<a ${attr} ${configAttr}>${content}</a>`
}
