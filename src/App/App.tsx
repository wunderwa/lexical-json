import { downloadFile } from './downloadFile'
import Parser from 'html-react-parser'
import { numbering, toDocx, toDocxSection } from '../lib/toDocx'
import { useCallback, useState } from 'react'
import { testData } from '../data/test'
import { toHtml, setConfigItem, toView } from '../lib'

setConfigItem(
  {
    style: { borderLeft: '5px solid black', padding: '8px' },
  },
  'quote',
)

const htmlStr = toHtml(testData)
const textStr = toView(testData)
export const App = () => {
  const [showHtml, setShowHtml] = useState<boolean>(true)

  const toggleShow = useCallback(() => {
    setShowHtml(!showHtml)
  }, [showHtml, setShowHtml])

  const Download = useCallback(() => {
    const children = toDocxSection(testData)
    toDocx([{ children }], numbering).then(blob => {
      downloadFile(blob, '1.docx', '')
    })
  }, [])
  return (
    <div>
      <button onClick={toggleShow}>{showHtml ? 'Show text' : 'Show html'}</button>
      {' - '}
      <button onClick={Download}>Download DOCX</button>
      <h3 style={{ textAlign: 'center' }}>Test data below</h3>
      {showHtml && (
        <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlStr)}</div>
      )}
      {!showHtml && <pre style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{textStr}</pre>}
    </div>
  )
}
