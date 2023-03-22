import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

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
  const root = createRoot(elem)

  root.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  )
}
