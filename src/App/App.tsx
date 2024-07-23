import Parser from 'html-react-parser'
import { testData } from '../data/test'
import { toHtml, setConfig, setConfigItem, getConfig } from '../lib'

setConfigItem(
  {
    style: { borderLeft: '5px solid black', padding: '8px' },
  },
  'quote',
)

console.log('', getConfig('quote'))

const htmlStr = toHtml(testData)
console.log(htmlStr)
export const App = () => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Test data below</h3>
      <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlStr)}</div>
    </div>
  )
}
