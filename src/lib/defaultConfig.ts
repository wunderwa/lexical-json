// default config

import { setConfig } from './config'

setConfig({
  quote: {
    style: { borderLeft: '2px solid grey', padding: '8px' },
    class: 'lex-quote',
  },
  code: {
    style: {
      display: 'block',
      fontFamily: 'monospace',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '0px',
      padding: '0px 2px',
    },
  },
})
