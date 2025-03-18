export type LexicalDirection = 'ltr' | 'rtl' | null
export type LexicalFormat = 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''

export type LexicalListType = 'bullet' | 'number' | 'check'
export type LexicalListTag = 'ul' | 'ol'
export type LexicalHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type LexicalTypes =
  | 'text'
  | 'linebreak'
  | 'link'
  | 'autolink'
  | 'paragraph'
  | 'quote'
  | 'heading'
  | 'listitem'
  | 'list'
export type LexicalExtendTypes = 'code' | 'chords'

export type LexicalChordsHighlightType = 'tone' | 'min' | 'attr' | 'error'
export type LexicalCodeHighlightType =
  | 'atrule'
  | 'attr'
  | 'boolean'
  | 'builtin'
  | 'cdata'
  | 'char'
  | 'class'
  | 'class-name'
  | 'comment'
  | 'constant'
  | 'deleted'
  | 'doctype'
  | 'entity'
  | 'function'
  | 'important'
  | 'inserted'
  | 'keyword'
  | 'namespace'
  | 'number'
  | 'operator'
  | 'prolog'
  | 'property'
  | 'punctuation'
  | 'regex'
  | 'selector'
  | 'string'
  | 'symbol'
  | 'tag'
  | 'url'
  | 'variable'

export type LexicalConfigKey = LexicalTypes | LexicalListTag | LexicalHeadingTag | LexicalExtendTypes

type LexicalStyleKey = string | 'font-size' | 'font-Size' | 'line-height' | 'lineHeight' | 'color'
export type LexicalStyle = { [key: LexicalStyleKey]: string } | null

export type LexicalConfigItem = Partial<{
  class: string
  style: LexicalStyle
}>

export type LexicalConfig = Partial<Record<LexicalConfigKey, LexicalConfigItem>>

export type LexicalTextBase = {
  text: string
  format: number
  detail: number
  mode: string
  style: string
  version: number
}

export type LexicalText = LexicalTextBase & {
  type: 'text'
}

export type LexicalTab = LexicalTextBase & {
  type: 'tab'
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
  type: 'link' | 'autolink'
  url: string | null
  rel: string | null
  target: string | null
  title: string | null
  isUnlinked?: boolean
}

export type LexicalSimpleChild = LexicalText | LexicalLink | LexicalLinebreak | LexicalTab

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

//-- LexicalCode

export type LexicalCodeHighlight = LexicalTextBase & {
  type: 'code-highlight'
  highlightType?: LexicalCodeHighlightType
}

export type LexicalCodeChild = LexicalLinebreak | LexicalTab | LexicalCodeHighlight

export type LexicalCode = LexicalBase & {
  children: LexicalCodeChild[]
  type: 'code'
  language?: string
}

//-- LexicalChords

export type LexicalChordsHighlight = LexicalTextBase & {
  type: 'chords-highlight'
  highlightType?: LexicalChordsHighlightType
}

export type LexicalChordsChild = LexicalLinebreak | LexicalTab | LexicalChordsHighlight

export type LexicalChords = LexicalBase & {
  children: LexicalChordsChild[]
  type: 'chords'
  tonality?: string | number
}
//--

export type LexicalNonListElem = LexicalParagraph | LexicalHeading | LexicalQuote
export type LexicalElem = LexicalParagraph | LexicalHeading | LexicalQuote | LexicalList | LexicalChords | LexicalCode

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
export type ChordsTone = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#'
export type ChordToneShift = number
// 7 | 8 | 9 | 10 | 11

export type ToView = (
  body: LexicalJson,
  params?: {
    chordsTonality?: ChordToneShift
  },
) => string

export type ToHtml = (
  body: LexicalJson,
  params?: {
    chordsTonality?: ChordToneShift
  },
) => string
