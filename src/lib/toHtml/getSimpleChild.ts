import { getLink } from './getLink'
import { getText } from './getText'
import { LexicalSimpleChild } from '../types'
import { $tab, $br } from '../utils'

export const getSimpleChild = (simpleChild: LexicalSimpleChild) => {
  switch (simpleChild.type) {
    case 'link':
    case 'autolink':
      return getLink(simpleChild)
    case 'text':
      return getText(simpleChild)
    case 'tab':
      return $tab(simpleChild)
    case 'linebreak':
      return $br()
    default:
      return $tab(simpleChild)
  }
}
