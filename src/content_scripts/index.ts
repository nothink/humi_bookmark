import { appendRoot } from './append'
import { retrieveVcards } from './retrieve'

const updateContents = (): void => {
  appendRoot()
  retrieveVcards()
}

updateContents()

export {}
