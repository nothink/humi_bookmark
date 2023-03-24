import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '../App'

export const appendRoot = (): void => {
  const elem = document.createElement('div')
  elem.id = 'crx-root'
  elem.style.position = 'absolute'

  elem.style.top = '0px'
  elem.style.left = '0px'
  elem.style.width = 'auto'
  elem.style.height = 'auto'

  document.body.append(elem)
  const root = createRoot(elem)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
