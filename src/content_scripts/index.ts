export {}

const updateContents = (): void => {
  const div = document.createElement('div')
  div.id = 'cs-root'
  document.body.append(div)
}

updateContents()
