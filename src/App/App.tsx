import { downloadFile } from './downloadFile'
import Parser from 'html-react-parser'
import { numbering, toDocx, toDocxSection } from '../lib/toDocx'
import { useCallback, useState } from 'react'
import { testData } from '../data/test'
import { toHtml, setConfigItem, toView, clearBlocks } from '../lib'

setConfigItem(
  {
    style: { borderLeft: '5px solid black', padding: '8px' },
  },
  'quote',
)

const htmlStr = toHtml(testData)
const textStr = toView(testData)
const jsonConv = {
  root: {
    ...testData.root,
    children: clearBlocks(testData.root.children),
  },
}
console.log(jsonConv.root)
const htmlConvStr = toHtml(jsonConv)

type AppSection = 'html' | 'text' | 'conv'

export const App = () => {
  const [section, setSection] = useState<AppSection>('html')

  const theSection = useCallback(
    (_section: AppSection) => {
      setSection(_section)
    },
    [setSection],
  )

  const Download = useCallback(() => {
    const children = toDocxSection(testData)
    toDocx([{ children }], numbering).then(blob => {
      downloadFile(blob, '1.docx', '')
    })
  }, [])
  return (
    <div>
      <button
        disabled={section === 'html'}
        onClick={() => theSection('html')}
      >
        {'Show html'}
      </button>
      <button
        disabled={section === 'text'}
        onClick={() => theSection('text')}
      >
        {'Show text'}
      </button>
      <button
        disabled={section === 'conv'}
        onClick={() => theSection('conv')}
      >
        {'Show convert'}
      </button>
      {' - '}
      <button onClick={Download}>Download DOCX</button>
      <h3 style={{ textAlign: 'center' }}>Test data below</h3>
      {section == 'html' && (
        <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlStr)}</div>
      )}
      {section == 'text' && (
        <pre style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{textStr}</pre>
      )}
      {section == 'conv' && (
        <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlConvStr)}</div>
      )}
    </div>
  )
}
