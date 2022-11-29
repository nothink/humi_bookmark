import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import '../index.css'

export const appendRoot = (): void => {
  const root = document.createElement('div')
  root.id = 'crx-root'
  root.style.position = 'absolute'

  document.body.append(root)

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  )
}
