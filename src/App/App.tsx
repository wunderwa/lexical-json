import { downloadFile } from './downloadFile'
import Parser from 'html-react-parser'
import { numbering, toDocx, toDocxSection } from '../lib/toDocx'
import { useCallback } from 'react'
import { testData } from '../data/test'
import { toHtml, setConfigItem } from '../lib'

setConfigItem(
  {
    style: { borderLeft: '5px solid black', padding: '8px' },
  },
  'quote',
)

const htmlStr = toHtml(testData)
export const App = () => {
  const Download = useCallback(() => {
    const children = toDocxSection(testData)
    toDocx([{ children }], numbering).then(blob => {
      downloadFile(blob, '1.docx', '')
    })
  }, [])
  return (
    <div>
      <button onClick={Download}>Download DOCX</button>
      <h3 style={{ textAlign: 'center' }}>Test data below</h3>
      <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlStr)}</div>
    </div>
  )
}
