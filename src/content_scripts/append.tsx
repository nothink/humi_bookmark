import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '../App'

export const appendRoot = (): void => {
  const elem = document.createElement('div')
  elem.id = 'crx-root'
  elem.style.position = 'absolute'

  elem.style.position = 'fixed'
  elem.style.top = '0px'
  elem.style.left = '0px'
  elem.style.width = '64px'
  elem.style.height = '64px'

  document.body.append(elem)
  const root2 = createRoot(elem)

  root2.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
