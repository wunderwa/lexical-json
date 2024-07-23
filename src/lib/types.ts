export type LexicalDirection = 'ltr' | 'rtl' | null
export type LexicalFormat = 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''

export type LexicalListType = 'bullet' | 'number'
export type LexicalListTag = 'ul' | 'ol'
export type LexicalHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type LexicalTypes = 'text' | 'linebreak' | 'link' | 'paragraph' | 'quote' | 'heading' | 'listitem' | 'list'

export type LexicalConfigKey = LexicalTypes | LexicalListTag | LexicalHeadingTag | 'code'

export type LexicalStyle = { [key: string]: string } | null

export type LexicalConfigItem = Partial<{
  class: string
  style: LexicalStyle
}>

export type LexicalConfig = Partial<Record<LexicalConfigKey, LexicalConfigItem>>

export type LexicalText = {
  text: string
  type: 'text'
  format: number
  detail: number
  mode: string
  style: string
  version: number
}

export type LexicalLinebreak = {
  type: 'linebreak'
  version: number
}

export type LexicalBase = {
  direction: LexicalDirection
  format: LexicalFormat
  indent: number
  version: number
}

export type LexicalLink = LexicalBase & {
  children: LexicalText[]
  type: 'link'
  url: string | null
  rel: string | null
  target: string | null
  title: string | null
}

export type LexicalSimpleChild = LexicalText | LexicalLink | LexicalLinebreak

export type LexicalParagraph = LexicalBase & {
  children: LexicalSimpleChild[]
  type: 'paragraph'
  textFormat?: number
}

export type LexicalQuote = LexicalBase & {
  children: LexicalSimpleChild[]
  type: 'quote'
}

export type LexicalHeading = LexicalBase & {
  children: LexicalSimpleChild[]
  type: 'heading'
  tag: LexicalHeadingTag
}

export type LexicalListItemChild = LexicalSimpleChild | LexicalList

export type LexicalListItem = LexicalBase & {
  children: LexicalListItemChild[]
  type: 'listitem'
  checked?: boolean
  value?: number
}

export type LexicalList = LexicalBase & {
  children: LexicalListItem[]
  type: 'list'
  listType: LexicalListType
  tag: LexicalListTag
  start: number
}

export type LexicalNonListElem = LexicalParagraph | LexicalHeading | LexicalQuote
export type LexicalElem = LexicalParagraph | LexicalHeading | LexicalQuote | LexicalList

export type LexicalJson = {
  root: {
    children: LexicalElem[]
    direction: 'ltr' | 'rtl'
    format: string
    indent: number
    version: number
    type: 'root'
  }
}
