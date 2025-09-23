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

http://localhost:5173/

```ts
import { setConfig, toHtml, toView, LexicalJson } from '@wunderwa/lexical-json'
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
// 'text' | 'linebreak' | 'link' | 'autolink' | 'paragraph' | 'quote' | 'heading' | 'listitem' | 'list' | 
// 'ul' | 'ol' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'table' | 'tablecell' |
// 'code' | 'chords' 

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
// or
const htmlStrShifted = toHtml(json, { chordsTonality: -6 }) // for chords plugin

saveAs(data, 'file.docx') // save as docx file

const text = toView(json)
const textShifted = toView(json, { 
  chordsTonality: -6, // for chords plugin
  textOnly: true      // for clean text
}) 
```

## Docx
```ts
import { numbering, toDocx, toDocxSection } from '@wunderwa/lexical-json'

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
const Download = useCallback(() => {
  const children = toDocxSection(json)
  toDocx([{ children }], numbering).then(blob => {
    downloadFile(blob, 'from-lexal.docx', '')
  })
}, [])

```

### FB2
```ts
import { toFb2Section, toFb2, LexicalJson, Fb2Description } from '@wunderwa/lexical-json'

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

const sections: string[] = [toFb2Section(json)]

const description: Fb2Description = {
  titleInfo: {
    genre: ['management'],
    author: {
      firstName: 'Ivan',
      lastName: 'Ivanov',
    },
    bookTitle: 'Book title min',
    lang: 'ru',
  },
  documentInfo: {
    author: {
      firstName: 'John',
      lastName: 'Minion',
    },
    date: '2014-12-09',
    id: 'fb9ef105-7f82-11e4-82c4-002590591ed2',
    version: '1.0',
  },
}

const fb2 = toFb2({ sections, description })

downloadFile(fb2, `from-lexal.fb2`, '')


```

### Convert all block elements to paragraphs

```ts
import { clearBlocks, LexicalParagraph, LexicalElem, toParagraphs } from '@wunderwa/lexical-json'

const paragraps: LexicalParagraph[] = clearBlocks(json.root.children)
// see also inner function to convert single blok element to LexicalParagraph array
type toParagraphs = (block: LexicalElem) => LexicalParagraph[]
```

## Releases (add tag)
```shell
git tag -a v0.10.0 a23456f -m 'v0.10.0'
git tag -a v0.10.0 -m 'v0.10.0 '
git push origin v0.10.0
```
## Releases (npm)
```shell
yarn build
npm login
npm publish --access public

npm unpublish @wunderwa/lexical-json@0.1.0
```
