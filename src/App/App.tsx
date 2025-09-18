import { downloadFile } from './downloadFile'
import Parser from 'html-react-parser'
import { numbering, setConfig, toDocx, toDocxSection } from '../lib'
import { useCallback, useMemo, useState } from 'react'
import { testData } from '../data/test'
import { toHtml, setConfigItem, toView, clearBlocks } from '../lib'
import { toFb2, toFb2Section } from '../lib/toFb2'
import { descriptionMax, descriptionMin } from '../data/testDescription'

setConfigItem(
  {
    style: { borderLeft: '5px solid black', padding: '8px' },
  },
  'quote',
)

setConfig({
  table: {
    style: { border: '1px solid red', borderCollapse: 'collapse' },
  },
  tablecell: {
    style: { border: '1px solid red' },
  },
})
setConfigItem(
  {
    style: { border: '1px dashed red' },
  },
  'quote',
)

const jsonConv = {
  root: {
    ...testData.root,
    children: clearBlocks(testData.root.children),
  },
}
const htmlConvStr = toHtml(jsonConv)

type AppSection = 'html' | 'view' | 'conv' | 'text'

export const App = () => {
  const [section, setSection] = useState<AppSection>('html')
  const [shift, setShift] = useState<number>(0)

  const textStr = useMemo(() => toView(testData, { chordsTonality: shift }), [shift])
  const textOnlyStr = useMemo(() => toView(testData, { chordsTonality: shift, textOnly: true }), [shift])
  const htmlStr = useMemo(() => toHtml(testData, { chordsTonality: shift }), [shift])

  const theSection = useCallback(
    (_section: AppSection) => {
      setSection(_section)
    },
    [setSection],
  )

  const DownloadDocx = useCallback(() => {
    const children = toDocxSection(testData)
    console.log(children)
    toDocx([{ children }], numbering).then(blob => {
      downloadFile(blob, `lexical-${Math.ceil(Date.now() / 100).toString(36)}.docx`, '')
    })
  }, [])

  const DownloadFb2 = useCallback(() => {
    const sections = [toFb2Section(testData)]
    const fb2 = toFb2({ sections, description: descriptionMax })

    downloadFile(fb2, `lexical-max-${Math.ceil(Date.now() / 100).toString(36)}.fb2`, '')
  }, [])

  const DownloadFb2Min = useCallback(() => {
    const sections = [toFb2Section(testData)]
    console.log(sections)
    const fb2 = toFb2({ sections, description: descriptionMin })

    downloadFile(fb2, `lexical-min-${Math.ceil(Date.now() / 100).toString(36)}.fb2`, '')
  }, [])

  return (
    <div>
      <button
        disabled={section === 'view'}
        onClick={() => theSection('view')}
      >
        {'Show text (view)'}
      </button>
      <button
        disabled={section === 'text'}
        onClick={() => theSection('text')}
      >
        {'Show text (only)'}
      </button>

      <button
        disabled={section === 'html'}
        onClick={() => theSection('html')}
      >
        {'Show html'}
      </button>

      {' - '}
      <button
        disabled={section === 'conv'}
        onClick={() => theSection('conv')}
      >
        {'Show convert all in paragraphs'}
      </button>
      {' - '}
      <button onClick={DownloadDocx}>Download DOCX</button>
      {' - '}
      <button onClick={DownloadFb2}>Download FB2</button>
      {' - '}
      <button onClick={DownloadFb2Min}>Download FB2 min</button>
      {(section == 'html' || section == 'view') && (
        <div>
          <button onClick={() => setShift(shift - 1)}> {'Prev tone'} </button>
          {shift}
          <button onClick={() => setShift(shift + 1)}> {'Next tone'} </button>
        </div>
      )}
      <h3 style={{ textAlign: 'center' }}>Test data below</h3>
      {section == 'html' && (
        <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlStr)}</div>
      )}
      {section == 'view' && (
        <pre style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{textStr}</pre>
      )}
      {section == 'text' && (
        <pre style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{textOnlyStr}</pre>
      )}
      {section == 'conv' && (
        <div style={{ maxWidth: 800, outline: '1px solid red', margin: '10px auto' }}>{Parser(htmlConvStr)}</div>
      )}
    </div>
  )
}
