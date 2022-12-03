// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from '../App'
// import '../index.css'

export const appendRoot = (): void => {
  const root = document.createElement('div')
  root.id = 'crx-root'
  root.style.position = 'absolute'

  root.style.position = 'fixed'
  root.style.top = '20px'
  root.style.left = '1px'
  root.style.width = '7px'
  root.style.height = '32px'
  root.style.backgroundColor = 'red'

  document.body.append(root)

  // ReactDOM.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>,
  //   root
  // )
}
