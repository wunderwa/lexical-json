import { toCssString } from './styleConvert'
import { LexicalConfigKey, LexicalConfigItem, LexicalConfig, LexicalStyle } from './types'

const configTypes: LexicalConfigKey[] = [
  'text',
  'linebreak',
  'link',
  'paragraph',
  'quote',
  'list',
  'ul',
  'ol',
  'listitem',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'code',
  'chords',
]

const initConfig = (): LexicalConfigItem => ({
  class: '',
  style: {},
})

const Config: LexicalConfig = configTypes.reduce(
  (acc, key) => ({
    ...acc,
    [key]: initConfig(),
  }),
  {},
)

export const setConfigItem = (item: LexicalConfigItem, key: LexicalConfigKey): void => {
  Config[key] = Config[key] ? { ...Config[key], ...item } : item
}

export const setConfig = (config: LexicalConfig): void => {
  const keys = Object.keys(config) as LexicalConfigKey[]
  keys.forEach(key => {
    const itemConfig = config[key]
    if (itemConfig) {
      setConfigItem(itemConfig, key)
    }
  })
}

export const getConfig = (key: LexicalConfigKey): LexicalConfigItem | null => Config[key] ?? null

export const getAttr = (key: LexicalConfigKey, injectStyle: LexicalStyle = null): string => {
  const conf = getConfig(key)
  let _style = injectStyle ?? {}
  const _class = []
  if (conf?.style) {
    _style = { ..._style, ...conf.style }
  }
  if (conf?.class) {
    _class.push(conf.class)
  }

  const res = [_class.length ? `class="${_class.join(' ')}"` : '', `style="${toCssString(_style)}"`]
  return res.join(' ')
}
