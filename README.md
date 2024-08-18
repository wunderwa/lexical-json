# @wunderwa/lexical-json
## Facebook Lexical: JSON to html convertor, TypeScript library

Library for converting lexical json state into `html` and `text` for a simple preview


## Installing

```shell
npm i @wunderwa/lexical-json
# or
yarn add @wunderwa/lexical-json
```

## Usage


```ts
import { setConfig, toHtml, toText, LexicalJson } from '@wunderwa/lexical-json'
import { asBlob } from 'html-docx-js-typescript'
const json: LexicalJson = [
  {
    root: {
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
      children: [...children]
    }
  }
]
const config: LexicalConfig = {
  h1: {
    style: {
      fontSize: '11px',
      fontWeight: 300,
    },
    class: 'class-name'
},
  h2: {
    style: {
      fontSize: '10px',
    },
  },
  h3: {
    class: 'class-name'
  }
}

setConfig(config)
// or set sepate config for current tag
setConfigItem(config.h1, 'h1')

const htmlStr = toHtml(json)
saveAs(data, 'file.docx') // save as docx file

const text = toText(json)
```

## Releases (add tag)
```shell
git tag -a v0.1.0 2004632 -m 'v0.1.0'
git push origin v0.1.0
```
## Releases (npm)
```shell
npm login
npm publish --access public
npm unpublish @wunderwa/lexical-json@0.1.0
```
